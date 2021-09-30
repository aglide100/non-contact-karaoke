import * as commonType from "../../../ui/common/model/socket-message";
import * as room from "../model/socket/room";
import * as uuid from "uuid";
import * as user from "../model/socket/user";

export class WebSocketHandler {
  public onClose(ws: WebSocket, ev: CloseEvent): void {}

  public onMessage(ws: WebSocket, ev: MessageEvent): void {
    const common: commonType.socketMessage = JSON.parse(ev.data);

    console.log(common);
    if (common) {
      if (common.type === "req-create-room") {
        console.log("someone call create room");
        const newUUID = uuid.v4();
        const newRoom: room.roomProps = { roomID: newUUID, userID: [] };
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

      if (common.type === "req-join-room") {
        // if (
        //   user.User.getInstance().getUser().roomID == null ||
        //   user.User.getInstance().getUser().roomID == undefined
        // ) {

        // } else {

        room.Room.getInstance().joinRoom(common.from, common.content);
        // user.User.getInstance().setUserInRoomID()
        // }
      }

      if (common.type === "req-get-rooms") {
        const roomIDs = room.Room.getInstance()
          .getRooms()
          .map((room) => {
            return room.roomID;
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

      if (common.type === "chat") {
        console.log("Chat" + common);
      }

      if (common.type === "answer") {
        console.log("Answer" + common);
      }
    }
  }
}
