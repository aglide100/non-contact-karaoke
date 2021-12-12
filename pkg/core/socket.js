"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const http = __importStar(require("http"));
const express_1 = __importDefault(require("express"));
let socketio = require("socket.io");
const maximum = process.env.MAXIMUM || 4;
class Server {
    constructor() {
        this.DEFAULT_PORT = 8888;
        console.log("starting create socket");
        this.app = (0, express_1.default)();
        this.users = new Array();
        this.socketToRoom = new Array();
        this.rooms = new Array();
        const cors = require("cors");
        this.app.use(cors());
        console.log("user: ", this.users);
        this.server = http.createServer(this.app);
        this.io = socketio.listen(this.server);
        this.handleSocketConnection();
    }
    handleSocketConnection() {
        this.io.on("connection", (socket) => {
            socket.on("join_room", (data) => {
                if (this.users[data.room]) {
                    const length = this.users[data.room].length;
                    if (length === maximum) {
                        socket.to(socket.id).emit("room_full");
                        return;
                    }
                    this.users[data.room].push({ id: socket.id, email: data.email });
                    this.rooms.map((room) => {
                        if (room !== data.room) {
                            return data.room;
                        }
                    });
                    // this.rooms.push({roomId: data.room})
                }
                else {
                    this.users[data.room] = [{ id: socket.id, email: data.email }];
                    this.rooms = [{ roomId: data.room }];
                }
                this.socketToRoom[socket.id] = data.room;
                socket.join(data.room);
                console.log(`[${this.socketToRoom[socket.id]}]: ${socket.id} enter`);
                console.log("users: ", this.users);
                const usersInThisRoom = this.users[data.room].filter((user) => user.id !== socket.id);
                console.log(usersInThisRoom);
                this.io.sockets.to(socket.id).emit("all_users", usersInThisRoom);
            });
            socket.on("get_rooms", (data) => {
                // let rooms = []
                // rooms = Object.values(this.users)
                // rooms = rooms.map((room) => {
                //   return ({
                //     id: room.id,
                //     email: room.email,
                //     room,
                //   })
                // })
                this.io.sockets.to(socket.id).emit("all_rooms", this.rooms);
            });
            socket.on("get_users", (data) => {
                const usersInThisRoom = this.users[data.room];
                this.io.sockets.to(socket.id).emit("in_users", usersInThisRoom);
            });
            socket.on("offer", (data) => {
                //console.log(data.sdp);
                socket.to(data.offerReceiveID).emit("getOffer", {
                    sdp: data.sdp,
                    offerSendID: data.offerSendID,
                    offerSendEmail: data.offerSendEmail,
                });
            });
            socket.on("answer", (data) => {
                //console.log(data.sdp);
                socket.to(data.answerReceiveID).emit("getAnswer", {
                    sdp: data.sdp,
                    answerSendID: data.answerSendID,
                });
            });
            socket.on("candidate", (data) => {
                //console.log(data.candidate);
                socket.to(data.candidateReceiveID).emit("getCandidate", {
                    candidate: data.candidate,
                    candidateSendID: data.candidateSendID,
                });
            });
            socket.on("disconnect", () => {
                console.log(`[${this.socketToRoom[socket.id]}]: ${socket.id} exit`);
                const roomID = this.socketToRoom[socket.id];
                let room = this.users[roomID];
                if (room) {
                    this.rooms.filter((room) => room !== roomID);
                    room = room.filter((user) => user.id !== socket.id);
                    this.users[roomID] = room;
                    if (room.length === 0) {
                        delete this.users[roomID];
                        this.users = this.users.filter((user) => user != null);
                        return;
                    }
                }
                socket.to(roomID).emit("user_exit", { id: socket.id });
                console.log("after delete user ", this.users);
            });
            // this.socket.on("connection", (ws: WebSocket, req: IncomingMessage) => {
            //   this.onConnection(ws, req);
            // });
        });
    }
    // private onConnection(ws: WebSocket, req: IncomingMessage) {
    //   // console.log(ws);
    //   // req 쿠키나 세션 체크
    //   // const newUUID = uuid.v4();
    //   // const newUser: user = { userId: newUUID, socket: ws };
    //   let data: commonType.socketMessage = {
    //     type: "conn",
    //     to: "",
    //     from: "server",
    //     // 임시로 uuid발급!
    //     content: "Hello",
    //   };
    //   let json = JSON.stringify(data);
    //   // this.users.push(newUser);
    //   ws.send(json);
    //   console.log("current users", this.users.length);
    //   console.log("current rooms", room.Room.getInstance().getRooms().length);
    //   ws.onmessage = (ev: MessageEvent) => {
    //     this.websocketHandler.onMessage(ws, ev);
    //   };
    //   ws.onclose = (ev: CloseEvent) => {
    //     this.onClose(ws, ev);
    //   };
    // }
    // private onClose(ws: WebSocket, ev: CloseEvent): void {
    //   console.log("Closed!" + ev.code + "||" + ev.reason);
    //   this.users = this.users.filter((user) => {
    //     // user.socket != ws
    //     if (user.socket == ws) {
    //       console.log(user.userId + " is left");
    //       room.Room.getInstance().leftUser(user.userId);
    //     } else {
    //       return user;
    //     }
    //   });
    // }
    listen() {
        console.log("listening on " + this.DEFAULT_PORT);
        // this.app.listen(this.DEFAULT_PORT);
        // this.server.addListener("")
        this.server.listen(this.DEFAULT_PORT);
    }
}
exports.Server = Server;
