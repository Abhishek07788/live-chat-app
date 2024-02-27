import { useState } from "react";

const getMessages = () => {
  const storedMessages = localStorage.getItem("messages");
  return storedMessages ? JSON.parse(storedMessages) : [];
};

export const useAllMessages = () => {
  const [allMessages, setAllMessages] = useState(getMessages());
  const count = allMessages.length;
  return { allMessages, setAllMessages, count };
};
