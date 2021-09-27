export type room = {
  roomID: string;
  userID: string[];
};

export class Room {
  private static instance: Room;
  private rooms: room[];

  constructor() {}

  public static getInstance(): Room {
    if (!Room.instance) {
      console.log("create room instance...");
      Room.instance = new Room();
    }

    return Room.instance;
  }

  public newRoom(newRoom: room): boolean {
    this.rooms.push(newRoom);
    if (this.rooms == undefined) {
      console.log("Can't push room obj....");
      return false;
    }

    return true;
  }

  public leftUser(userID: string) {
    this.rooms = this.rooms.filter((room) => {
      return room.userID.filter((user) => {
        if (user == userID) {
          //   passed
        } else {
          return user;
        }
      });
    });
  }

  public deleteRoom(room: room) {
    this.rooms = this.rooms.filter((room) => {
      if (room.userID == null) {
        console.log("");
      } else {
        return room;
      }
    });
  }

  public getRooms(): room[] {
    return this.rooms;
  }
}
