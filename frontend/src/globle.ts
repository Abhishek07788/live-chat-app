export interface UsersTypes {
  userName: string;
  password: string;
  name: string;
}
export interface RoomsTypes {
  roomUsers: string[];
  user1: UsersTypes;
  user2: UsersTypes;
}

export interface MessageTypes {
  roomId: string;
  currentUserId: string;
  users: string[];
  chat: string;
  time: string;
}
