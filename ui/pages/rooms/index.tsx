import React, { ReactElement, useEffect, useState, useRef } from "react";
import RoomItem, { RoomItemProps } from "../../components/RoomItem";
import io, { SocketIOClient } from "socket.io-client";

import {
  CurRoomStyle,
  TitleStyle,
  ParStyle,
  RoomFrame,
  InnerRoomFrame,
  RoomListFrame,
  CurRoomStyleFrame,
} from "../../components/roomStyle";

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

const SOCKET_SERVER_URL = "wss://wss.non-contact-karaoke.xyz";

const Rooms: React.FC = ({}) => {
  let roomList: ReactElement[];
  const [onClickRoomData, setOnClickRoomData] = useState<roomProps>();
  const [userInRoom, setUserInRoom] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [roomListData, setRoomListData] = useState([]);
  const socketRef = useRef<SocketIOClient.Socket>();

  useEffect(() => {
    if (!isLoaded) {
      socketRef.current = io.connect(SOCKET_SERVER_URL);
      socketRef.current.emit("get_rooms");
      socketRef.current.on(
        "all_rooms",
        (allRooms: Array<{ roomId: string; userId: string[] }>) => {
          allRooms.forEach(async (room) => {
            console.log(room);
          });
        }
      );
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
    alert("delete is wip");
  }

  function onHandleClick(roomId, roomTitle) {
    let data: roomProps = {
      roomId: roomId,
      roomTitle: roomTitle,
    };

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
    </div>
  );
};

export default Rooms;
