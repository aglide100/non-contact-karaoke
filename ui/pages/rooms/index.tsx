import React from "react";
import * as ws_manager from "../../utils/ws_manager";

const Rooms: React.FC = ({}) => {
  // ws_manager.WsManager.getInstance();
  return (
    <div>
      <video id="camera" autoPlay={true} playsInline={true}></video>
      <canvas id="photo"></canvas>
    </div>
  );
};

export default Rooms;
