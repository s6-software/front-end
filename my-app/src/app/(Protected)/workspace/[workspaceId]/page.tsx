"use client";
import { useEffect, useState } from "react";
import NewEditor from "./Editor";
import { signOut, useSession } from "next-auth/react";
import { io } from "socket.io-client";
import {
  useFolders,
  useSelectedNote,
} from "../../../Components/Sidebar/sidebarHook";

type WorkspacePage = {
  params: {
    workspaceId: string;
  };
};
interface ServerData {
  [folder: string]: {
    [note: string]: string;
  };
}
export default function Home({ params }: WorkspacePage) {
  const { data: session, status } = useSession();

  const workspaceId = params.workspaceId;
  const [folders, setFolders] = useFolders();
  const [selectedNote, setSelectedNote] = useSelectedNote();

  const NoteName = selectedNote[0] as string;
  const NoteId = selectedNote[1] as string;

  useEffect(() => {
    setSelectedNote(["", ""]);
    const socket = io(`${process.env.NEXT_PUBLIC_NOTESERVICE_URL}`, {
      auth: {
        token: session?.user?.email,
      },
      // path: "/note-service/socket.io",
    });
    socket.emit("join-workspace", workspaceId);
    socket.on("receive-notes", (product: ServerData) => {
      setFolders(JSON.stringify(product));
      socket.disconnect();
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="bg-white flex w-full h-view">
      <div className="flex bg-gray-100 w-3/5 mx-auto justify-center">
        <div className="w-full h-screen my-auto overflow-y-auto overflow-x-hidden ml-auto">
          {NoteId && (
            <NewEditor
              NoteName={NoteName}
              NoteId={NoteId}
              WorkspaceId={workspaceId}
            />
          )}
        </div>
      </div>
    </div>
  );
}
