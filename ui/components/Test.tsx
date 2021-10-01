import React, { useRef, useState } from "react";
import { useEffect } from "react";
import * as rtc_pc from "../utils/rtc_pc_config";
import * as ws_manager from "../utils/ws_manager";

let client: ws_manager.WsManager;

const Test: React.FC<{}> = ({}) => {
  // const userID = client.getClientID();

  const [init, setInit] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userID, setUserID] = useState("");
  const [pc, setPc] = useState<RTCPeerConnection>();

  const [chatMsg, setChatMsg] = useState("");

  let localVideoRef = useRef<HTMLVideoElement>(null);
  let remoteVideoRef = useRef<HTMLVideoElement>(null);

  async function connSocket() {
    var clientTemp = await ws_manager.WsManager.getInstance();
    return clientTemp;
  }

  useEffect(() => {
    if (init) {
      connSocket()
        .then(function (clientTemp) {
          setTimeout(function () {
            setIsLoaded(true);
            setUserID(clientTemp.getClientID());
          }, 1500);

          return (client = clientTemp);
        })
        .catch((error) => {
          console.log(error);
        });

      // connSocket()
      //   .catch((error) => {
      //     console.log(error);
      //   })
      //   .then(() => {
      //     setIsLoaded(true);
      //     setUserID(client.getClientID());
      //     console.log(userID);
      //   });

      // setInit(false);
    }
  });

  return (
    <div>
      {/* <video
        style={{
          width: 240,
          height: 240,
          margin: 5,
          backgroundColor: "black",
        }}
        muted
        ref={localVideoRef}
        autoPlay
      ></video>
      <video
        id="remotevideo"
        style={{
          width: 240,
          height: 240,
          margin: 5,
          backgroundColor: "black",
        }}
        ref={remoteVideoRef}
        autoPlay
      ></video> */}
      <div>your ID: {userID}</div>

      <div className="main__message_container">
        <input
          id="chat_message"
          type="text"
          autoComplete="off"
          placeholder="Type message here..."
          onChange={(e) => {
            // e.preventDefault();
            setChatMsg(e.target.value);
          }}
        />
        <div
          id="send"
          className="options__button"
          onClick={(e) => {
            e.preventDefault();
            if (isLoaded) {
              client.sendMsg(chatMsg, "chat", "");
            }
            // client.createNewRoom();
          }}
        >
          Send Message!
        </div>
        <div
          onClick={(e) => {
            e.preventDefault();
            if (isLoaded) {
              client.createNewRoom();
            }
          }}
        >
          Create New room!
        </div>
      </div>
    </div>
  );
};
export default Test;
