import io from "socket.io-client";

const getCurrentUser = () => {
  const storedUsers = localStorage.getItem("currentUser");
  return storedUsers ? JSON.parse(storedUsers) : {};
};

export const config = {
  API: process.env.NEXT_PUBLIC_BACKEND_API || "",
  AxiosAuthConfig: {
    headers: { Authorization: getCurrentUser()?.userName },
  },
};

export const socket = io(config.API);
