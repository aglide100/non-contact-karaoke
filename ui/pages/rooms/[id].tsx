import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as ws_manager from "../../utils/ws_manager";
// type RoomProps ={
//     params: string
// }

let client: ws_manager.WsManager;

const Room: React.FC = ({}) => {
  const router = useRouter();
  const { id } = router.query;

  const [chatMsg, setChatMsg] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  async function getWsManager() {
    var clientTemp = await ws_manager.WsManager.getInstance();
    return clientTemp;
  }

  useEffect(() => {
    if (!isLoaded && router.isReady) {
      let roomID = JSON.stringify(router.query.id);

      console.log("roomID: " + roomID);

      getWsManager().then(function (clientTemp) {
        setIsLoaded(true);
        clientTemp.joinRoom(roomID);

        return (client = clientTemp);
      });
    }
  }, [router.isReady]);

  return (
    <>
      <div className="text-green-500">room id : {id}</div>
      <video id="camera" autoPlay={true} playsInline={true}></video>
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
          client.sendChatMsg(chatMsg, id);
        }}
      >
        Send Message!
      </div>
    </>
  );
};

export default Room;
