import React, { ReactElement, useEffect, useState } from "react";
import * as ws_manager from "../../utils/ws_manager";
import RoomItem, { RoomItemProps } from "../../components/RoomItem";
import { CurRoomStyle, TitleStyle } from "./roomStyle";

let client: ws_manager.WsManager;

const Rooms: React.FC = ({}) => {
  let roomList: ReactElement[];
  const [userList, setUserList] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [roomListData, setRoomListData] = useState([]);

  async function getWsManager() {
    var clientTemp = await ws_manager.WsManager.getInstance();
    return clientTemp;
  }

  useEffect(() => {
    if (!isLoaded) {
      getWsManager().then(function (clientTemp) {
        let list;
        clientTemp.getRooms().then((roomIds) => {
          list = roomIds;
        });
        console.log("list : ", list);

        setRoomListData(list);

        return (client = clientTemp);
      });
    }
  });

  if (roomListData != undefined) {
    roomList = roomListData.map((room, index) => {
      if (!room) {
        return (
          <RoomItem
            key={index}
            roomId={room.roomId}
            roomTitle={index.toString()}
            onHandleClick={(roomId) => {
              onHandleClick(roomId);
            }}
          ></RoomItem>
        );
      }
    });
  }

  function onHandleClick(roomId) {
    // 서버가 없어서 임시 룸아이디를 넣음
    setUserList(roomId);
  }

  return (
    <div>
      <h1 style={TitleStyle}>title</h1>

      <div className="flex-direction: column">
        <div>
          <ul>{roomList}</ul>
        </div>
        <div>
          <div style={CurRoomStyle}>방의 현재 상황</div>
          <div>참여자</div>
          {userList == undefined ? <>인원이 없습니다!</> : <>{userList}</>}
        </div>
      </div>
    </div>
  );
};

export default Rooms;
