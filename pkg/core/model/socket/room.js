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
    findRoom(roomID) {
        if (Room.rooms == undefined) {
            Room.rooms = new Array();
        }
        let result;
        Room.rooms.map((room) => {
            if (room.roomID == roomID) {
                result = room;
            }
        });
        return result;
    }
    joinRoom(userID, roomID) {
        if (Room.rooms == undefined) {
            Room.rooms = new Array();
        }
        Room.rooms.map((room) => {
            if (room.roomID == roomID) {
                console.log(userID + " is joined " + room.roomID);
                room.userID.map((user) => {
                    if (user == userID) {
                        console.log(userID + " is already joind room!");
                    }
                    else {
                        room.userID.push(userID);
                    }
                });
            }
            return room;
        });
        return roomID;
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
                var isAlone;
                if (room.userID.length == 1) {
                    isAlone = true;
                }
                else {
                    isAlone = false;
                }
                if (user == userID) {
                    //   passed
                    console.log("left user in room");
                    if (Room.rooms.length > 0) {
                        Room.rooms.length = Room.rooms.length - 1;
                    }
                }
                else {
                    isAlone = false;
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
