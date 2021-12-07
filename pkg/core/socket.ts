import * as ws from "ws";
import * as http from "http";
import express from "express";
import { IncomingMessage } from "http";
import * as uuid from "uuid";
import * as commonType from "../../ui/common/socket-message";
import * as room from "./model/socket/room";
import { throws } from "assert";
let socketio = require("socket.io");

type user = {
  userId: string;
  socket: WebSocket;
};

type room = {
  roomID: string;
  userID: string[];
};
const maximum = process.env.MAXIMUM || 4;

export class Server {
  private readonly DEFAULT_PORT = 8888;
  private server: http.Server;
  private app: express.Application;
  // private websocketHandler: WebSocketHandler;
  private users: any[];
  private socketToRoom: any[];
  private io: any;
  private socket: any;

  constructor() {
    console.log("starting create socket");
    this.app = express();
    this.users = new Array();
    this.socketToRoom = new Array();
    const cors = require("cors");
    this.app.use(cors());
    console.log("user: ", this.users);

    this.server = http.createServer(this.app);
    // this.socket = new ws.Server({
    //   server: this.server,
    // });
    this.io = socketio.listen(this.server);

    // this.websocketHandler = new WebSocketHandler();

    this.handleSocketConnection();
  }

  public handleSocketConnection(): void {
    this.io.on("connection", (socket: any) => {
      socket.on("join_room", (data: any) => {
        if (this.users[data.room]) {
          const length = this.users[data.room].length;
          if (length === maximum) {
            socket.to(socket.id).emit("room_full");
            return;
          }
          this.users[data.room].push({ id: socket.id, email: data.email });
        } else {
          this.users[data.room] = [{ id: socket.id, email: data.email }];
        }
        this.socketToRoom[socket.id] = data.room;

        socket.join(data.room);
        console.log(`[${this.socketToRoom[socket.id]}]: ${socket.id} enter`);

        const usersInThisRoom = this.users[data.room].filter(
          (user: any) => user.id !== socket.id
        );

        console.log(usersInThisRoom);

        this.io.sockets.to(socket.id).emit("all_users", usersInThisRoom);
      });

      socket.on("offer", (data: any) => {
        //console.log(data.sdp);
        socket.to(data.offerReceiveID).emit("getOffer", {
          sdp: data.sdp,
          offerSendID: data.offerSendID,
          offerSendEmail: data.offerSendEmail,
        });
      });

      socket.on("answer", (data: any) => {
        //console.log(data.sdp);
        socket.to(data.answerReceiveID).emit("getAnswer", {
          sdp: data.sdp,
          answerSendID: data.answerSendID,
        });
      });

      socket.on("candidate", (data: any) => {
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
          room = room.filter((user: any) => user.id !== socket.id);
          this.users[roomID] = room;
          if (room.length === 0) {
            delete this.users[roomID];
            return;
          }
        }
        socket.to(roomID).emit("user_exit", { id: socket.id });
        console.log(this.users);
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

  public listen() {
    console.log("listening on " + this.DEFAULT_PORT);
    // this.app.listen(this.DEFAULT_PORT);
    // this.server.addListener("")
    this.server.listen(this.DEFAULT_PORT);
  }
}
