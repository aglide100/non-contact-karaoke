import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as ws_manager from "../../utils/ws_manager";
import * as rtc_manager from "../../utils/rtc_manager";
import ViedoPlayer from "../../components/VideoPlayer";

let wsclient: ws_manager.WsManager;
let rtcclient: rtc_manager.RtcManager;

const Room: React.FC = ({}) => {
  const router = useRouter();
  const { id } = router.query;

  const [chatMsg, setChatMsg] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  async function getWsManager() {
    var clientTemp = await ws_manager.WsManager.getInstance();
    return clientTemp;
  }

  async function getRtcManager() {
    var clientTemp = await rtc_manager.RtcManager.getInstance();
    return clientTemp;
  }

  useEffect(() => {
    if (!isLoaded && router.isReady) {
      let roomID = JSON.stringify(router.query.id);

      console.log("roomID: " + roomID);

      getWsManager().then(function (clientTemp) {
        setIsLoaded(true);
        clientTemp.joinRoom(roomID);

        return (wsclient = clientTemp);
      });

      getRtcManager().then(function (clientTemp) {
        return (rtcclient = clientTemp);
      });
    }
  }, [router.isReady]);

  return (
    <>
      <div className="text-green-500">room id : {id}</div>
      <video
        style={{ width: 240, height: 240 }}
        muted
        autoPlay
        ref={rtcclient.getLocalVideoRef()}
      ></video>
      {rtcclient.getUsers() != undefined ? (
        rtcclient.getUsers().map((user, index) => {
          <ViedoPlayer
            key={index}
            stream={user.stream}
            name={user.name}
          ></ViedoPlayer>;
        })
      ) : (
        <>No users in room</>
      )}

      <canvas id="photo"></canvas>

      <input
        id="chat_message"
        type="text"
        autoComplete="off"
        placeholder="Type message here..."
        onChange={(e) => {
          setChatMsg(e.target.value);
        }}
      />
      <div
        id="send"
        className="options__button"
        onClick={(e) => {
          e.preventDefault();
          wsclient.sendChatMsg(chatMsg, id);
        }}
      >
        Send Message!
      </div>
    </>
  );
};

export default Room;
