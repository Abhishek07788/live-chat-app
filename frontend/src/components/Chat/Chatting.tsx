"use client";
import React, { useState, useEffect, useRef } from "react";
import { Grid } from "@mui/material";
import io from "socket.io-client";
import useCurrentUser from "@/hooks/useCurrentUser";
import useChatRoom from "@/hooks/useChatRoom";
import { OnlineTypes, TypingTypes, MessageTypes, RoomsTypes } from "@/globle";
import { useAllMessages } from "@/hooks/useAllMessages";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import ChatHeader from "./ChatHeader";
import NotFound from "@/Layout/NotFound";
import Loading from "@/Layout/Loading";

const API = process.env.BACKEND_API;
let typingTimeout: any;
export const socket = io(API || "http://localhost:8080");

const Chatting = ({ roomId }: { roomId: string }) => {
  const { currentUser } = useCurrentUser();
  const { allRooms } = useChatRoom();
  const { allMessages, setAllMessages } = useAllMessages();
  const [message, setMessage] = useState<string>("");
  const [TypingInfo, setTypingInfo] = useState<TypingTypes>({
    roomId,
    isTyping: false,
    currentUserId: currentUser.userName,
  });
  const [room, setRoom] = useState<RoomsTypes>();
  const [Online, setOnline] = useState<OnlineTypes>({
    roomId,
    isOnline: false,
    currentUserId: currentUser.userName,
  });
  const listRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(true);
  const isOnline =
    Online.currentUserId !== currentUser.userName && Online.isOnline;
  const isTyping =
    TypingInfo.currentUserId !== currentUser.userName && TypingInfo?.isTyping;

  // useEffect(() => {
  //   // Check and update isSeen
  //   if (isOnline) {
  //     const updatedMessages = allMessages.map((msg: MessageTypes) => {
  //       if (msg.currentUserId !== currentUser.userName && !msg.isSeen) {
  //         return { ...msg, isSeen: true };
  //       } else {
  //         return msg;
  //       }
  //     });

  //     setAllMessages(updatedMessages);
  //     console.log("updatedMessages: ", updatedMessages);
  //     localStorage.setItem("messages", JSON.stringify(updatedMessages));
  //   }
  // }, [isOnline]);

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

    socket.on("get-is-online", (online) => {
      setOnline(online);
    });

    socket.on("get-message", (msg) => {
      setAllMessages([...allMessages, msg]);
    });
    socket.on("get-typing", (typingInfo) => {
      setTypingInfo(typingInfo);
    });

    // --- Auto-Scrolling ----
    const listElement = listRef.current;
    if (listElement) {
      const isScrolledToBottom =
        listElement.scrollHeight - listElement.clientHeight <=
        listElement.scrollTop + 1;
      if (!isScrolledToBottom) {
        listElement.scrollTop = listElement.scrollHeight;
      }
    }
    setLoading(false);
    return () => {
      // {
      //   isOnline &&
      //     socket.emit("set-is-online", {
      //       roomId,
      //       isOnline: false,
      //       currentUserId: currentUser.userName,
      //     });
      // }
      setLoading(false);
    };
  }, [message, allMessages, allRooms, roomId, isTyping, isOnline]);

  const otherUser =
    room && room.user1?.userName === currentUser.userName
      ? { ...room.user2, bgcolor1: "#8f61e6", bgcolor2: "#f47fa1" }
      : room && { ...room.user1, bgcolor1: "#f47fa1", bgcolor2: "#c0a6f1" };

  if (loading) {
    return <Loading />;
  }

  if (!otherUser?.userName) {
    return <NotFound />;
  }

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
      isSeen: isOnline,
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
          isTyping={isTyping}
          Online={isOnline}
          otherUser={otherUser}
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
