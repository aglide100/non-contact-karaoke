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
// import * as user from "../model/socket/user";
class WebSocketHandler {
    onClose(ws, ev) { }
    onMessage(ws, ev) {
        const common = JSON.parse(ev.data);
        console.log(common);
        if (common) {
            if (common.type === "req-create-room") {
                console.log("someone call create room");
                const newUUID = uuid.v4();
                const newRoom = {
                    roomID: newUUID,
                    roomTitle: common.content,
                    userID: [],
                };
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
                // if (
                //   user.User.getInstance().getUser().roomID == null ||
                //   user.User.getInstance().getUser().roomID == undefined
                // ) {
                // } else {
                let roomId = room.Room.getInstance().joinRoom(common.from, common.content);
                if (room.Room.getInstance().findUser(common.from)) {
                    let data = {
                        type: "res-join-room",
                        to: common.from,
                        from: "server",
                        content: roomId,
                    };
                    ws.send(JSON.stringify(data));
                }
                else {
                    console.log("Can't joined user in room....");
                }
            }
            if (common.type === "req-get-rooms") {
                const roomIDs = room.Room.getInstance()
                    .getRooms()
                    .map((room) => {
                    let data = {
                        roomId: room.userID,
                        roomTitle: room.roomTitle,
                    };
                    return data;
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
            if (common.type === "req-chat-in-room") {
                console.log("Chat" + common);
                let resultRoom = room.Room.getInstance().findRoom(common.to);
                resultRoom === null || resultRoom === void 0 ? void 0 : resultRoom.userID.map((user) => {
                    let data = {
                        type: "res-chat-in-room",
                        to: user,
                        from: common.from,
                        content: common.content,
                    };
                    ws.send(JSON.stringify(data));
                });
            }
            if (common.type === "answer") {
                console.log("Answer" + common);
            }
        }
    }
}
exports.WebSocketHandler = WebSocketHandler;
