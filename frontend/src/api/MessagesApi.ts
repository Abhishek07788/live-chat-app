import axios from "axios";
import { config } from "./config";
import { MessageTypes } from "@/globle";

const { Backend_Api, Authentication_Token } = config;

// -- send messages ---
export const sendMessage = async (data: MessageTypes) => {
  try {
    const response = await axios.post(`${Backend_Api}/msg`, data, {
      headers: { Authorization: Authentication_Token },
    });
    return response.data;
  } catch (error) {
    console.log("error: ", error);
  }
};

// -- get room messages  ---
export const getRoomMessages = async (roomId: string) => {
  try {
    const response = await axios.get(`${Backend_Api}/msg/${roomId}`, {
      headers: { Authorization: Authentication_Token },
    });
    return response.data;
  } catch (error) {
    console.log("error: ", error);
  }
};

// -- set messages seen  ---
export const handleMessagesSeen = async (userId: string, roomId: string) => {
  try {
    const response = await axios.patch(
      `${Backend_Api}/msg/seen`,
      {
        userId,
        roomId,
      },
      {
        headers: { Authorization: Authentication_Token },
      }
    );
    return response.data;
  } catch (error) {
    console.log("error: ", error);
  }
};

// -- get unseen count messages ---
export const getUnseenMessagesAndCount = async (
  userId: string,
  roomId: string
) => {
  try {
    const response = await axios.post(
      `${Backend_Api}/msg/unseen/count`,
      {
        userId,
        roomId,
      },
      {
        headers: { Authorization: Authentication_Token },
      }
    );
    return response.data;
  } catch (error) {
    console.log("error: ", error);
  }
};
