import { title } from "process";
import React, { ReactElement } from "react";
import * as ws_manager from "../../utils/ws_manager";
import RoomItem, { RoomItemProps } from "../../components/RoomItem";

const tempRoomList: RoomItemProps[] = [
  { roomId: "1", roomTitle: "1번방" },
  { roomId: "5", roomTitle: "2번방" },
  { roomId: "6", roomTitle: "3번방" },
  { roomId: "7", roomTitle: "4번방" },
  { roomId: "8", roomTitle: "5번방" },
  { roomId: "9", roomTitle: "6번방" },
];

const Rooms: React.FC = ({}) => {
  let roomList: ReactElement[];

  roomList = tempRoomList.map((room, index) => {
    return (
      <RoomItem
        key={index}
        roomId={room.roomId}
        roomTitle={room.roomTitle}
      ></RoomItem>
    );
  });

  let post = "테스팅";
  return (
    <div>
      연습용 만들기
      <h3>{post}</h3>
      {roomList}
    </div>
  );
};

export default Rooms;
