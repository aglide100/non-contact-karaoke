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
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
class Server {
    constructor() {
        this.DEFAULT_PORT = 5000;
        console.log("starting create wss");
        this.app = (0, express_1.default)();
        this.server = this.app.listen(this.DEFAULT_PORT, function () {
            console.log("listening on 5000");
        });
        this.wss = new ws.Server({
            server: this.server,
        });
        const cred = {
            key: fs_1.default.readFileSync("./keys/server.key"),
            cert: fs_1.default.readFileSync("./keys/server.crt"),
        };
        this.handleSocketConnection();
    }
    handleSocketConnection() {
        this.wss.on("connection", function (ws, req) {
            console.log("!!!!!");
        });
    }
}
exports.Server = Server;
