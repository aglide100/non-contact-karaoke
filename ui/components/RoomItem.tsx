import React from "react";

export type RoomItemProps = {
  roomTitle: string;
  roomId: string;
};

const RoomItem: React.FC<RoomItemProps> = (props: RoomItemProps) => {
  return (
    <li className="flex flex-row justify-center">
      <div
        onClick={(e) => {
          e.preventDefault();
          alert("Room ID:" + props.roomId);
        }}
      >
        {props.roomTitle}
      </div>
    </li>
  );
};

export default RoomItem;
