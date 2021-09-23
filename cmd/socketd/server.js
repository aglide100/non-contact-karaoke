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
const ws = __importStar(require("ws"));
const fs_1 = __importDefault(require("fs"));
const https = __importStar(require("https"));
const express_1 = __importDefault(require("express"));
const uuid = __importStar(require("uuid"));
var session = require("express-session");
const cred = {
    key: fs_1.default.readFileSync("./keys/server.key"),
    cert: fs_1.default.readFileSync("./keys/server.crt"),
    ca: fs_1.default.readFileSync("./keys/ca.key"),
};
class Server {
    // private users: users[]
    constructor() {
        this.DEFAULT_PORT = 5000;
        console.log("starting create socket");
        this.app = (0, express_1.default)();
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
    sendUserList() { }
    handleSocketConnection() {
        this.socket.on("connection", this.onConnection);
    }
    onConnection(ws, req) {
        // console.log(ws);
        // console.log(req);
        const newUUID = uuid.v4();
        let data = {
            type: "conn",
            to: "",
            from: "server",
            content: newUUID,
        };
        let json = JSON.stringify(data);
        ws.send(json);
        ws.onmessage = function (ev) {
            // console.log("receive msg!" + ev.data);
            const common = JSON.parse(ev.data);
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
        ws.onclose = function (ev) {
            console.log("Closed!" + ev.code + "||" + ev.reason);
        };
    }
    listen() {
        console.log("listening on " + this.DEFAULT_PORT);
        this.server.listen(this.DEFAULT_PORT);
    }
}
exports.Server = Server;
