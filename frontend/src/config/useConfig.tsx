import useCurrentUser from "@/hooks/useCurrentUser";
import io from "socket.io-client";

const API = process.env.NEXT_PUBLIC_BACKEND_API || "";
export const socket = io(API || "");
export const useConfig = () => {
  const { currentUser } = useCurrentUser();

  const AxiosAuthConfig = {
    API,
    headers: { Authorization: currentUser?.userName },
  };

  return { API, AxiosAuthConfig };
};
