import * as ws from "ws";
import express, { Application } from "express";
import fs from "fs";

export class Server {
  private readonly DEFAULT_PORT = 5000;
  private wss: ws.Server;
  private app: Application;
  private server: any;

  constructor() {
    console.log("starting create wss");
    this.app = express();
    this.server = this.app.listen(this.DEFAULT_PORT, function () {
      console.log("listening on 5000");
    });

    this.wss = new ws.Server({
      server: this.server,
    });

    const cred = {
      key: fs.readFileSync("./keys/server.key"),
      cert: fs.readFileSync("./keys/server.crt"),
    };

    this.handleSocketConnection();
  }

  public handleSocketConnection(): void {
    this.wss.on("connection", function (ws, req) {
      console.log("!!!!!");
      ws.emit("messege", "32222");
    });
  }

  // private listen() {
  //   console.log("listening on " + this.DEFAULT_PORT);

  // }
}
