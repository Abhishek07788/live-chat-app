import { socket } from "@/config/config";
import { MessageTypes } from "@/globle";
import { useState } from "react";
import { config } from "@/config/config";
import axios, { AxiosError } from "axios";

const { API, AxiosAuthConfig } = config;
export const ChatApiFunctions = () => {
  const [allMessages, setAllMessages] = useState<MessageTypes[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | any>();
  const [unseenCount, setUnseenCount] = useState(0);
  const [lastMsg, setLastMsg] = useState<MessageTypes>();

  const handleApiRequest = async (requestFunction: any, ...args: any[]) => {
    setError("");
    setLoading(true);
    try {
      const { data } = await requestFunction(...args);
      setError("");
      setLoading(false);
      return data;
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  // -- get room messages  ---
  const getRoomMessages = async (roomId: string) => {
    const data = await handleApiRequest(
      axios.get,
      `${API}/msg/${roomId}`,
      AxiosAuthConfig
    );
    setAllMessages(data);
  };

  // -- send messages ---
  const handleSendMessage = async (
    newMessage: MessageTypes,
    setMessage: (message: string) => void
  ) => {
    const data = await handleApiRequest(
      axios.post,
      `${API}/msg`,
      newMessage,
      AxiosAuthConfig
    );
    setAllMessages((prevMessages) => [...prevMessages, data]);
    socket.emit("send-message", data);
    setMessage("");
  };

  // -- set messages seen  ---
  const handleMessagesSeen = async (userId: string, roomId: string) => {
    const data = await handleApiRequest(
      axios.patch,
      `${API}/msg/seen`,
      {
        userId,
        roomId,
      },
      AxiosAuthConfig
    );
    setAllMessages(data.msg);
  };

  // -- get unseen count messages ---
  const getUnseenMessages = async (userId: string, roomId: string) => {
    const data = await handleApiRequest(
      axios.post,
      `${API}/msg/unseen/count`,
      {
        userId,
        roomId,
      },
      AxiosAuthConfig
    );
    setUnseenCount(data?.count);
    setLastMsg(data.lastMsg);
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
