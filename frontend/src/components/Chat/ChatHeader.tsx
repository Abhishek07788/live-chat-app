import { OtherUsersTypes, RoomsTypes, UsersTypes } from "@/globle";
import { Avatar, Grid, Stack, Typography } from "@mui/material";
import React, { memo } from "react";
import MoreOptions from "../common/MoreOptions";
import { UserApiFunctions } from "@/common/UserApiFunction";

const ChatHeader = ({
  isTyping,
  online,
  otherUser,
  room,
  setRoom,
  currentUser,
}: {
  online?: boolean;
  isTyping?: boolean;
  otherUser: OtherUsersTypes;
  room: RoomsTypes;
  setRoom: (room: RoomsTypes) => void;
  currentUser: UsersTypes;
}) => {
  const userId = otherUser?._id;
  const { blockRoomUser } = UserApiFunctions();

  const MenuList = [
    {
      title: room?.blocked?.includes(userId || "") ? "Unblock" : "Block",
      onClick: () => blockRoomUser(room, setRoom, userId || ""),
    },
  ];

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
            {!room?.blocked?.includes(currentUser._id || "") && (
              <Typography fontWeight="bold" variant="caption">
                {isTyping
                  ? "Typing..."
                  : online
                  ? "In the chat"
                  : "@" + otherUser.userName}
              </Typography>
            )}
          </Grid>
        </Stack>
      )}
      <MoreOptions MenuList={MenuList} />
    </Grid>
  );
};

export default memo(ChatHeader);
