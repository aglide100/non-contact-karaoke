import * as ws from "ws";
import express, { Application } from "express";
import fs from "fs";
import * as https from "https";

const cred = {
  key: fs.readFileSync("./keys/server.key"),
  cert: fs.readFileSync("./keys/server.crt"),
  ca: fs.readFileSync("./keys/ca.key"),
};

export class Server {
  private readonly DEFAULT_PORT = 5000;
  private wss: ws.Server;
  // private app: Application;
  private server: any;

  constructor() {
    console.log("starting create wss");
    // this.app = express();
    this.server = https.createServer(cred, function (request, response) {
      console.log(new Date() + "Received request from " + request.url);
      response.writeHead(404);
      response.end();
    });
    // .listen(this.DEFAULT_PORT, function () {
    //   console.log("listening...");
    // });

    // this.server = this.app.listen(this.DEFAULT_PORT, function () {
    //   console.log("listening on 5000");
    // });

    this.wss = new ws.Server({
      server: this.server,
    });

    this.handleSocketConnection();
  }

  public handleSocketConnection(): void {
    this.wss.on("connection", function (ws, req) {
      console.log("!!!!!");
      ws.emit("messege", "32222");
    });
  }

  public listen() {
    console.log("listening on " + this.DEFAULT_PORT);
    this.server.listen(this.DEFAULT_PORT);
  }
}
