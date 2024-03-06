import { PATHS } from "@/constants/routes";
import { RoomsTypes } from "@/globle";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ChatApiFunctions } from "./ChatApiFunctions";
import axios, { AxiosError } from "axios";
import { useConfig } from "@/config/Config";

export const RoomApiFunctions = () => {
  const { API, AxiosAuthConfig } = useConfig();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | any>();
  const [room, setRoom] = useState<RoomsTypes>();
  const router = useRouter();
  const { handleMessagesSeen } = ChatApiFunctions();
  const { currentUser } = useCurrentUser();

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

  // -- join room ---
  const JOIN_ROOM = async (chatRoom: RoomsTypes) => {
    const data = await handleApiRequest(
      axios.post,
      `${API}/room/join`,
      chatRoom,
      AxiosAuthConfig
    );
    const roomID = data?.room?.roomId;
    const isExist = data?.isExist;
    if (isExist) {
      handleMessagesSeen(chatRoom?.user1, roomID);
      setError("");
    }
    roomID
      ? router.push(`${PATHS.chat}/${roomID}`)
      : setError({
          message: "Something went wrong from server. Please try again later!",
        });
  };

  // -- get single room ---
  const handleGetSingleRoom = async (roomId: string) => {
    const data = await handleApiRequest(
      axios.get,
      `${API}/room/${roomId}`,
      AxiosAuthConfig
    );
    setRoom(data);
  };

  const otherUser = useMemo(() => {
    return room && room.user1?.userName === currentUser.userName
      ? { ...room.user2, bgcolor1: "#8f61e6", bgcolor2: "#f47fa1" }
      : room && { ...room.user1, bgcolor1: "#f47fa1", bgcolor2: "#c0a6f1" };
  }, [room]);

  return {
    loading,
    error,
    JOIN_ROOM,
    room,
    setRoom,
    setError,
    handleGetSingleRoom,
    otherUser,
  };
};
