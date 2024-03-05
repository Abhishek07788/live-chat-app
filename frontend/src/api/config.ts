import io from "socket.io-client";

const getCurrentUser = () => {
  const storedUsers = localStorage.getItem("currentUser");
  return storedUsers ? JSON.parse(storedUsers) : {};
};

export const config = {
  Backend_Api: process.env.BACKEND_API || "http://localhost:8080",
  Authentication_Token: getCurrentUser()?.userName,
};

export const socket = io(config.Backend_Api);
