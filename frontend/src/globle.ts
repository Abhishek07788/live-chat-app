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
  roomId: string;
  user1: UsersTypes | any;
  user2: UsersTypes;
  blocked?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface MessageTypes {
  _id?: string;
  roomId: string;
  currentUser: UsersTypes | any;
  chat: string;
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
