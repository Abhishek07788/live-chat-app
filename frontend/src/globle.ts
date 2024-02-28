export interface UsersTypes {
  _id?: string;
  name?: string;
  userName: string;
  password?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AllUsersTypes {
  users: UsersTypes[];
  count: number;
}

export interface RoomsTypes {
  _id?: string;
  roomUsers: string[];
  roomId: string;
  user1: UsersTypes;
  user2: UsersTypes;
  createdAt?: string;
  updatedAt?: string;
}

export interface MessageTypes {
  _id?: string;
  roomId: string;
  currentUserId: string;
  users: string[];
  chat: string;
  time: string;
  isSeen: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface TypingTypes {
  isTyping: boolean;
  roomId: string;
  currentUserId: string;
}

export interface OnlineTypes {
  isOnline: boolean;
  roomId: string;
  currentUserId: string;
}
export interface OtherUsersTypes extends UsersTypes {
  bgcolor1: string;
  bgcolor2: string;
}
