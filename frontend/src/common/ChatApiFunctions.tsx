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
  const [error, setError] = useState("");
  const [unseenCount, setUnseenCount] = useState(0);
  const [lastMsg, setLastMsg] = useState<MessageTypes>();

  const handleGetAllChats = (roomId: string) => {
    setError("");
    setLoading(true);
    getRoomMessages(roomId)
      .then((Messages) => {
        setAllMessages(Messages);
        {
          Messages?.type === "AUTH" && setError(Messages.message);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("error: ", error.message);
        setLoading(false);
        setError(error.message);
      });
  };

  const handleSendMessage = (
    newMessage: MessageTypes,
    setMessage: (message: string) => void
  ) => {
    setError("");
    setLoading(true);
    sendMessage(newMessage)
      .then((msg) => {
        setAllMessages((prevMessages) => [...prevMessages, msg]);
        socket.emit("send-message", msg);
        {
          msg?.type === "AUTH" && setError(msg.message);
        }
        setLoading(false);
        setMessage("");
      })
      .catch((error) => {
        console.error("error: ", error.message);
        setLoading(false);
        setError(error.message);
      });
  };

  const SeenAllMessages = (otherUserId: string, roomId: string) => {
    setError("");
    setLoading(true);
    handleMessagesSeen(otherUserId, roomId)
      .then((data) => {
        setAllMessages(data.msg);
        {
          data?.type === "AUTH" && setError(data.message);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("error: ", error.message);
        setLoading(false);
        setError(error.message);
      });
  };

  const getUnseenMessages = (otherUserId: string, roomId: string) => {
    setError("");
    getUnseenMessagesAndCount(otherUserId, roomId)
      .then((data) => {
        setUnseenCount(data.count);
        setLastMsg(data.lastMsg);
        {
          data?.type === "AUTH" && setError(data.message);
        }
      })
      .catch((error) => {
        console.error("error: ", error.message);
        setError(error.message);
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
