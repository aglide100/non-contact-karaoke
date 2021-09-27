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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketHandler = void 0;
const room = __importStar(require("../model/socket/room"));
const uuid = __importStar(require("uuid"));
class WebSocketHandler {
    onClose(ws, ev) { }
    onMessage(ws, ev) {
        const common = JSON.parse(ev.data);
        console.log(common);
        if (common) {
            if (common.type === "req-create-room") {
                console.log("someone call create room");
                const newUUID = uuid.v4();
                const newRoom = { roomID: newUUID, userID: [] };
                newRoom.userID.push(common.from);
                room.Room.getInstance().newRoom(newRoom);
                let data = {
                    type: "res-create-room",
                    to: common.to,
                    from: "server",
                    content: newUUID,
                };
                ws.send(JSON.stringify(data));
            }
            if (common.type === "req-join-room") {
                room.Room.getInstance().joinRoom(common.from, common.content);
            }
            if (common.type === "req-get-rooms") {
                const roomIDs = room.Room.getInstance()
                    .getRooms()
                    .map((room) => {
                    return room.roomID;
                });
                console.log("request room list");
                let data = {
                    type: "res-get-rooms",
                    to: common.to,
                    from: "server",
                    content: JSON.stringify(roomIDs),
                };
                let json = JSON.stringify(data);
                ws.send(json);
            }
            if (common.type === "chat") {
                console.log("Chat" + common);
            }
            if (common.type === "answer") {
                console.log("Answer" + common);
            }
        }
    }
}
exports.WebSocketHandler = WebSocketHandler;
