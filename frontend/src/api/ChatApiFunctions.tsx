import { socket } from "@/config/config";
import { MessageTypes } from "@/globle";
import { useState } from "react";
import { config } from "@/config/config";
import axios, { AxiosError } from "axios";

const { API, Authentication_Token } = config;
export const ChatApiFunctions = () => {
  const [allMessages, setAllMessages] = useState<MessageTypes[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | any>();
  const [unseenCount, setUnseenCount] = useState(0);
  const [lastMsg, setLastMsg] = useState<MessageTypes>();

  // -- get room messages  ---
  const getRoomMessages = async (roomId: string) => {
    setError("");
    setLoading(true);
    try {
      const { data } = await axios.get(`${API}/msg/${roomId}`, {
        headers: { Authorization: Authentication_Token },
      });
      setAllMessages(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  // -- send messages ---
  const handleSendMessage = async (
    newMessage: MessageTypes,
    setMessage: (message: string) => void
  ) => {
    setLoading(true);
    setMessage("");
    setError("");
    try {
      const { data } = await axios.post(`${API}/msg`, newMessage, {
        headers: { Authorization: Authentication_Token },
      });
      setAllMessages((prevMessages) => [...prevMessages, data]);
      socket.emit("send-message", data);
      setLoading(false);
      setMessage("");
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  // -- set messages seen  ---
  const handleMessagesSeen = async (userId: string, roomId: string) => {
    setError("");
    setLoading(true);
    try {
      await axios.patch(
        `${API}/msg/seen`,
        {
          userId,
          roomId,
        },
        {
          headers: { Authorization: Authentication_Token },
        }
      );
      setError("");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  // -- get unseen count messages ---
  const getUnseenMessages = async (userId: string, roomId: string) => {
    setError("");
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${API}/msg/unseen/count`,
        {
          userId,
          roomId,
        },
        {
          headers: { Authorization: Authentication_Token },
        }
      );
      setUnseenCount(data.count);
      setLastMsg(data.lastMsg);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return {
    loading,
    error,
    getRoomMessages,
    handleSendMessage,
    allMessages,
    setAllMessages,
    handleMessagesSeen,
    getUnseenMessages,
    unseenCount,
    setUnseenCount,
    setLastMsg,
    lastMsg,
  };
};
