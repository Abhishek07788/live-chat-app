import { socket } from "@/config/config";
import { AllUsersTypes, RoomsTypes } from "@/globle";
import { useState } from "react";
import { config } from "@/config/config";
import axios, { AxiosError } from "axios";

const { API, Authentication_Token } = config;
export const UserApiFunctions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | any>();
  const [allUsers, setAllUsers] = useState<AllUsersTypes>({
    users: [],
    count: 0,
  });

  // --- getAll users --
  const handleAllUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.get(`${API}/users`, {
        headers: { Authorization: Authentication_Token },
      });
      setAllUsers(data);
      setLoading(false);
      setError("");
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  // -- update/block room user ---
  const handleBlockRoomUser = async (data: RoomsTypes) => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.put(`${API}/room/block/${data._id}`, data, {
        headers: { Authorization: Authentication_Token },
      });
      setLoading(false);
      setError("");
      return response.data;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const blockRoomUser = (
    room: RoomsTypes,
    setRoom: (room: RoomsTypes) => void,
    userId: string
  ) => {
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

  return {
    loading,
    error,
    allUsers,
    handleAllUsers,
    blockRoomUser,
  };
};
