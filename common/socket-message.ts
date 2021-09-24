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
  | "req-get-rooms"
  | "res-get-rooms"
  | "req-create-room"
  | "res-create-room"
  | "req-delete-room"
  | "req-join-room"
  | "left-room"
  | "conn"
  | "answer";
