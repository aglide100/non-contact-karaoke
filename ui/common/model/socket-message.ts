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
  | "res-get-rooms"
  | "res-create-room"
  | "res-join-room"
  | "req-get-rooms"
  | "req-create-room"
  | "req-delete-room"
  | "req-join-room"
  | "left-room"
  | "conn"
  | "answer";
