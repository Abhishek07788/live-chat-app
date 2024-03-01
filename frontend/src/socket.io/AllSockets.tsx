import { socket } from "@/api/config";
import useCurrentUser from "@/hooks/useCurrentUser";

export const AllSockets = (roomId: string) => {
  const { currentUser } = useCurrentUser();

  const JOIN_ROOM = () => {
    socket.emit("join-room", { roomId, currentUser });
  };

  const SET_ONLINE = (isOnline: boolean) => {
    socket.emit("set-is-online", {
      roomId,
      isOnline: isOnline,
      currentUserId: currentUser.userName,
    });
  };

  const SET_TYPING = (isTyping: boolean) => {
    socket.emit("set-typing", {
      isTyping: isTyping,
      roomId,
      currentUserId: currentUser.userName,
    });
  };

  return {
    JOIN_ROOM,
    SET_ONLINE,
    SET_TYPING,
  };
};
