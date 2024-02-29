import { OtherUsersTypes, RoomsTypes } from "@/globle";
import BlockIcon from "@mui/icons-material/Block";
import { Avatar, Grid, Stack, Tooltip, Typography } from "@mui/material";
import React from "react";
import { socket } from "./Chatting";

const ChatHeader = ({
  isTyping,
  online,
  otherUser,
  room,
}: {
  online?: boolean;
  isTyping?: boolean;
  otherUser: OtherUsersTypes;
  room?: RoomsTypes;
}) => {
  const handleBlock = () => {
    const userId = otherUser?._id;
    if (room && room.blocked && userId) {
      let updatedBlockedArray;
      if (room?.blocked.includes(userId)) {
        updatedBlockedArray = room?.blocked.filter((id) => id !== userId);
      } else {
        updatedBlockedArray = [...room?.blocked, userId];
      }

      const updatedObj = {
        ...room,
        blocked: updatedBlockedArray,
      };
      socket.emit("block-user", updatedObj);
    }
  };

  return (
    <Grid
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
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
            {otherUser?.userName?.slice(0, 2).toLocaleUpperCase()}
          </Avatar>
          <Grid>
            <Typography mb={-1}>{otherUser.name}</Typography>
            <Typography fontWeight="bold" variant="caption">
              {isTyping
                ? "Typing..."
                : online
                ? "In the chat"
                : "@" + otherUser.userName}
            </Typography>
          </Grid>
        </Stack>
      )}
      <Tooltip onClick={handleBlock} title={`Block ${otherUser.name}?`}>
        <BlockIcon sx={{ pr: 2, cursor: "pointer" }} />
      </Tooltip>
    </Grid>
  );
};

export default ChatHeader;
