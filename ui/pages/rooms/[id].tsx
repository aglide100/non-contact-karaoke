import React from "react";
import { useRouter } from "next/router";
// type RoomProps ={
//     params: string
// }

const Room: React.FC = ({}) => {
  const router = useRouter();
  const { id } = router.query;
  //const { pw } = router.query;

  return (
    <>
      <div className="text-green-500">Room id : {id}</div>
       
    </>
  );
};

export default Room;
