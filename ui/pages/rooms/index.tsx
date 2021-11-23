import { title } from "process";
import React, { ReactElement, useState } from "react";
import * as ws_manager from "../../utils/ws_manager";
import RoomItem, { RoomItemProps } from "../../components/RoomItem";

const tempRoomList: RoomItemProps[] = [
  {
    roomId: "1",
    roomTitle: "1번방",
  },
  {
    roomId: "5",
    roomTitle: "2번방",
  },
  {
    roomId: "6",
    roomTitle: "3번방",
  },
  {
    roomId: "7",
    roomTitle: "4번방",
  },
  {
    roomId: "8",
    roomTitle: "5번방",
  },
  {
    roomId: "9",
    roomTitle: "6번방",
  },
];

const Rooms: React.FC = ({}) => {
  let roomList: ReactElement[];
  const [userList, setUserList] = useState("");

  roomList = tempRoomList.map((room, index) => {
    return (
      <RoomItem
        key={index}
        roomId={room.roomId}
        roomTitle={room.roomTitle}
        onHandleClick={(roomId) => {
          onHandleClick(roomId);
        }}
      ></RoomItem>
    );
  });

  function onHandleClick(roomId) {
    // 서버가 없어서 임시 룸아이디를 넣음
    setUserList(roomId);
  }

  let post = "테스팅";
  return (
    <div>
      <div className="flex flex-row w-full justify-center">
        <div>
          <ul>{roomList}</ul>
        </div>
        <div>
          <div>방인원</div>
          {userList == undefined ? <>인원이 없습니다!</> : <>{userList}</>}
        </div>
      </div>
    </div>
  );
};

export default Rooms;
