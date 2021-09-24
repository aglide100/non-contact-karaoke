import React, { useRef, useState } from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import dynamic from "next/dynamic";
import "tailwindcss/tailwind.css";

const TestSection = dynamic(
  () =>
    import("../components/Test").catch((err) => {
      return () => <>err..{err}</>;
    }),
  {
    loading: () => <></>,
    ssr: false,
  }
);
const IndexPage: React.FC<{}> = ({}) => {
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>Hello Next.js 👋</h1>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
      <TestSection></TestSection>
    </Layout>
  );
};

export default IndexPage;
