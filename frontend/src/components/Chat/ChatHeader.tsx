import { OtherUsersTypes, UsersTypes } from "@/globle";
import { Avatar, Grid, Stack, Typography } from "@mui/material";
import React from "react";

const ChatHeader = ({
  isTyping,
  Online,
  otherUser,
}: {
  Online?: boolean;
  isTyping?: boolean;
  otherUser: OtherUsersTypes;
}) => {
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
            {otherUser?.userName?.slice(0, 2).toLocaleUpperCase()}
          </Avatar>
          <Grid>
            <Typography mb={-1}>{otherUser.name}</Typography>
            <Typography fontWeight="bold" variant="caption">
              {isTyping
                ? "Typing..."
                : Online
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
