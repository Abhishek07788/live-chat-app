"use client";
import Loading from "@/Layout/Loading";
import NotFound from "@/Layout/NotFound";
import { RoomApiFunctions } from "@/common/RoomApiFunctions";
import { UserApiFunctions } from "@/common/UserApiFunction";
import { RoomsTypes, UsersTypes } from "@/globle";
import useCurrentUser from "@/hooks/useCurrentUser";
import { Avatar, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";

const UsersList = () => {
  const { currentUser } = useCurrentUser();
  const { loading, error, allUsers, handleAllUsers } = UserApiFunctions();
  const {
    loading: roomLoading,
    error: roomError,
    JOIN_ROOM,
  } = RoomApiFunctions();

  useEffect(() => {
    handleAllUsers();
  }, []);

  const handleUserClick = (user: UsersTypes) => {
    const chatRoom: RoomsTypes = {
      roomId: [user._id, currentUser._id].sort().join(""),
      user1: user._id,
      user2: currentUser._id,
    };
    JOIN_ROOM(chatRoom);
  };

  if (loading || roomLoading) {
    return <Loading />;
  }

  if ((!loading && error) || (!loading && roomError)) {
    return <NotFound title="Something went wrong!" />;
  }

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

export default UsersList;
