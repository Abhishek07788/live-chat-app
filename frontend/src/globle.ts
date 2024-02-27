export interface UsersTypes {
  userName: string;
  password: string;
  name: string;
}
export interface RoomsTypes {
  roomUsers: string[];
  roomId: string;
  user1: UsersTypes;
  user2: UsersTypes;
}

export interface MessageTypes {
  roomId: string;
  currentUserId: string;
  users: string[];
  chat: string;
  time: string;
  isSeen: boolean;
}

export interface IsTypingTypes {
  isTyping: boolean;
  roomId: string;
  currentUserId: string;
}

export interface IsOnlineTypes {
  isOnline: boolean;
  roomId: string;
  currentUserId: string;
}
