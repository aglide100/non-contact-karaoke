"use strict";
// import * as commonType from "../../../ui/common/socket-message";
// import * as room from "../model/socket/room";
// import * as uuid from "uuid";
// import {
//   MemberController,
//   loginResultProps,
// } from "../controller/memberController";
// export class WebSocketHandler {
//   public onClose(ws: WebSocket, ev: CloseEvent): void {}
//   public onMessage(ws: WebSocket, ev: MessageEvent): void {
//     const common: commonType.socketMessage = JSON.parse(ev.data);
//     const memberCtrl = new MemberController();
//     console.log(common);
//     if (common) {
//       if (common.type === "req-join-user") {
//         console.log("req-join-user");
//         const tempUser = JSON.parse(common.content);
//         memberCtrl.join(
//           tempUser.userId,
//           tempUser.userName,
//           tempUser.userPassword,
//           (res: any, err: Error) => {
//             let sendData: commonType.socketMessage;
//             if (err != undefined || err != null) {
//               sendData = {
//                 type: "res-join-error",
//                 to: common.from,
//                 from: "server",
//                 content: err.toString(),
//               };
//             } else {
//               sendData = {
//                 type: "res-join-user",
//                 to: common.from,
//                 from: "server",
//                 content: JSON.stringify(res),
//               };
//             }
//             ws.send(JSON.stringify(sendData));
//           }
//         );
//       }
//       if (common.type === "req-create-room") {
//         console.log("req-create-room");
//         const newUUID = uuid.v4();
//         const newRoom: room.roomProps = {
//           roomID: newUUID,
//           roomTitle: common.content,
//           userID: [],
//         };
//         newRoom.userID.push(common.from);
//         room.Room.getInstance().newRoom(newRoom);
//         let data: commonType.socketMessage = {
//           type: "res-create-room",
//           to: common.to,
//           from: "server",
//           content: newUUID,
//         };
//         ws.send(JSON.stringify(data));
//       }
//       if (common.type === "req-login-user") {
//         console.log("req-login-user");
//         let data = JSON.parse(common.content);
//         let result: loginResultProps;
//         memberCtrl.login(
//           data.userId,
//           data.userPassword,
//           (res: loginResultProps, err: Error) => {
//             // member_no: '1234', password: '1234', name: '1234'
//             let getUser: loginResultProps = res;
//             let sendData: commonType.socketMessage;
//             if (err != undefined || err != null) {
//               sendData = {
//                 type: "res-login-error",
//                 to: common.from,
//                 from: "server",
//                 content: err.toString(),
//               };
//             } else {
//               sendData = {
//                 type: "res-login-user",
//                 to: common.from,
//                 from: "server",
//                 content: JSON.stringify(getUser),
//               };
//             }
//             // console.log("Sending... data" + JSON.stringify(sendData));
//             ws.send(JSON.stringify(sendData));
//           }
//         );
//       }
//       if (common.type === "req-join-room") {
//         // if (
//         //   user.User.getInstance().getUser().roomID == null ||
//         //   user.User.getInstance().getUser().roomID == undefined
//         // ) {
//         // } else {
//         let roomId = room.Room.getInstance().joinRoom(
//           common.from,
//           common.content
//         );
//         if (room.Room.getInstance().findUser(common.from)) {
//           let data: commonType.socketMessage = {
//             type: "res-join-room",
//             to: common.from,
//             from: "server",
//             content: roomId,
//           };
//           ws.send(JSON.stringify(data));
//         } else {
//           console.log("Can't joined user in room....");
//         }
//       }
//       if (common.type === "req-get-rooms") {
//         const roomIDs = room.Room.getInstance()
//           .getRooms()
//           .map((room) => {
//             let data = {
//               roomId: room.userID,
//               roomTitle: room.roomTitle,
//             };
//             return data;
//           });
//         console.log("request room list");
//         let data: commonType.socketMessage = {
//           type: "res-get-rooms",
//           to: common.to,
//           from: "server",
//           content: JSON.stringify(roomIDs),
//         };
//         let json = JSON.stringify(data);
//         ws.send(json);
//       }
//       if (common.type === "req-chat-in-room") {
//         console.log("Chat" + common);
//         let resultRoom = room.Room.getInstance().findRoom(common.to);
//         resultRoom?.userID.map((user) => {
//           let data: commonType.socketMessage = {
//             type: "res-chat-in-room",
//             to: user,
//             from: common.from,
//             content: common.content,
//           };
//           ws.send(JSON.stringify(data));
//         });
//       }
//       if (common.type === "answer") {
//         console.log("Answer" + common);
//       }
//     }
//   }
// }
