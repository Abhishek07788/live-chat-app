import axios from "axios";
import { config } from "./config";
import { RoomsTypes } from "@/globle";

const { API, Authentication_Token } = config;
// -- join room ---
export const handleJoinRoom = async (data: RoomsTypes) => {
  try {
    const response = await axios.post(`${API}/room/join`, data, {
      headers: { Authorization: Authentication_Token },
    });
    return response.data;
  } catch (error) {
    console.log("error: ", error);
  }
};

// -- get single room ---
export const getSingleRoom = async (roomId: string) => {
  try {
    const response = await axios.get(`${API}/room/${roomId}`, {
      headers: { Authorization: Authentication_Token },
    });
    return response.data;
  } catch (error) {
    console.log("error: ", error);
  }
};

// -- update/block room user ---
export const handleBlockRoomUser = async (data: RoomsTypes) => {
  try {
    const response = await axios.put(`${API}/room/block/${data._id}`, data, {
      headers: { Authorization: Authentication_Token },
    });
    return response.data;
  } catch (error) {
    console.log("error: ", error);
  }
};
