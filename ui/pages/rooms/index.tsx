import React, { ReactElement, useEffect, useState } from "react";
import * as ws_manager from "../../utils/ws_manager";
import RoomItem, { RoomItemProps } from "../../components/RoomItem";
import { CurRoomStyle, TitleStyle, ParStyle, OverCurRoon } from "../../components/roomStyle";

let client: ws_manager.WsManager;

const Rooms: React.FC = ({}) => {
  let roomList: ReactElement[];
  const [userList, setUserList] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [roomListData, setRoomListData] = useState([]);

  async function getWsManager() {
    return await ws_manager.WsManager.getInstance();
  }

  useEffect(() => {
    if (!isLoaded) {
      getWsManager().then(function (clientTemp) {
        

        return (client = clientTemp);
        

      }).finally(() => {
        if (client != undefined) {
          let list;
          client.on("res-get-rooms", () => {
            list = client.getRoomIdList();
            console.log("list!" + list);
            setRoomListData(list);
  
            setIsLoaded(true);
          });
  
          // client.emit("res-get-rooms");
          client.getRooms();
  
          // console.log("list : ", list);
        }
 
      })
    }
    return () => setIsLoaded(true);
  }, []);

  if (roomListData != undefined && isLoaded) {
    roomList = roomListData.map((room, index) => {
      return (
        <RoomItem
          key={index}
          roomId={room.roomId}
          roomTitle={room.roomTitle}
          onHandleClick={(room) => {
            onHandleClick(room);
          }}
        ></RoomItem>
      );
    });
  }

  function onHandleClick(roomId) {
    // 서버가 없어서 임시 룸아이디를 넣음
    setUserList(roomId);
  }

  return (
    <div style ={OverCurRoon}>
      {/* { <h1 style={TitleStyle}>title</h1> } */}

      <div className="flex-direction: column">
        <div>
          <ul>{roomList}</ul>
        </div>
        <div>
          <div style={CurRoomStyle}>@번 방의 현재 상황</div>
          <div style = {ParStyle}>참여자 - @명 이용중</div>
          {userList == undefined ? <>인원이 없습니다!</> : <>{userList}</>}
        </div>
      </div>
    </div>
  );
};

export default Rooms;
