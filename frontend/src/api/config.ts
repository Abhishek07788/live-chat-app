import io from "socket.io-client";
export const config = {
  Backend_Api: process.env.BACKEND_API || "http://localhost:8080",
};

export const socket = io(config.Backend_Api);
