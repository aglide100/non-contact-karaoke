export type socketMessage = {
  type: socketMsgType;
  to: string;
  from: string;
  content: string;
};

// conn is using onConnection
export type socketMsgType =
  | "announce"
  | "chat"
  | "create-room"
  | "delete-room"
  | "conn"
  | "answer";
