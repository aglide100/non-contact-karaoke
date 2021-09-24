import React from "react";
import { useRouter } from "next/router";
// type RoomProps ={
//     params: string
// }

const Room: React.FC = ({}) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <div className="text-green-500">room id : {id}</div>
    </>
  );
};

export default Room;
