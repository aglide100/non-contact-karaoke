import * as ws from "ws";
import fs from "fs";
import * as https from "https";
import express from "express";
import { IncomingMessage } from "http";
import * as uuid from "uuid";
import * as commonType from "../../ui/common/model/socket-message";
import * as room from "./model/socket/room";
import { WebSocketHandler } from "./handler/webSocketHandler";

var session = require("express-session");

const cred = {
  key: fs.readFileSync("./keys/server.key"),
  cert: fs.readFileSync("./keys/server.crt"),
  ca: fs.readFileSync("./keys/ca.key"),
};

type user = {
  userId: string;
  socket: WebSocket;
};

type room = {
  roomID: string;
  userID: string[];
};

export class Server {
  private readonly DEFAULT_PORT = 5000;
  private socket: ws.Server;
  private server: https.Server;
  private app: express.Application;
  private websocketHandler: WebSocketHandler;
  private users: user[];

  private static isLoaded: boolean;

  constructor() {
    console.log("starting create socket");
    this.app = express();
    // this.rooms = new Array();
    this.users = new Array();

    console.log("user: ", this.users);

    this.server = https.createServer(cred, this.app);

    this.socket = new ws.Server({
      server: this.server,
    });

    this.websocketHandler = new WebSocketHandler();

    this.handleSocketConnection();
  }

  public handleSocketConnection(): void {
    this.socket.on("connection", (ws: WebSocket, req: IncomingMessage) => {
      this.onConnection(ws, req);
    });
  }

  private onConnection(ws: WebSocket, req: IncomingMessage) {
    // console.log(ws);
    // console.log(req);
    // req 쿠키나 세션 체크
    const newUUID = uuid.v4();
    let data: commonType.socketMessage = {
      type: "conn",
      to: "",
      from: "server",
      // 임시로 uuid발급!
      content: newUUID,
    };
    let json = JSON.stringify(data);

    const newUser: user = { userId: newUUID, socket: ws };
    console.log("current users", this.users.length);
    console.log("current rooms", room.Room.getInstance().getRooms().length);
    this.users.push(newUser);
    ws.send(json);

    ws.onmessage = (ev: MessageEvent) => {
      this.websocketHandler.onMessage(ws, ev);
    };

    ws.onclose = (ev: CloseEvent) => {
      this.onClose(ws, ev);
    };
  }

  private onClose(ws: WebSocket, ev: CloseEvent): void {
    console.log("Closed!" + ev.code + "||" + ev.reason);
    this.users = this.users.filter((user) => {
      // user.socket != ws
      if (user.socket == ws) {
        console.log(user.userId + " is left");
        room.Room.getInstance().leftUser(user.userId);
      } else {
        return user;
      }
    });
  }

  public listen() {
    console.log("listening on " + this.DEFAULT_PORT);
    this.server.listen(this.DEFAULT_PORT);
  }
}
