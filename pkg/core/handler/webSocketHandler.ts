import * as commonType from "../../../ui/common/socket-message";
import * as room from "../model/socket/room";
import * as uuid from "uuid";
import {
  MemberController,
  loginResultProps,
} from "../controller/memberController";
// import * as user from "../model/socket/user";

export class WebSocketHandler {
  public onClose(ws: WebSocket, ev: CloseEvent): void {}

  public onMessage(ws: WebSocket, ev: MessageEvent): void {
    const common: commonType.socketMessage = JSON.parse(ev.data);
    const memberCtrl = new MemberController();

    console.log(common);
    if (common) {
      if (common.type === "req-create-room") {
        console.log("someone call create room");
        const newUUID = uuid.v4();
        const newRoom: room.roomProps = {
          roomID: newUUID,
          roomTitle: common.content,
          userID: [],
        };
        newRoom.userID.push(common.from);
        room.Room.getInstance().newRoom(newRoom);

        let data: commonType.socketMessage = {
          type: "res-create-room",
          to: common.to,
          from: "server",
          content: newUUID,
        };

        ws.send(JSON.stringify(data));
      }

      if (common.type === "req-login-user") {
        let data = JSON.parse(common.content);
        let result: loginResultProps;

        memberCtrl
          .login(data.userId, data.userPassword, (res: loginResultProps) => {
            console.log("res???", res);
            result = res;
          })
          .finally(() => {
            console.log("login result!" + result);

            let sendData: commonType.socketMessage;
            if (result.error != undefined) {
              sendData = {
                type: "res-login-error",
                to: common.from,
                from: "server",
                content: result.toString(),
              };
            } else {
              sendData = {
                type: "res-login-user",
                to: common.from,
                from: "server",
                content: result.toString(),
              };
            }

            console.log("Sending... data" + JSON.stringify(data));
            ws.send(JSON.stringify(data));
          });
      }

      if (common.type === "req-join-room") {
        // if (
        //   user.User.getInstance().getUser().roomID == null ||
        //   user.User.getInstance().getUser().roomID == undefined
        // ) {

        // } else {

        let roomId = room.Room.getInstance().joinRoom(
          common.from,
          common.content
        );
        if (room.Room.getInstance().findUser(common.from)) {
          let data: commonType.socketMessage = {
            type: "res-join-room",
            to: common.from,
            from: "server",
            content: roomId,
          };

          ws.send(JSON.stringify(data));
        } else {
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
        let data: commonType.socketMessage = {
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

        resultRoom?.userID.map((user) => {
          let data: commonType.socketMessage = {
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
