import React from "react";

export type RoomItemProps = {
  roomTitle: string;
  roomId: string;
  //   ? 들어가도 되고 안되고
  onHandleClick?(roomId): void;
};

const RoomItem: React.FC<RoomItemProps> = (props: RoomItemProps) => {
  return (
    <li className="flex flex-row justify-center">
      <div
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
