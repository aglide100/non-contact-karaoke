export type roomProps = {
  roomID: string;
  userID: string[];
};

export class Room {
  private static instance: Room;
  private static rooms: roomProps[];

  constructor() {}

  public static getInstance(): Room {
    if (!Room.instance) {
      console.log("create room instance...");
      Room.instance = new Room();
    }

    return Room.instance;
  }

  public newRoom(newRoom: roomProps): boolean {
    if (Room.rooms == undefined) {
      Room.rooms = new Array();
    }

    try {
      Room.rooms.push(newRoom);
    } catch (e) {
      console.log("Can't push room obj....");
      console.error(e);
      return false;
    }
    return true;
  }

  public joinRoom(userID: string, roomID: string) {
    if (Room.rooms == undefined) {
      Room.rooms = new Array();
    }

    Room.rooms.map((room) => {
      if (room.roomID == roomID) {
        console.log(userID + " is joined " + room.roomID);
        room.userID.push(userID);
      }

      return room;
    });
  }

  public leftUser(userID: string) {
    if (Room.rooms == undefined) {
      Room.rooms = new Array();
    }

    Room.rooms = Room.rooms.filter((room) => {
      return room.userID.filter((user) => {
        if (user == userID) {
          //   passed
        } else {
          return user;
        }
      });
    });

    this.deleteUnUsedRoom();
  }

  public deleteUnUsedRoom() {
    if (Room.rooms == undefined) {
      Room.rooms = new Array();
    }

    Room.rooms = Room.rooms.filter((room) => {
      if (room.userID == null) {
        console.log("room removed");
      } else {
        return room;
      }
    });
  }

  public getRooms(): roomProps[] {
    if (Room.rooms == undefined) {
      Room.rooms = new Array();
    }

    return Room.rooms;
  }
}
