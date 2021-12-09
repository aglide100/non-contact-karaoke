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
  users: userProps[];
};


type userProps = {
  name: string;
};

const dumpUserList: userProps[] = [
  {
    name: "홍길동1",
  },
  {
    name: "홍길동2",
  },
  {
    name: "홍길동3",
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
  // const [rooms, setRooms] = useState<roomProps[]>(null)

  useEffect(() => {
    if (!isLoaded) {
      socketRef.current = io.connect(SOCKET_SERVER_URL);
      socketRef.current.emit("get_rooms");
      socketRef.current.on(
        "all_rooms",
        (data) => {
          console.log("data:", data)
          setRoomListData(data)
        }
      );

      socketRef.current.on(
        "in_users",
        (data) => {
          console.log("in users:", data)
          

          // setOnClickRoomData(data);
        }
      )
      setIsLoaded(true);
    }
  }, []);

  if (roomListData != undefined && isLoaded) {
    roomList = roomListData.map((room, index) => {
      return (
        <RoomItem
          key={index}
          roomId={room.roomId}
          onHandleClick={(e) => {
            onHandleClick(room.roomId);
            socketRef.current.emit("get_users", {
              room: room.roomId,
            });
          }}
        ></RoomItem>
      );
    });
  }

  function onDeleteClick(roomId) {
    alert("delete is wip");
  }

  function onHandleClick(roomId) {
    socketRef.current.emit("get_users", {
      room: roomId,
    });
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
              <div style={CurRoomStyle}>{onClickRoomData.roomId}방</div>
              <ul>
                {dumpUserList.map((user) => {
                  return (
                    <li
                      key={user.name}
                      onClick={(e) => {
                        e.preventDefault();
                        alert("User Id:" + user.name);
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
