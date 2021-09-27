import * as ws_config from "./ws_config";
import * as commonType from "../../common/model/socket-message";

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

  constructor() {
    console.log("trying connect to " + ws_config.config.url + "....");
    this.client = new WebSocket(ws_config.config.url);

    this.client.onopen = this.onOpen;
    this.client.onclose = this.onClose;
    this.client.onerror = this.onError;
    this.client.onmessage = this.onMessage;
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

      if (common.type === "res-get-rooms") {
        const rooms: room = JSON.parse(common.content);
        console.log("current rooms :" + rooms.roomID.length);
      }

      if (common.type === "res-create-room") {
        alert("successfully create room!" + common.content);
      }
    }

    if (userIDTemp != null || userIDTemp != undefined) {
      WsManager.userID = userIDTemp;
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

  public getRooms(): string[] {
    var list: string[];
    // later adding get roomlist!
    this.sendMsg("", "req-get-rooms", "server");
    return list;
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
      this.sendMsg("", "req-create-room", "server");
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
