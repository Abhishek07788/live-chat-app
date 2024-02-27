"use client";
import { PATHS, QP } from "@/constants/routes";
import { RoomsTypes, UsersTypes } from "@/globle";
import { useAllUsers } from "@/hooks/useAllUsers";
import useChatRoom from "@/hooks/useChatRoom";
import useCurrentUser from "@/hooks/useCurrentUser";
import { Avatar, Grid, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

const ChatList = () => {
  const { allUsers, count } = useAllUsers();
  const { currentUser } = useCurrentUser();
  const { allRooms, setAllRooms } = useChatRoom();
  const router = useRouter();

  const handleUserClick = (user: UsersTypes) => {
    const roomUsers = [user.userName, currentUser.userName].sort();
    const chatRoom: RoomsTypes = {
      roomUsers,
      user1: user,
      user2: currentUser,
    };

    const existingRoom = allRooms.filter(
      (existing: RoomsTypes) =>
        existing.roomUsers.join("") === chatRoom.roomUsers.join("")
    );

    if (existingRoom.length >= 1) {
      const param = existingRoom[0].roomUsers.join("");
      router.push(`${PATHS.chat}/${param}`);
    } else {
      localStorage.setItem(
        "chat-room",
        JSON.stringify([...allRooms, chatRoom])
      );
      setAllRooms((prev: RoomsTypes[]) => [...prev, chatRoom]);
      const param = chatRoom.roomUsers.join("");
      router.push(`${PATHS.chat}/${param}`);
    }
  };

  return (
    <>
      {count === 0 ? (
        <Typography mt={2} variant="h6" textAlign={"center"}>
          No User Found
        </Typography>
      ) : (
        <>
          <Typography mt={2} variant="h6" textAlign={"center"}>
            All Users
          </Typography>
          <Grid
            margin={"auto"}
            border={"1px solid #c9bffb"}
            width={{ xs: "100%", lg: "35%" }}
            height={"70vh"}
            mt={1}
            boxShadow={4}
            py={1}
            borderRadius={"12px"}
          >
            {allUsers &&
              allUsers.map((user: UsersTypes, index: number) => (
                <Grid key={index}>
                  {user.userName !== currentUser.userName && (
                    <Stack
                      p={1}
                      pl={4}
                      flexDirection={"row"}
                      borderBottom={"1px solid #c1c5d0"}
                      sx={{
                        cursor: "pointer",
                        "&:hover": { bgcolor: "#c1c5d080" },
                      }}
                      onClick={() => handleUserClick(user)}
                    >
                      <Avatar
                        sx={{
                          mr: 1,
                          height: 35,
                          width: 35,
                          bgcolor: index % 2 == 0 ? "#8f61e6" : "#f47fa1",
                        }}
                      >
                        {user.userName.slice(0, 2).toLocaleUpperCase()}
                      </Avatar>
                      <Grid>
                        <Typography mb={-1}>{user.name}</Typography>
                        <Typography fontWeight="bold" variant="caption">
                          @{user.userName}
                        </Typography>
                      </Grid>
                    </Stack>
                  )}
                </Grid>
              ))}
          </Grid>
        </>
      )}
    </>
  );
};

export default ChatList;
