"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
class Room {
    constructor() { }
    static getInstance() {
        if (!Room.instance) {
            console.log("create room instance...");
            Room.instance = new Room();
        }
        return Room.instance;
    }
    newRoom(newRoom) {
        if (Room.rooms == undefined) {
            Room.rooms = new Array();
        }
        try {
            Room.rooms.push(newRoom);
        }
        catch (e) {
            console.log("Can't push room obj....");
            console.error(e);
            return false;
        }
        return true;
    }
    joinRoom(userID, roomID) {
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
    findUser(userID) {
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
    leftUser(userID) {
        if (Room.rooms == undefined) {
            Room.rooms = new Array();
        }
        Room.rooms = Room.rooms.filter((room) => {
            return room.userID.filter((user) => {
                if (user == userID) {
                    //   passed
                    console.log("left user in room");
                }
                else {
                    return user;
                }
            });
        });
        this.deleteUnUsedRoom();
    }
    deleteRoom(roomID) {
        if (Room.rooms == undefined) {
            Room.rooms = new Array();
        }
        Room.rooms = Room.rooms.filter((room) => {
            if (room.roomID == roomID) {
                // passed
            }
            else {
                return;
            }
        });
    }
    deleteUnUsedRoom() {
        if (Room.rooms == undefined) {
            Room.rooms = new Array();
        }
        Room.rooms = Room.rooms.filter((room) => {
            if (room.userID.length == 0) {
                console.log("room removed");
                Room.rooms.length--;
            }
            else {
                return room;
            }
        });
    }
    getRooms() {
        if (Room.rooms == undefined) {
            Room.rooms = new Array();
        }
        return Room.rooms;
    }
}
exports.Room = Room;
