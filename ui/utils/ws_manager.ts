import * as ws_config from "./ws_config";
import * as commonType from "../../common/socket-message";

/*
  websocket readyState field

  0 - connection not yet established
  1 - conncetion established
  2 - in closing handshake
  3 - connection closed or could not open

*/

export class WsManager {
  private client: WebSocket;
  private static userID: string;

  constructor() {
    this.client = new WebSocket(ws_config.config.url);

    this.client.onopen = this.onOpen;
    this.client.onclose = this.onClose;
    this.client.onerror = this.onError;
    this.client.onmessage = this.onMessage;
  }

  private onMessage(ev: MessageEvent) {
    let userIDTemp;
    console.log("receive msg!" + ev.data);
    const common: commonType.socketMessage = JSON.parse(ev.data);
    if (common) {
      // just for test !!!!
      if (common.type === "conn") {
        userIDTemp = common.content;
      }

      if (common.type === "chat") {
      }
    }

    if (userIDTemp != null || userIDTemp != undefined) {
      // this.setUerID(userIDTemp);
      WsManager.userID = userIDTemp;
      // setUserID(userIDTemp);
      console.log(WsManager.userID);
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

  public setUserID(value) {
    WsManager.userID = value;
  }

  public getClientID() {
    if (this.client.readyState === 1) {
      return WsManager.userID;
    }
    return null;
  }

  public createNewRoom() {
    if (this.client.readyState === 1) {
      this.sendMsg("", "create-room", "server");
    } else {
      // return
    }
  }

  public sendMsg(
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
      alert("can't find socket!");
    }
  }
}
