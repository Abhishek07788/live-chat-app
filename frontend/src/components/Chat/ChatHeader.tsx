import { handleBlockRoomUser } from "@/api/RoomsApi";
import { socket } from "@/api/config";
import { OtherUsersTypes, RoomsTypes } from "@/globle";
import { Avatar, Grid, Stack, Typography } from "@mui/material";
import React, { memo } from "react";
import MoreOptions from "../common/MoreOptions";

const ChatHeader = ({
  isTyping,
  online,
  otherUser,
  room,
  setRoom,
}: {
  online?: boolean;
  isTyping?: boolean;
  otherUser: OtherUsersTypes;
  room: RoomsTypes;
  setRoom: (room: RoomsTypes) => void;
}) => {
  const userId = otherUser?._id;
  const handleBlock = () => {
    if (room.blocked && userId) {
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
      socket.emit("set-block-user", updatedObj);
      handleBlockRoomUser(updatedObj).then((updatedRoom) => {
        setRoom(updatedRoom.room);
      });
    }
  };

  const MenuList = [
    {
      title: room?.blocked?.includes(userId || "") ? "Unblock" : "Block",
      onClick: handleBlock,
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

      <MoreOptions MenuList={MenuList} />
      {/* <Tooltip
        onClick={handleBlock}
        title={`${
          room?.blocked?.includes(userId || "") ? "Unblock" : "Block"
        } ${otherUser.name}?`}
      >
        <BlockIcon sx={{ pr: 2, cursor: "pointer", fontSize: 20 }} />
      </Tooltip> */}
    </Grid>
  );
};

export default memo(ChatHeader);
