export interface IMessage {
  isSystemMessage: boolean;
  userIcon?: string;
  userNickname: string;
  body: string;
  permId: string;
  timestamp: number;
}

export interface User {
  userId: string;
  userNickname: string;
  userIcon?: string;
}