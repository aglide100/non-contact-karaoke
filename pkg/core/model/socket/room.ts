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

  public joinRoom(userID: string, roomID: string): string {
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

    return roomID;
  }

  public findUser(userID: string): boolean {
    if (Room.rooms == undefined) {
      Room.rooms = new Array();
      console.log("there's no room!");
      return false;
    }
    let ok = false;

    Room.rooms.map((room) => {
      room.userID.map((user) => {
        if (user == userID) {
          ok = true;
        }
      });
    });
    return ok;
  }

  public leftUser(userID: string) {
    if (Room.rooms == undefined) {
      Room.rooms = new Array();
    }

    Room.rooms = Room.rooms.filter((room) => {
      return room.userID.filter((user) => {
        var isAlone;

        if (room.userID.length == 1) {
          isAlone = true;
        } else {
          isAlone = false;
        }

        if (user == userID) {
          //   passed
          console.log("left user in room");
          if (Room.rooms.length > 0) {
            Room.rooms.length = Room.rooms.length - 1;
          }
        } else {
          isAlone = false;
          return user;
        }
      });
    });

    this.deleteUnUsedRoom();
  }

  public deleteRoom(roomID: string) {
    if (Room.rooms == undefined) {
      Room.rooms = new Array();
    }

    Room.rooms = Room.rooms.filter((room) => {
      if (room.roomID == roomID) {
        // passed
      } else {
        return;
      }
    });
  }

  public deleteUnUsedRoom() {
    if (Room.rooms == undefined) {
      Room.rooms = new Array();
    }

    Room.rooms = Room.rooms.filter((room) => {
      if (room.userID.length == 0) {
        console.log("room removed");
        Room.rooms.length--;
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
