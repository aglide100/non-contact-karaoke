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
const http = __importStar(require("http"));
const express_1 = __importDefault(require("express"));
const uuid = __importStar(require("uuid"));
const room = __importStar(require("./model/socket/room"));
const webSocketHandler_1 = require("./handler/webSocketHandler");
var session = require("express-session");
class Server {
    constructor() {
        this.DEFAULT_PORT = 5000;
        console.log("starting create socket");
        this.app = (0, express_1.default)();
        this.users = new Array();
        console.log("user: ", this.users);
        this.server = http.createServer(this.app);
        this.socket = new ws.Server({
            server: this.server,
        });
        this.websocketHandler = new webSocketHandler_1.WebSocketHandler();
        this.handleSocketConnection();
    }
    handleSocketConnection() {
        this.socket.on("connection", (ws, req) => {
            this.onConnection(ws, req);
        });
    }
    onConnection(ws, req) {
        // console.log(ws);
        // console.log(req);
        // req 쿠키나 세션 체크
        const newUUID = uuid.v4();
        let data = {
            type: "conn",
            to: "",
            from: "server",
            // 임시로 uuid발급!
            content: newUUID,
        };
        let json = JSON.stringify(data);
        const newUser = { userId: newUUID, socket: ws };
        console.log("current users", this.users.length);
        console.log("current rooms", room.Room.getInstance().getRooms().length);
        this.users.push(newUser);
        ws.send(json);
        ws.onmessage = (ev) => {
            this.websocketHandler.onMessage(ws, ev);
        };
        ws.onclose = (ev) => {
            this.onClose(ws, ev);
        };
    }
    onClose(ws, ev) {
        console.log("Closed!" + ev.code + "||" + ev.reason);
        this.users = this.users.filter((user) => {
            // user.socket != ws
            if (user.socket == ws) {
                console.log(user.userId + " is left");
                room.Room.getInstance().leftUser(user.userId);
            }
            else {
                return user;
            }
        });
    }
    listen() {
        console.log("listening on " + this.DEFAULT_PORT);
        this.server.listen(this.DEFAULT_PORT);
    }
}
exports.Server = Server;
