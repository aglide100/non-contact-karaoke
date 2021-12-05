import React, { ReactElement, useEffect, useState } from "react";
import * as ws_manager from "../../utils/ws_manager";
import RoomItem, { RoomItemProps } from "../../components/RoomItem";

import {
  CurRoomStyle,
  TitleStyle,
  ParStyle,
  RoomFrame,
  InnerRoomFrame,
  RoomListFrame,
  CurRoomStyleFrame,
  MessageFrame,
  ProfileFrame,
  ChattingFrame,
  UserFrame,
  InnerUserFrame,
  UserScreen,
  UserName,
  LyricsFrame
} from "../../components/roomStyle";

let client: ws_manager.WsManager;

type roomProps = {
  roomId: string;
  roomTitle: string;
};

type userProps = {
  name: string;
  userId: string;
};

const dumpUserList: userProps[] = [
  {
    name: "홍길동1",
    userId: "1",
  },
  {
    name: "홍길동2",
    userId: "2",
  },
  {
    name: "홍길동3",
    userId: "3",
  },
];

const Rooms: React.FC = ({}) => {
  let roomList: ReactElement[];
  const [onClickRoomData, setOnClickRoomData] = useState<roomProps>();
  const [userInRoom, setUserInRoom] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [roomListData, setRoomListData] = useState([]);

  async function getWsManager() {
    return await ws_manager.WsManager.getInstance();
  }

  useEffect(() => {
    if (!isLoaded) {
      getWsManager()
        .then(function (clientTemp) {
          return (client = clientTemp);
        })
        .finally(() => {
          if (client != undefined) {
            let list;
            client.on("res-get-rooms", () => {
              list = client.getRoomIdList();
              console.log("list!" + list);
              setRoomListData(list);

              setIsLoaded(true);
            });

            client.getRooms();
          }
        });
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
          onHandleClick={(e) => {
            onHandleClick(room.roomId, room.roomTitle);
          }}
          onClickDelte={(e) => {
            onDeleteClick(room.roomId);
          }}
        ></RoomItem>
      );
    });
  }

  function onDeleteClick(roomId) {
    alert("delte wip");
    getWsManager().then((client) => {
      // call delete room event
    });
  }

  function onHandleClick(roomId, roomTitle) {
    let data: roomProps = {
      roomId: roomId,
      roomTitle: roomTitle,
    };

    getWsManager().then((client) => {
      // call get user list in room
    });
    setOnClickRoomData(data);
  }

  return (
    <div style={RoomFrame} className="w-full flex flex-row justify center">
      <div style={RoomListFrame}>
        <ul>{roomList}</ul>
      </div>
      {onClickRoomData == undefined ? (
        <></>
      ) : (
        <>
          <div style={InnerRoomFrame}>
            <div style={CurRoomStyleFrame}>
              <div style={CurRoomStyle}>{onClickRoomData.roomTitle}방</div>
              <ul>
                {dumpUserList.map((user) => {
                  return (
                    <li
                      key={user.userId}
                      onClick={(e) => {
                        e.preventDefault();
                        alert("User Id:" + user.userId);
                      }}
                    >
                      <div style={ParStyle}>{user.name}</div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </>
      )}


      <div style= {ChattingFrame} className="flex flex-row justify center">
        
        <div style= {ProfileFrame}>
           프로필
        </div>

        <div style= {MessageFrame}>
          채팅 메시지
        </div>

        </div>
     
     <div style={UserFrame}>

       <div className = "flex direction: column" style={InnerUserFrame}>
     <div style={UserScreen}> 
     사용자 영상화면

     <div style= {UserName}>
       사용자 이름
     </div>
     </div>

     <div style={UserScreen}> 
     사용자 영상화면
     <div style= {UserName}>
       사용자 이름
     </div>
     </div>
     </div>

     <div style={LyricsFrame}>
    가사 송출화면
     </div>

     </div>
    </div>
  );
};

export default Rooms;
