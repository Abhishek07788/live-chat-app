"use client";
import NotFound from "@/Layout/NotFound";
import { getAllUsers } from "@/api/Api";
import { PATHS } from "@/constants/routes";
import { AllUsersTypes, RoomsTypes, UsersTypes } from "@/globle";
import useChatRoom from "@/hooks/useChatRoom";
import useCurrentUser from "@/hooks/useCurrentUser";
import { Avatar, Grid, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ChatList = () => {
  const { currentUser } = useCurrentUser();
  const { allRooms, setAllRooms } = useChatRoom();
  const [allUsers, setAllUsers] = useState<AllUsersTypes>({
    users: [],
    count: 0,
  });
  const router = useRouter();

  useEffect(() => {
    getAllUsers().then((users) => {
      setAllUsers(users);
    });
  }, []);

  const handleUserClick = (user: UsersTypes) => {
    const roomUsers = [user._id, currentUser._id].sort();
    const chatRoom: RoomsTypes = {
      roomId: roomUsers.join(""),
      roomUsers,
      user1: user,
      user2: currentUser,
    };

    const existingRoom = allRooms.filter(
      (existing: RoomsTypes) => existing.roomId === chatRoom.roomId
    );

    if (existingRoom.length >= 1) {
      const param = existingRoom[0].roomId;
      router.push(`${PATHS.chat}/${param}`);
    } else {
      localStorage.setItem(
        "chat-room",
        JSON.stringify([...allRooms, chatRoom])
      );
      setAllRooms((prev: RoomsTypes[]) => [...prev, chatRoom]);
      const param = chatRoom.roomId;
      router.push(`${PATHS.chat}/${param}`);
    }
  };

  return (
    <>
      {allUsers.count === 0 ? (
        <NotFound title="User Not Found!" />
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
            {allUsers.users &&
              allUsers.users.map((user: UsersTypes, index: number) => (
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
