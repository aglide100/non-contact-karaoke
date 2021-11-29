import React, { useRef, useState } from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import dynamic from "next/dynamic";

const RoomList = dynamic(
  () =>
    import("../components/RoomList").catch((err) => {
      return () => <>err..{err}</>;
    }),
  {
    loading: () => <></>,
    ssr: false,
  }
);
const IndexPage: React.FC<{}> = ({}) => {
  return (
    <>
      <h1>Hello Next.js 👋</h1>
      <p>
        <Link href="/login">
          <a>로그인하기</a>
        </Link>
      </p>
      <RoomList></RoomList>
    </>
  );
};

export default IndexPage;
