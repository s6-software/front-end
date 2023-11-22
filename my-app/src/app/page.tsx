"use client";
import Image from "next/image";
import { decode } from "next-auth/jwt";

import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();

  if (session) {
    return <main className="">{session.user}</main>;
  } else {
    return (
      <main className="">
        <h1>Not logged in</h1>
      </main>
    );
  }
}
