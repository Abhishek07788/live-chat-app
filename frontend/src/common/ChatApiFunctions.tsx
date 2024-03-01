import {
  getRoomMessages,
  handleMessagesSeen,
  sendMessage,
} from "@/api/MessagesApi";
import { socket } from "@/api/config";
import { MessageTypes } from "@/globle";
import { useState } from "react";

export const ChatApiFunctions = (roomId: string) => {
  const [allMessages, setAllMessages] = useState<MessageTypes[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleGetAllChats = () => {
    setError(false);
    setLoading(true);
    getRoomMessages(roomId)
      .then((Messages) => {
        setAllMessages(Messages);
        setError(false);
        setLoading(false);
      })
      .catch((error) => {
        console.error("error: ", error);
        setLoading(false);
        setError(true);
      });
  };

  const handleSendMessage = (
    newMessage: MessageTypes,
    setMessage: (message: string) => void
  ) => {
    setError(false);
    setLoading(true);
    sendMessage(newMessage)
      .then((msg) => {
        setAllMessages((prevMessages) => [...prevMessages, msg]);
        socket.emit("send-message", msg);
        setError(false);
        setLoading(false);
        setMessage("");
      })
      .catch((error) => {
        console.error("error: ", error);
        setLoading(false);
        setError(true);
      });
  };

  const SeenAllMessages = (otherUserId: string) => {
    setError(false);
    setLoading(true);
    handleMessagesSeen(otherUserId)
      .then((data) => {
        setError(false);
        setLoading(false);
      })
      .catch((error) => {
        console.error("error: ", error);
        setLoading(false);
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
    SeenAllMessages,
  };
};
