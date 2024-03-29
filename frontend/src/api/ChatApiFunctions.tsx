import { socket, useConfig } from "@/config/useConfig";
import { MessageTypes } from "@/globle";
import { useState } from "react";
import axios, { AxiosError } from "axios";

export const ChatApiFunctions = () => {
  const { API, AxiosAuthConfig } = useConfig();
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
    if (data && data.status) {
      setAllMessages(data.msg);
    }
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
    if (data?.status) {
      setUnseenCount(data?.count);
      setLastMsg(data?.lastMsg);
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
