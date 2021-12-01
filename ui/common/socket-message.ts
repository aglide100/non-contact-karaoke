export type socketMessage = {
  type: socketMsgType;
  to: string;
  from: string;
  content: string;
};

// conn is using onConnection
export type socketMsgType =
  // 회원가입
  | "req-join-user"
  | "res-join-user"
  | "res-join-error"
  // 채팅
  | "req-chat-in-room"
  | "res-chat-in-room"
  // 로그인
  | "res-login-error"
  | "req-login-user"
  | "res-login-user"
  // 룸
  | "res-get-rooms"
  | "res-create-room"
  | "res-join-room"
  | "req-get-rooms"
  | "req-create-room"
  | "req-delete-room"
  | "req-join-room"
  | "left-room"
  | "req-user-in-room"
  | "res-user-in-room"
  // 기타
  | "conn"
  | "answer"
  | "announce";
