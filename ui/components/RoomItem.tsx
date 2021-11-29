import React from "react";
import { ListStyle } from "./roomStyle";
export type RoomItemProps = {
  roomTitle: string;
  roomId: string;

  onHandleClick?(roomId): void;
};

const RoomItem: React.FC<RoomItemProps> = (props: RoomItemProps) => {
  return (
    <li>
      <div style = {ListStyle}
            onClick={(e) => {
          e.preventDefault();
          props.onHandleClick(props.roomId);
        }}
      >
        {props.roomTitle}
      </div>
    </li>
  );
};


export default RoomItem;
