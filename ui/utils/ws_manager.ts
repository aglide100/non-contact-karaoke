import * as ws_config from "./ws_config";
import * as commonType from "../common/model/socket-message";
import router, { NextRouter, Router } from "next/router";

/*
  websocket readyState field

  0 - connection not yet established
  1 - conncetion established
  2 - in closing handshake
  3 - connection closed or could not open
*/
type room = {
  roomID: string;
  userID: string[];
};

export type cancelFunc = () => void;

export class WsManager {
  private static instance: WsManager;
  private client: WebSocket;
  private static userID: string;
  private static roomID: string;
  private static roomIdList: string[];
  private isInit: boolean;
  private router: NextRouter;

  constructor() {
    console.log("trying connect to " + ws_config.config.url + "....");
    this.client = new WebSocket(ws_config.config.url);

    this.client.onopen = this.onOpen;
    this.client.onclose = this.onClose;
    this.client.onerror = this.onError;
    this.client.onmessage = this.onMessage;
    this.isInit = false;
  }

  public static getInstance(): WsManager {
    if (!WsManager.instance) {
      console.log("creating WsManger instance!");
      WsManager.instance = new WsManager();
    }

    return WsManager.instance;
  }

  private call(fn: () => cancelFunc): cancelFunc {
    return WsManager.getInstance().call(fn);
  }

  public static Auth(fn: () => cancelFunc): cancelFunc {
    return this.getInstance().call((): cancelFunc => {
      console.log("client created, yielding to call");
      return fn();
    });
  }

  private onMessage(ev: MessageEvent) {
    let userIDtemp;
    // let roomIDtemp
    // console.log("receive msg!" + ev.data);
    const common: commonType.socketMessage = JSON.parse(ev.data);
    if (common) {
      // just for test !!!!
      if (common.type === "conn") {
        userIDtemp = common.content;
      }

      if (common.type === "res-chat-in-room") {
        alert("get chat" + common);
      }

      if (common.type === "res-get-rooms") {
        WsManager.roomIdList = JSON.parse(common.content);

        console.log("res-get-rooms" + common.content);
      }

      if (common.type === "res-join-room") {
        console.log("get res-join-room ", common);
        WsManager.roomID = common.content;
        router.push("/rooms/" + common.content);
      }

      if (common.type === "res-create-room") {
        alert("successfully create room!" + common.content);

        WsManager.getInstance().joinRoom(common.content);
        // WsManager.roomID = common.content;
      }
    }

    if (userIDtemp != null || userIDtemp != undefined) {
      WsManager.userID = userIDtemp;
    }
  }

  private onError(ev: Event) {
    console.log("Connection has error! " + ev.toString());
  }

  private onClose(ev: CloseEvent) {
    console.log("Connection closed!" + ev.reason);
  }

  private onOpen(ev: Event) {
    console.log("Connection opened", ev);
  }

  public async getRooms() {
    await this.sendMsg("", "req-get-rooms", "server");

    return WsManager.roomIdList;
  }

  public setUserID(value) {
    WsManager.userID = value;
  }

  public sendChatMsg(value, roomId) {
    if (this.client.readyState === 1) {
      this.sendMsg(value, "req-chat-in-room", roomId);
    } else {
      console.log(this.client.readyState);
    }
  }

  public getClientID() {
    if (this.client.readyState === 1) {
      return WsManager.userID;
    } else {
      console.log(this.client.readyState);
    }

    console.log(this.client.readyState);
    return null;
  }

  public createNewRoom() {
    if (this.client.readyState === 1) {
      this.sendMsg("", "req-create-room", "server");
    } else {
      console.log(this.client.readyState);
    }
  }

  public joinRoom(roomID: string) {
    if (this.client.readyState === 1) {
      this.sendMsg(roomID, "req-join-room", "server");
    } else {
      console.log(this.client.readyState);
    }
  }

  public async sendMsg(
    text: string,
    type: commonType.socketMsgType,
    to: string
    // from: string
  ) {
    if (this.client.readyState === 1) {
      let data: commonType.socketMessage = {
        type: type,
        to: to,
        from: WsManager.userID,
        content: text,
      };
      let json = JSON.stringify(data);
      this.client.send(json);
      console.log("Send MSG " + json);
    } else {
      console.log(this.client.readyState);
    }
  }
}
