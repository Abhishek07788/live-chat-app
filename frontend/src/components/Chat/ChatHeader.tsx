import { IsOnlineTypes, IsTypingTypes, RoomsTypes, UsersTypes } from "@/globle";
import { Avatar, Grid, Stack, Typography } from "@mui/material";
import React from "react";

const ChatHeader = ({
  room,
  currentUser,
  isTypingInfo,
  Online,
}: {
  room?: RoomsTypes;
  Online?: IsOnlineTypes;
  isTypingInfo?: IsTypingTypes;
  currentUser: UsersTypes;
}) => {
  const otherUser =
    room && room.user1?.userName === currentUser.userName
      ? { ...room.user2, bgcolor1: "#8f61e6", bgcolor2: "#f47fa1" }
      : room && { ...room.user1, bgcolor1: "#f47fa1", bgcolor2: "#c0a6f1" };

  return (
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
              isTypingInfo.currentUserId !== currentUser.userName
                ? "Typing..."
                : Online?.isOnline &&
                  Online.currentUserId !== currentUser.userName
                ? "In the chat"
                : "@" + otherUser.userName}
            </Typography>
          </Grid>
        </Stack>
      )}
    </Grid>
  );
};

export default ChatHeader;
