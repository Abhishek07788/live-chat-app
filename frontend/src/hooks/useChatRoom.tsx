import { useState } from "react";

const getRooms = () => {
  const storedRoom = localStorage.getItem("chat-room");
  return storedRoom ? JSON.parse(storedRoom) : [];
};
const useChatRoom = () => {
  const [allRooms, setAllRooms] = useState(getRooms());
  return { allRooms, setAllRooms };
};

export default useChatRoom;
