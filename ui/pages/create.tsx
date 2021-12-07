import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

const CreatePage: React.FC<{}> = ({}) => {
  const [roomTitle, setRoomTitle] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const router = useRouter();

  // useEffect(() => {
  //   if (!isLoaded) {
  //     setIsLoaded(true);
  //       // .then(function (clientTemp) {
  //       //   return (client = clientTemp);
  //       // })
  //       // .catch((error) => {
  //       //   console.log(error);
  //       // });
  //   }
  // });

  return (
    <>
      <div className="main__message_container">
        <input
          value={roomTitle}
          onChange={(e) => {
            setRoomTitle(e.target.value);
          }}
          placeholder="방 제목을 입력해주세요!"
        />
        <div
          onClick={(e) => {
            e.preventDefault();

            router.push({ pathname: "/rooms", query: roomTitle });
          }}
        >
          Create New room!
        </div>
      </div>
    </>
  );
};

export default CreatePage;
