import { getRoomMessages, sendMessage } from "@/api/MessagesApi";
import { socket } from "@/api/config";
import { MessageTypes } from "@/globle";
import { useState } from "react";

export const ChatApiFunctions = (roomId: string) => {
  const [allMessages, setAllMessages] = useState<MessageTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleGetAllChats = () => {
    getRoomMessages(roomId)
      .then((Messages) => {
        setAllMessages(Messages);
        setLoading(false);
      })
      .catch((error) => {
        setError(true);
      });
  };

  const handleSendMessage = (
    newMessage: MessageTypes,
    setMessage: (message: string) => void
  ) => {
    sendMessage(newMessage)
      .then((msg) => {
        setAllMessages((prevMessages) => [...prevMessages, msg]);
        socket.emit("send-message", msg);
        setLoading(false);
        setMessage("");
      })
      .catch((error) => {
        setError(true);
      });
  };

  return {
    loading,
    error,
    handleGetAllChats,
    handleSendMessage,
    allMessages,
    setAllMessages,
  };
};
