import { useConfig } from "@/config/Config";
import { AllUsersTypes, RoomsTypes } from "@/globle";
import { useState } from "react";
import axios, { AxiosError } from "axios";

export const UserApiFunctions = () => {
  const { socket, API, AxiosAuthConfig } = useConfig();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | any>();
  const [allUsers, setAllUsers] = useState<AllUsersTypes>({
    users: [],
    count: 0,
  });

  const handleApiRequest = async (requestFunction: any, ...args: any[]) => {
    setError("");
    setLoading(true);
    try {
      const { data } = await requestFunction(...args);
      setError("");
      setLoading(false);
      return data;
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  // --- getAll users --
  const handleAllUsers = async () => {
    const data = await handleApiRequest(
      axios.get,
      `${API}/users`,
      AxiosAuthConfig
    );
    setAllUsers(data);
  };

  // -- update/block room user ---
  const handleBlockRoomUser = async (data: RoomsTypes) => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.put(
        `${API}/room/block/${data._id}`,
        data,
        AxiosAuthConfig
      );
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
