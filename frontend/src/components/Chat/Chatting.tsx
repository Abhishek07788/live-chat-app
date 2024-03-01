"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { Alert, Grid } from "@mui/material";
import useCurrentUser from "@/hooks/useCurrentUser";
import { OnlineTypes, TypingTypes, MessageTypes, RoomsTypes } from "@/globle";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import ChatHeader from "./ChatHeader";
import NotFound from "@/Layout/NotFound";
import Loading from "@/Layout/Loading";
import { getSingleRoom } from "@/api/RoomsApi";
import { getRoomMessages, sendMessage } from "@/api/MessagesApi";
import { socket } from "@/api/config";

const API = process.env.BACKEND_API;
let typingTimeout: any;

const Chatting = ({ roomId }: { roomId: string }) => {
  const { currentUser } = useCurrentUser();
  const listRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [allMessages, setAllMessages] = useState<MessageTypes[]>([]);
  const [message, setMessage] = useState<string>("");
  const [room, setRoom] = useState<RoomsTypes>();
  const [TypingInfo, setTypingInfo] = useState<TypingTypes>({
    roomId,
    isTyping: false,
    currentUserId: currentUser.userName,
  });
  const [Online, setOnline] = useState<OnlineTypes>({
    roomId,
    isOnline: false,
    currentUserId: currentUser.userName,
  });
  const isOnline =
    Online.currentUserId !== currentUser.userName && Online.isOnline;
  const isTyping =
    TypingInfo.currentUserId !== currentUser.userName && TypingInfo?.isTyping;

  useEffect(() => {
    getSingleRoom(roomId)
      .then((room) => {
        setRoom(room);
        setLoading(false);
      })
      .catch((error) => {
        setError(true);
      });
    getRoomMessages(roomId)
      .then((Messages) => {
        setAllMessages(Messages);
      })
      .catch((error) => {
        setError(true);
      });
  }, [roomId]);

  useEffect(() => {
    socket.emit("set-is-online", {
      roomId,
      isOnline: true,
      currentUserId: currentUser.userName,
    });
    socket.on("get-is-online", (online) => {
      setOnline(online);
    });
    socket.on("get-typing", (typingInfo) => {
      setTypingInfo(typingInfo);
    });
    socket.on("get-block-user", (blocked_user) => {
      setRoom(blocked_user);
    });
    return () => {
      socket.emit("set-is-online", {
        roomId,
        isOnline: false,
        currentUserId: currentUser.userName,
      });
    };
  }, [roomId, currentUser]);

  useEffect(() => {
    socket.emit("join-room", { roomId, currentUser });
    socket.on("get-message", (msg) => {
      setAllMessages((prevMessages) => [...prevMessages, msg]);
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
    return () => {
      socket.off("get-message");
    };
  }, [roomId, currentUser]);

  const otherUser = useMemo(() => {
    return room && room.user1?.userName === currentUser.userName
      ? { ...room.user2, bgcolor1: "#8f61e6", bgcolor2: "#f47fa1" }
      : room && { ...room.user1, bgcolor1: "#f47fa1", bgcolor2: "#c0a6f1" };
  }, [room]);

  if (loading) {
    return <Loading />;
  }

  if (error || !roomId || !room) {
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

    const newMessage: MessageTypes = {
      roomId: roomId,
      currentUser: currentUser?._id,
      chat: message,
      isSeen: isOnline,
    };

    sendMessage(newMessage).then((msg) => {
      setAllMessages((prevMessages) => [...prevMessages, msg]);
      socket.emit("send-message", msg);
      setMessage("");
    });
    socket.emit("set-typing", {
      isTyping: false,
      roomId,
      currentUserId: currentUser.userName,
    });
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
          online={isOnline}
          otherUser={otherUser}
          room={room}
          setRoom={setRoom}
        />

        {/* body -- */}
        <ChatBody allMessages={allMessages} ref={listRef} />

        {/* footer --- */}
        {room?.blocked?.includes(currentUser._id) ? (
          <Alert severity="error">
            {otherUser.name} has blocked you from the chat!
          </Alert>
        ) : (
          <ChatFooter
            handleSubmit={handleSubmit}
            message={message}
            handleChange={handleChange}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default Chatting;
