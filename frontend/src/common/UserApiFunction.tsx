import { handleBlockRoomUser } from "@/api/RoomsApi";
import { getAllUsers } from "@/api/UserApi";
import { socket } from "@/api/config";
import { AllUsersTypes, RoomsTypes } from "@/globle";
import { useState } from "react";

export const UserApiFunctions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [allUsers, setAllUsers] = useState<AllUsersTypes>({
    users: [],
    count: 0,
  });

  const handleAllUsers = () => {
    setLoading(true);
    getAllUsers()
      .then((users) => {
        setAllUsers(users);
        setError(users.message);
        setLoading(false);
      })
      .catch((error) => {
        console.error("error: ", error.message);
        setLoading(false);
        setError(error.message);
      });
  };

  const blockRoomUser = (
    room: RoomsTypes,
    setRoom: (room: RoomsTypes) => void,
    userId: string
  ) => {
    setLoading(true);
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
      handleBlockRoomUser(updatedObj)
        .then((updatedRoom) => {
          setRoom(updatedRoom.room);
        })
        .catch((error) => {
          console.error("error: ", error.message);
          setLoading(false);
        });
    }
  };

  return {
    loading,
    error,
    allUsers,
    handleAllUsers,
    blockRoomUser,
  };
};
