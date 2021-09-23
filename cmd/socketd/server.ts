import * as ws from "ws";
import fs from "fs";
import * as https from "https";
import express from "express";
import { IncomingMessage } from "http";
import * as uuid from "uuid";
import * as commonType from "../../common/socket-message";

var session = require("express-session");

const cred = {
  key: fs.readFileSync("./keys/server.key"),
  cert: fs.readFileSync("./keys/server.crt"),
  ca: fs.readFileSync("./keys/ca.key"),
};

type users = {
  userId: string;
  socket: WebSocket;
};

export class Server {
  private readonly DEFAULT_PORT = 5000;
  private socket: ws.Server;
  private server: https.Server;
  private app: express.Application;
  // private users: users[]

  constructor() {
    console.log("starting create socket");
    this.app = express();

    this.server = https.createServer(cred, this.app);
    // this.server = https.createServer(cred, function (request, response) {
    //   console.log(new Date() + "Received request from " + request.url);
    //   response.writeHead(404);
    //   response.end();
    // });

    this.socket = new ws.Server({
      server: this.server,
    });

    this.handleSocketConnection();
  }

  private sendUserList() {}
  public handleSocketConnection(): void {
    this.socket.on("connection", this.onConnection);
  }

  private onConnection(ws: WebSocket, req: IncomingMessage) {
    // console.log(ws);
    // console.log(req);

    const newUUID = uuid.v4();
    let data: commonType.socketMessage = {
      type: "conn",
      to: "",
      from: "server",
      content: newUUID,
    };
    let json = JSON.stringify(data);

    ws.send(json);

    ws.onmessage = function (ev: MessageEvent) {
      // console.log("receive msg!" + ev.data);
      const common: commonType.socketMessage = JSON.parse(ev.data);

      console.log(common);
      if (common) {
        if (common.type === "create-room") {
          console.log("someone call create room");
        }

        if (common.type === "chat") {
          console.log("Chat" + common);
        }

        if (common.type === "answer") {
          console.log("Answer" + common);
        }
      }
    };

    ws.onclose = function (ev: CloseEvent) {
      console.log("Closed!" + ev.code + "||" + ev.reason);
    };
  }

  public listen() {
    console.log("listening on " + this.DEFAULT_PORT);
    this.server.listen(this.DEFAULT_PORT);
  }
}
