import React from "react";
// import MusicPlayer from "../components/MusicPlayer";
import dynamic from "next/dynamic";

const MusicPlayer = dynamic(
  () =>
    import("../components/MusicPlayer").catch((err) => {
      return () => <div>{err}</div>;
    }),
  { loading: () => <div>로딩중....</div>, ssr: false }
);

const Test: React.FC = ({}) => {
  return (
    <>
      <MusicPlayer src="" isPublic={true} lrc={"not yet"}></MusicPlayer>
    </>
  );
};

export default Test;
