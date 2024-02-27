"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { Avatar, Button, Grid, Input, Stack, Typography } from "@mui/material";
import io from "socket.io-client";
import useCurrentUser from "@/hooks/useCurrentUser";
import useChatRoom from "@/hooks/useChatRoom";
import { MessageTypes, RoomsTypes } from "@/globle";
import SendIcon from "@mui/icons-material/Send";
import { useAllMessages } from "@/hooks/useAllMessages";

const API = process.env.BACKEND_API_KEY;
let typingTimeout: any;

const Chatting = ({ roomId }: { roomId: string }) => {
  const { currentUser } = useCurrentUser();
  const { allRooms } = useChatRoom();
  const { allMessages, setAllMessages } = useAllMessages();
  const [message, setMessage] = useState<string>("");
  const [isTypingInfo, setIsTypingInfo] = useState<{
    isTyping: boolean;
    roomId: string;
    currentUserId: string;
  }>();
  const [room, setRoom] = useState<RoomsTypes>();

  const socket = useMemo(() => {
    return io(API || "http://localhost:8080", {
      query: { id: currentUser.userName || "param" },
    });
  }, [currentUser.userName]);

  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const myRoom = allRooms.filter(
      (room: RoomsTypes) => room.roomUsers.join("") === roomId
    );
    setRoom(myRoom[0]);

    const listElement = listRef.current;
    socket.on("get-message", (msg) => {
      console.log("msg: ", msg);
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
  }, [message, allMessages, allRooms, roomId, isTypingInfo]);

  const otherUser =
    room && room.user1.userName === currentUser.userName
      ? { ...room.user2, bgcolor1: "#8f61e6", bgcolor2: "#f47fa1" }
      : room && { ...room.user1, bgcolor1: "#f47fa1", bgcolor2: "#c0a6f1" };

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
        <Grid
          sx={{
            width: "100%",
            pl: 2,
            bgcolor: otherUser && otherUser.bgcolor2,
          }}
        >
          {otherUser && (
            <Stack flexDirection={"row"} p={1}>
              <Avatar
                sx={{
                  bgcolor: otherUser.bgcolor1,
                  mr: 1,
                  height: 35,
                  width: 35,
                }}
              >
                {otherUser.userName.slice(0, 2).toLocaleUpperCase()}
              </Avatar>
              <Grid>
                <Typography mb={-1}>{otherUser.name}</Typography>
                <Typography fontWeight="bold" variant="caption">
                  {isTypingInfo?.isTyping &&
                  isTypingInfo.currentUserId !== currentUser.userName &&
                  isTypingInfo.roomId === roomId
                    ? "typing..."
                    : "@" + otherUser.userName}
                </Typography>
              </Grid>
            </Stack>
          )}
        </Grid>

        {/* body -- */}

        <Grid
          ref={listRef}
          width={"100%"}
          height={"65vh"}
          display={"flex"}
          overflow={"auto"}
          flexDirection={"column"}
          sx={{
            background:
              "linear-gradient(261deg, rgba(255,255,255,1) 0%, rgba(222,222,222,1) 63%)",
          }}
          p={1}
          position={"relative"}
        >
          {allMessages.map((msg: MessageTypes, index: number) => (
            <Grid key={index}>
              {msg.roomId === roomId && (
                <Grid
                  display={"flex"}
                  flexDirection={"column"}
                  mt={1.2}
                  alignItems={
                    msg.currentUserId === currentUser?.userName
                      ? "flex-end"
                      : "flex-start"
                  }
                >
                  {msg.currentUserId === currentUser?.userName ? (
                    <Typography variant="caption" mr={0} fontWeight={"bold"}>
                      <Typography
                        variant="caption"
                        textAlign={"right"}
                        fontSize={10}
                      >
                        {msg.time} -
                      </Typography>{" "}
                      {msg.currentUserId}
                    </Typography>
                  ) : (
                    <Typography variant="caption" mr={0} fontSize={10}>
                      <Typography
                        variant="caption"
                        textAlign={"right"}
                        fontWeight={"bold"}
                      >
                        {msg.currentUserId} -
                      </Typography>{" "}
                      {msg.time}
                    </Typography>
                  )}
                  <Grid
                    px={1.5}
                    maxWidth={"40%"}
                    borderRadius={"12px"}
                    sx={
                      msg.currentUserId === currentUser?.userName
                        ? {
                            wordBreak: "break-word",
                            borderTopRightRadius: "2px",
                            bgcolor: "#be8bfa90",
                          }
                        : {
                            wordBreak: "break-word",
                            borderTopLeftRadius: "2px",
                            bgcolor: "#fff",
                          }
                    }
                  >
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                      sx={{ wordBreak: "break-word" }}
                    >
                      {msg.chat}
                    </Typography>
                  </Grid>
                </Grid>
              )}
            </Grid>
          ))}
        </Grid>

        {/* footer --- */}
        <Grid
          component={"form"}
          onSubmit={handleSubmit}
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          width={"100%"}
        >
          <Input
            size="small"
            fullWidth
            required
            placeholder="Write a message.."
            autoFocus
            sx={{ pl: 2, bgcolor: "#fff" }}
            disableUnderline
            value={message}
            onChange={handleChange}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ height: 40 }}
          >
            <SendIcon />
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Chatting;
