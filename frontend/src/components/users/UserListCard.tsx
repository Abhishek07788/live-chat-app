import { useConfig } from "@/config/Config";
import { ChatApiFunctions } from "@/api/ChatApiFunctions";
import { UsersTypes } from "@/globle";
import { Avatar, Chip, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";

const UserListCard = ({
  index,
  user,
  handleUserClick,
  currentUser,
}: {
  index: number;
  user: UsersTypes;
  handleUserClick: (user: UsersTypes) => void;
  currentUser: UsersTypes;
}) => {
  const { socket } = useConfig();
  const { getUnseenMessages, unseenCount, lastMsg } = ChatApiFunctions();
  const [roomID, setRoomID] = React.useState(
    [user._id, currentUser._id].sort().join("")
  );
  useEffect(() => {
    socket.on("get-unSeen", (unseenData) => {
      getUnseenMessages(unseenData?.newMessage?.currentUser, roomID);
    });
    if (user._id) {
      getUnseenMessages(user._id, roomID);
    }
  }, []);

  return (
    <Stack
      borderBottom={"1px solid #c1c5d0"}
      sx={{
        cursor: "pointer",
        "&:hover": { bgcolor: "#c1c5d080" },
      }}
      onClick={() => handleUserClick(user)}
      flexDirection={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Stack p={1} pl={4} flexDirection={"row"}>
        <Avatar
          sx={{
            mr: 1,
            height: 35,
            width: 35,
            bgcolor: index % 2 == 0 ? "#8f61e6" : "#f47fa1",
          }}
        >
          {user?.name?.slice(0, 2).toLocaleUpperCase()}
        </Avatar>
        <Grid>
          <Typography mb={-1}>{user.name}</Typography>
          {lastMsg?._id ? (
            <Typography fontWeight="bold" variant="caption" color="blue">
              {lastMsg?._id ? lastMsg.chat : "@" + user.userName}
            </Typography>
          ) : (
            <Typography fontWeight="bold" variant="caption">
              {"@" + user.userName}
            </Typography>
          )}
        </Grid>
      </Stack>
      {unseenCount > 0 && lastMsg?.roomId === roomID && (
        <Stack flexDirection={"row"} mr={2} alignItems={"center"}>
          <Chip label={unseenCount} color="info" size="small" />
          <Typography color={"grey"} variant="caption" ml={1}>
            unseen messages
          </Typography>
        </Stack>
      )}
    </Stack>
  );
};

export default UserListCard;
