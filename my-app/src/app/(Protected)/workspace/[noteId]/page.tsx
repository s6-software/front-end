"use client";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
export default function Home({ params }) {
  const [noteTitle, setNoteTitle] = useState("Note title");
  return (
    <div className="bg-gray-400 flex w-full h-view">
      <div className="flex bg-gray-300 w-1/2 mx-auto justify-center">
        <div className="border-b border-black w-full h-16">
          <input
            className="flex w-full text-center text-2xl mt-2 p-4 bg-transparent border border-transparent focus:outline-none focus:ring-0"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
