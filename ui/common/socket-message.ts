export type socketMessage = {
  type: socketMsgType;
  to: string;
  from: string;
  content: string;
};

// conn is using onConnection
export type socketMsgType =
  | "announce"
  | "req-chat-in-room"
  | "res-chat-in-room"
  | "res-login-error"
  | "res-get-rooms"
  | "res-create-room"
  | "res-join-room"
  | "req-get-rooms"
  | "req-login-user"
  | "res-login-user"
  | "req-create-room"
  | "req-delete-room"
  | "req-join-room"
  | "left-room"
  | "conn"
  | "answer";
