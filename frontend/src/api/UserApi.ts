import { UsersTypes } from "@/globle";
import axios from "axios";
import { config } from "./config";

const { API, Authentication_Token } = config;
export const handleSignUp = async (data: UsersTypes) => {
  try {
    const response = await axios.post(`${API}/users/signup`, data);
    return response.data;
  } catch (error) {
    console.error("Error during sign-up:", error);
    throw error;
  }
};

export const handleLogin = async (data: UsersTypes) => {
  try {
    const response = await axios.post(`${API}/users/login`, data);
    return response.data;
  } catch (error) {
    console.error("Error during sign-up:", error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const users = await axios.get(`${API}/users`, {
      headers: { Authorization: Authentication_Token },
    });
    return users.data;
  } catch (error) {
    console.log(error);
  }
};
