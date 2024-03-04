"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { Alert, Grid } from "@mui/material";
import useCurrentUser from "@/hooks/useCurrentUser";
import { MessageTypes } from "@/globle";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import ChatHeader from "./ChatHeader";
import NotFound from "@/Layout/NotFound";
import Loading from "@/Layout/Loading";
import { ChatApiFunctions } from "@/common/ChatApiFunctions";
import { RoomApiFunctions } from "@/common/RoomApiFunctions";
import { TypingAndOnline } from "@/common/TypingAndOnline";
import { AllSockets } from "@/socket.io/AllSockets";
import { socket } from "@/api/config";

const Chatting = ({ roomId }: { roomId: string }) => {
  const { currentUser } = useCurrentUser();
  const listRef = useRef<HTMLDivElement | null>(null);
  const [message, setMessage] = useState<string>("");
  const {
    loading: ChatLoading,
    allMessages,
    handleGetAllChats,
    handleSendMessage,
    setAllMessages,
    SeenAllMessages,
    getUnseenMessages,
    unseenCount,
  } = ChatApiFunctions();
  const { handleGetSingleRoom, error, loading, setRoom, room, otherUser } =
    RoomApiFunctions();
  const { SET_ONLINE, SET_TYPING } = AllSockets(roomId);
  const { handleSetTyping, isTyping, isOnline, setOnlineInfo, setTypingInfo } =
    TypingAndOnline(roomId);

  useEffect(() => {
    socket.emit("join-room", { roomId, currentUser });
    handleGetSingleRoom(roomId);
    handleGetAllChats(roomId);
    getUnseenMessages(currentUser?._id, roomId);
    socket.on("get-message", (msg) => {
      setAllMessages((prevMessages) => [...prevMessages, msg]);
    });
    return () => {
      // ----- Off Socket -------
      socket.off("get-message");
    };
  }, [roomId, currentUser]);

  useEffect(() => {
    SET_ONLINE(true);
    socket.on("get-is-online", (online) => {
      setOnlineInfo(online);
    });
    socket.on("get-typing", (typingInfo) => {
      setTypingInfo(typingInfo);
    });
    socket.on("get-block-user", (blocked_user) => {
      setRoom(blocked_user);
    });
    return () => {
      SET_ONLINE(false);
    };
  }, [roomId, currentUser, isTyping]);

  useEffect(() => {
    if (isOnline && otherUser) {
      SeenAllMessages(otherUser?._id, roomId);
    }
  }, [isOnline, otherUser]);

  useEffect(() => {
    const listElement = listRef.current;
    if (listElement) {
      const isScrolledToBottom =
        listElement.scrollHeight - listElement.clientHeight <=
        listElement.scrollTop + 1;
      if (!isScrolledToBottom) {
        listElement.scrollTop = listElement.scrollHeight;
      }
    }
  }, [allMessages]);

  if (loading && ChatLoading && !roomId && !room) {
    return <Loading />;
  }

  if (!loading && error) {
    return <NotFound />;
  }

  const handleChange = (e: any) => {
    setMessage(e.target.value);
    handleSetTyping();
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
    handleSendMessage(newMessage, setMessage);
    SET_TYPING(false);
    socket.emit("set-unSeen", { newMessage, unseenCount: unseenCount + 1 });
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
        {room && (
          <ChatHeader
            isTyping={isTyping}
            online={isOnline}
            otherUser={otherUser}
            room={room}
            setRoom={setRoom}
            currentUser={currentUser}
          />
        )}

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
