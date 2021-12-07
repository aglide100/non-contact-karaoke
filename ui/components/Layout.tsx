import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { getCookie, removeCookie } from "../utils/cookie";
import { Router, useRouter } from "next/router";
type Props = {
  children?: ReactNode;
  title?: string;
};

export default function Layout({
  children,
  title = "This is the default title",
}: Props) {
  let header: ReactElement;
  const router = useRouter();

  const [loginMenu, setLoginMenu] = useState<ReactElement>();

  useEffect(() => {
    const userId = getCookie("user_id");
    const userName = getCookie("user_name");
    const userToken = getCookie("accessToken");
    console.log("token" + userId);
    if (
      userId == undefined ||
      userId == null ||
      !userId ||
      userId.length == 0
    ) {
      setLoginMenu(
        <>
          <Link href="/signIn">
            <a>Sign In</a>
          </Link>{" "}
          |{" "}
          <Link href="/signUp">
            <a>Sign Up</a>
          </Link>
        </>
      );
    } else {
      setLoginMenu(
        <>
          {userName} |{" "}
          <span
            onClick={() => {
              removeCookie("user_name");
              removeCookie("user_id");
              removeCookie("accessToken");

              document.location.href = "/";
            }}
          >
            로그아웃
          </span>{" "}
          |{" "}
          <Link href="/rooms">
            <a>rooms</a>
          </Link>{" "}
          |{" "}
          <Link href="/create">
            <a>방생성</a>
          </Link>{" "}
        </>
      );
    }
  }, []);

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <nav>
          <Link href="/">
            <a>Home</a>
          </Link>{" "}
          | {loginMenu}
        </nav>
      </header>
      {children}
    </div>
  );
}
