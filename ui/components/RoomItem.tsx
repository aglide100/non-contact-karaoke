import React from "react";

export type RoomItemProps = {
  roomTitle: string;
  roomId: string;

  onHandleClick?(roomId): void;
};

const ListStyle = {
  width: '200px',
  color: "white",
  background: "#505050",
  padding: "10px 10px",
  border: "1px solid black",
  borderRadius: "6px",
  fontSize: "20px",
  lineHeight: 1.5,
  margin: '10px'
};

// const RoomBor = {
//   border: "1px solid black",
// };

const RoomItem: React.FC<RoomItemProps> = (props: RoomItemProps) => {
  return (
    
    <li className="flex-direction: column">
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
