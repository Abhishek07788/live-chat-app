import { PATHS } from "@/constants/routes";
import { RoomsTypes } from "@/globle";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ChatApiFunctions } from "./ChatApiFunctions";
import { config } from "@/config/config";
import axios, { AxiosError } from "axios";

const { API, Authentication_Token } = config;
export const RoomApiFunctions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | any>();
  const [room, setRoom] = useState<RoomsTypes>();
  const router = useRouter();
  const { handleMessagesSeen } = ChatApiFunctions();
  const { currentUser } = useCurrentUser();

  // -- join room ---
  const JOIN_ROOM = async (chatRoom: RoomsTypes) => {
    setError("");
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/room/join`, chatRoom, {
        headers: { Authorization: Authentication_Token },
      });
      const roomID = data?.room?.roomId;
      const isExist = data?.isExist;
      setLoading(false);
      if (isExist) {
        handleMessagesSeen(chatRoom?.user1, roomID);
        setError("");
      }
      roomID
        ? router.push(`${PATHS.chat}/${roomID}`)
        : setError({
            message:
              "Something went wrong from server. Please try again later!",
          });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  // -- get single room ---
  const handleGetSingleRoom = async (roomId: string) => {
    setError("");
    setLoading(true);
    try {
      const { data } = await axios.get(`${API}/room/${roomId}`, {
        headers: { Authorization: Authentication_Token },
      });
      setLoading(false);
      setError("");
      setRoom(data);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
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
