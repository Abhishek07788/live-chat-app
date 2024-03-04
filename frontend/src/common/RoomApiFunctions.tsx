import { getSingleRoom, handleJoinRoom } from "@/api/RoomsApi";
import { PATHS } from "@/constants/routes";
import { RoomsTypes } from "@/globle";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ChatApiFunctions } from "./ChatApiFunctions";

export const RoomApiFunctions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [room, setRoom] = useState<RoomsTypes>();
  const router = useRouter();
  const { SeenAllMessages } = ChatApiFunctions();
  const { currentUser } = useCurrentUser();

  const JOIN_ROOM = (chatRoom: RoomsTypes) => {
    setError(false);
    setLoading(true);
    handleJoinRoom(chatRoom)
      .then((data) => {
        const roomID = data?.room?.roomId;
        const isExist = data?.isExist;
        if (isExist) {
          SeenAllMessages(chatRoom?.user1, roomID);
        }
        roomID
          ? router.push(`${PATHS.chat}/${roomID}`)
          : alert("Something went wrong. Please try again!");
        setError(false);
        setLoading(false);
      })
      .catch((error) => {
        console.error("error: ", error);
        setLoading(false);
        setError(true);
      });
  };

  const handleGetSingleRoom = (roomId: string) => {
    setError(false);
    setLoading(true);
    getSingleRoom(roomId)
      .then((room) => {
        setRoom(room);
        setError(false);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
      });
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
