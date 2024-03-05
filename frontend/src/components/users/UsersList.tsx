"use client";
import Loading from "@/Layout/Loading";
import NotFound from "@/Layout/NotFound";
import { RoomApiFunctions } from "@/api/RoomApiFunctions";
import { UserApiFunctions } from "@/api/UserApiFunction";
import { RoomsTypes, UsersTypes } from "@/globle";
import useCurrentUser from "@/hooks/useCurrentUser";
import { Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import UserListCard from "./UserListCard";

const UsersList = () => {
  const { currentUser } = useCurrentUser();
  const { loading, allUsers, handleAllUsers } = UserApiFunctions();
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

  if (!loading && !roomLoading && roomError) {
    return <NotFound title={roomError.message || "Server Error!"} />;
  }

  return (
    <>
      {!loading && allUsers.count === 0 ? (
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
                    <UserListCard
                      index={index}
                      user={user}
                      handleUserClick={handleUserClick}
                      currentUser={currentUser}
                    />
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
