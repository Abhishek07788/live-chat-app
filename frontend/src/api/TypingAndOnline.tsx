import { socket } from "@/config/useConfig";
import { OnlineTypes, TypingTypes } from "@/globle";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useState } from "react";

let typingTimeout: any;

export const TypingAndOnline = (roomId: string) => {
  const { currentUser } = useCurrentUser();
  const [TypingInfo, setTypingInfo] = useState<TypingTypes>({
    roomId,
    isTyping: false,
    currentUserId: currentUser.userName,
  });
  const [OnlineInfo, setOnlineInfo] = useState<OnlineTypes>({
    roomId,
    isOnline: false,
    currentUserId: currentUser.userName,
  });

  const isOnline =
    OnlineInfo.currentUserId !== currentUser.userName && OnlineInfo.isOnline;
  const isTyping =
    TypingInfo.currentUserId !== currentUser.userName && TypingInfo?.isTyping;

  const handleSetTyping = () => {
    socket.emit("set-typing", {
      isTyping: true,
      roomId,
      currentUserId: currentUser.userName,
    });
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    typingTimeout = setTimeout(() => {
      socket.emit("set-typing", {
        isTyping: false,
        roomId,
        currentUserId: currentUser.userName,
      });
    }, 2000);
  };
  return { isOnline, isTyping, setOnlineInfo, setTypingInfo, handleSetTyping };
};
