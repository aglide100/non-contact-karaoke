import React from "react";
import { ListStyle } from "./roomStyle";
import { Button } from "../components/Button";

export type RoomItemProps = {
  roomTitle: string;
  roomId: string;
  onHandleClick?(roomId: string, roomTitle: string): void;
  onClickDelte?(roomId: string): void;
};

const RoomItem: React.FC<RoomItemProps> = (props: RoomItemProps) => {
  return (
    <li>
      <div
        style={ListStyle}
        className="flex flex-row justify-between"
        onClick={(e) => {
          e.preventDefault();
          props.onHandleClick(props.roomId, props.roomTitle);
        }}
      >
        <span>{props.roomTitle}</span>
        <Button
          size={"medium"}
          type={"button"}
          color={"purple"}
          onClick={(e) => {
            e.preventDefault();
            props.onClickDelte(props.roomId);
          }}
        >
          삭제
        </Button>
      </div>
    </li>
  );
};

export default RoomItem;
