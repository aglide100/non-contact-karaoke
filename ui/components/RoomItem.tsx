import React from "react";
import { ListStyle } from "./roomStyle";
import { Button } from "../components/Button";
import { useRouter } from "next/router";
import { setCookie } from "../utils/cookie";

export type RoomItemProps = {
  roomId: string;
  onHandleClick?(roomId: string): void;
};

const RoomItem: React.FC<RoomItemProps> = (props: RoomItemProps) => {
  const router = useRouter()

  return (
    <li>
      <div
        style={ListStyle}
        className="flex flex-row justify-between"
        onClick={(e) => {
          e.preventDefault();
          props.onHandleClick(props.roomId);
        }}
      >
        <span>{props.roomId}</span>
        <Button
          size={"medium"}
          type={"button"}
          color={"purple"}
          onClick={(e) => {
            e.preventDefault();
            setCookie("room_id", props.roomId)
            router.push("/room")
          }}
        >
          참가
        </Button>
      </div>
    </li>
  );
};

export default RoomItem;
