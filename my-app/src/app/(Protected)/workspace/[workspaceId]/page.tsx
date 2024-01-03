"use client";
import { useEffect, useState } from "react";
import NewEditor from "./Editor";
import { signOut, useSession } from "next-auth/react";
import { io } from "socket.io-client";
import { useFolders } from "../../../Components/Sidebar/sidebarHook";
type WorkspacePage = {
  params: {
    workspaceId: string;
  };
};

export default function Home({ params }: WorkspacePage) {
  const { data: session, status } = useSession();

  const workspaceId = params.workspaceId;
  const [folders, setFolders] = useFolders();

  useEffect(() => {
    const socket = io("http://localhost:3456", {
      auth: {
        token: session?.user?.email,
      },
    });
    console.log("socket connected");
    socket.emit("join-workspace", workspaceId);

    console.log("connected to workspace");
    socket.on("receive-notes", (notes) => {
      console.log(fakeNotes);
      setFolders(fakeNotes);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const fakeNotes = Array.from({ length: 3 }, () =>
    Math.floor(Math.random() * 100)
  );

  return (
    <div className="bg-white flex w-full h-view">
      <div className="flex bg-gray-100 w-3/5 mx-auto justify-center">
        <div className="w-full h-screen my-auto overflow-y-auto overflow-x-hidden ml-auto">
          <NewEditor />
        </div>
      </div>
    </div>
  );
}
