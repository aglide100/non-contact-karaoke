import { title } from "process";
import React, {ReactElement, useState} from "react";
import * as ws_manager from "../../utils/ws_manager";
// import "./App.css";
import RoomItem, { RoomItemProps } from "../../components/RoomItem";

const TitleStyle = {
  color: "black",
  background: "white",
  padding: "10px 10px",
  borderbottom: "1px solid teal",
  borderRadius: "6px",
  fontSize: "35px",
  lineHeight: 1.5,
};

const CurRoomStyle = {
  color : 'white',
  width : "220px",
  background: "#32AAFF",
  padding: "10px 10px",
  border: "1px solid black",
  borderRadius: "6px",
  fontSize: "18px",
  
};

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

  function onHandleClick(roomId) {  // 서버가 없어서 임시 룸아이디를 넣음
    setUserList(roomId);
  }

  let post = "Title";
  return (
    <div>
      <h1 style = {TitleStyle}>{post}</h1>
     
      <div className="flex-direction: column">
        <div>
          <ul>{roomList}</ul>
        </div>
        <div>
          <div style = {CurRoomStyle}>방의 현재 상황</div>
          <div>참여자</div>
          {userList == undefined ? <>인원이 없습니다!</> : <>{userList}</>}
        </div>
      </div>
    </div>
  );
  
};



export default Rooms;
