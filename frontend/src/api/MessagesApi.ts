import axios from "axios";
import { config } from "./config";
import { MessageTypes } from "@/globle";

const API = config.Backend_Api;

// -- send messages ---
export const sendMessage = async (data: MessageTypes) => {
  try {
    const response = await axios.post(`${API}/msg`, data);
    return response.data;
  } catch (error) {
    console.log("error: ", error);
  }
};

// -- get room messages  ---
export const getRoomMessages = async (roomId: string) => {
  try {
    const response = await axios.get(`${API}/msg/${roomId}`);
    return response.data;
  } catch (error) {
    console.log("error: ", error);
  }
};

// -- set messages seen  ---
export const handleMessagesSeen = async (otherUserId: string) => {
  try {
    const response = await axios.patch(`${API}/msg/seen/${otherUserId}`);
    return response.data;
  } catch (error) {
    console.log("error: ", error);
  }
};
