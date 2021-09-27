export type userProps = {
  userID: string;
  socket: WebSocket;
  roomID: string;
};

export class User {
  private static instance: User;
  private static user: userProps;

  constructor() {}

  public static getInstance(): User {
    if (!User.instance) {
      console.log("create user instance...");
      User.instance = new User();
    }

    return User.instance;
  }

  public getUser(): userProps {
    return User.user;
  }
}
