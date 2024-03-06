import useCurrentUser from "@/hooks/useCurrentUser";
import io from "socket.io-client";

export const useConfig = () => {
  const { currentUser } = useCurrentUser();

  const API = process.env.NEXT_PUBLIC_BACKEND_API || "";
  const socket = io(API);
  const AxiosAuthConfig = {
    headers: { Authorization: currentUser?.userName },
  };

  return { API, AxiosAuthConfig, socket };
};
