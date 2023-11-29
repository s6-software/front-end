"use client";
import Image from "next/image";
import { decode } from "next-auth/jwt";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  // const { data: session, status } = useSession();
  // console.log(status);
  // if (status === "unauthenticated") {
  //   redirect("/login");
  // }

  // if (session) {
  //   return <main className="">{session?.user?.name}</main>;
  // } else {
  //   return (
  //     <main className="">
  //       <h1>Not logged in</h1>
  //       <Link href={"/login"}>login</Link>
  //     </main>
  //   );
  // }

  return (
    <div>
      <h1>Welcome user</h1>
    </div>
  );
}
