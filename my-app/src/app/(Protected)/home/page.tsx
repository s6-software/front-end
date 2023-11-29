"use client";
import Image from "next/image";
import { decode } from "next-auth/jwt";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
export default function Home() {
  const [noteTitle, setNoteTitle] = useState("Note title");
  return (
    <div className="flex bg-gray-50 w-1/2 ml-auto mr-auto justify-center">
      <div className="bg-transparent">
        <input
          className="text-center text-2xl mt-2 p-4 bg-transparent border border-transparent focus:outline-none focus:ring-0"
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
        />
      </div>
    </div>
  );
}
