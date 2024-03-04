import {
  getRoomMessages,
  getUnseenMessagesAndCount,
  handleMessagesSeen,
  sendMessage,
} from "@/api/MessagesApi";
import { socket } from "@/api/config";
import { MessageTypes } from "@/globle";
import { useState } from "react";

export const ChatApiFunctions = () => {
  const [allMessages, setAllMessages] = useState<MessageTypes[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [unseenCount, setUnseenCount] = useState(0);
  const [lastMsg, setLastMsg] = useState<MessageTypes>();

  const handleGetAllChats = (roomId: string) => {
    setError(false);
    setLoading(true);
    getRoomMessages(roomId)
      .then((Messages) => {
        setAllMessages(Messages);
        setError(false);
        setLoading(false);
      })
      .catch((error) => {
        console.error("error: ", error.message);
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
        console.error("error: ", error.message);
        setLoading(false);
        setError(true);
      });
  };

  const SeenAllMessages = (otherUserId: string, roomId: string) => {
    setError(false);
    setLoading(true);
    handleMessagesSeen(otherUserId, roomId)
      .then((data) => {
        setAllMessages(data.msg);
        setError(false);
        setLoading(false);
      })
      .catch((error) => {
        console.error("error: ", error.message);
        setLoading(false);
        setError(true);
      });
  };

  const getUnseenMessages = (otherUserId: string, roomId: string) => {
    getUnseenMessagesAndCount(otherUserId, roomId)
      .then((data) => {
        setUnseenCount(data.count);
        setLastMsg(data.lastMsg);
      })
      .catch((error) => {
        console.error("error: ", error.message);
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
    getUnseenMessages,
    unseenCount,
    setUnseenCount,
    setLastMsg,
    lastMsg,
  };
};
