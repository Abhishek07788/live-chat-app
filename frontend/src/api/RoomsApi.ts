import axios from "axios";
import { config } from "./config";
import { RoomsTypes } from "@/globle";

const API = config.Backend_Api;

// -- join room ---
export const handleJoinRoom = async (data: RoomsTypes) => {
  try {
    const response = await axios.post(`${API}/room/join`, data);
    return response.data;
  } catch (error) {
    console.log("error: ", error);
  }
};

// -- get single room ---
export const getSingleRoom = async (roomId: string) => {
  try {
    const response = await axios.get(`${API}/room/${roomId}`);
    return response.data;
  } catch (error) {
    console.log("error: ", error);
  }
};

// -- update/block room user ---
export const handleBlockRoomUser = async (data: RoomsTypes) => {
  console.log("data: ", data);
  try {
    const response = await axios.put(`${API}/room/block/${data._id}`, data);
    return response.data;
  } catch (error) {
    console.log("error: ", error);
  }
};