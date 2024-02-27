"use client";
import React, { useState, useEffect, useRef } from "react";
import { Grid } from "@mui/material";
import io from "socket.io-client";
import useCurrentUser from "@/hooks/useCurrentUser";
import useChatRoom from "@/hooks/useChatRoom";
import {
  IsOnlineTypes,
  IsTypingTypes,
  MessageTypes,
  RoomsTypes,
} from "@/globle";
import { useAllMessages } from "@/hooks/useAllMessages";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import ChatHeader from "./ChatHeader";

const API = process.env.BACKEND_API_KEY;
let typingTimeout: any;
export const socket = io(API || "http://localhost:8080");

const Chatting = ({ roomId }: { roomId: string }) => {
  const { currentUser } = useCurrentUser();
  const { allRooms } = useChatRoom();
  const { allMessages, setAllMessages } = useAllMessages();
  const [message, setMessage] = useState<string>("");
  const [isTypingInfo, setIsTypingInfo] = useState<IsTypingTypes>();
  const [room, setRoom] = useState<RoomsTypes>();
  const [Online, setOnline] = useState<IsOnlineTypes>();
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const myRoom = allRooms.filter(
      (room: RoomsTypes) => room.roomId === roomId
    );
    setRoom({ ...myRoom[0] });
    socket.emit("join-room", { roomId, currentUser });
    socket.emit("set-is-online", {
      roomId,
      isOnline: true,
      currentUserId: currentUser.userName,
    });

    const listElement = listRef.current;

    socket.on("get-is-online", (online) => {
      setOnline(online);
    });

    socket.on("get-message", (msg) => {
      setAllMessages([...allMessages, msg]);
    });
    socket.on("get-typing", (typingInfo) => {
      setIsTypingInfo(typingInfo);
    });
    if (listElement) {
      const isScrolledToBottom =
        listElement.scrollHeight - listElement.clientHeight <=
        listElement.scrollTop + 1;

      // Scroll to the bottom when a new message is received and not already scrolled to the bottom
      if (!isScrolledToBottom) {
        listElement.scrollTop = listElement.scrollHeight;
      }
    }

    return () => {
      socket.emit("set-is-online", {
        roomId,
        isOnline: false,
        currentUserId: currentUser.userName,
      });
    };
  }, [message, allMessages, allRooms, roomId, isTypingInfo]);

  const handleChange = (e: any) => {
    setMessage(e.target.value);
    socket.emit("set-typing", {
      isTyping: true,
      roomId,
      currentUserId: currentUser.userName,
    });
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    typingTimeout = setTimeout(() => {
      socket.emit("set-typing", {
        isTyping: false,
        roomId,
        currentUserId: currentUser.userName,
      });
    }, 2000);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!message) {
      alert("Chat should not be Empty!");
      return;
    }
    if (!room) {
      alert("Something went wrong!");
      return;
    }

    const currentUserId = currentUser?.userName; // Replace with your actual user ID
    const time = new Date().getHours() + ":" + new Date().getMinutes();
    const newMessage: MessageTypes = {
      roomId: roomId,
      currentUserId,
      users: room?.roomUsers,
      chat: message,
      time,
      isSeen: false,
    };
    socket.emit("set-typing", {
      isTyping: false,
      roomId,
      currentUserId: currentUser.userName,
    });
    localStorage.setItem(
      "messages",
      JSON.stringify([...allMessages, newMessage])
    );
    setAllMessages([...allMessages, newMessage]);
    socket.emit("send-message", newMessage);
    setMessage("");
  };

  return (
    <Grid
      border={"16px solid #232323"}
      boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
      borderRadius={"6px"}
      width={{ xs: "90%", lg: "400px" }}
      margin={"auto"}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Grid borderRadius={"10px"} width="100%">
        {/* header --- */}
        <ChatHeader
          currentUser={currentUser}
          room={room}
          isTypingInfo={isTypingInfo}
          Online={Online}
        />

        {/* body -- */}
        <ChatBody allMessages={allMessages} roomId={roomId} ref={listRef} />

        {/* footer --- */}
        <ChatFooter
          handleSubmit={handleSubmit}
          message={message}
          handleChange={handleChange}
        />
      </Grid>
    </Grid>
  );
};

export default Chatting;
