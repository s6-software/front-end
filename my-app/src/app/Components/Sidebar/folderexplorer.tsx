"use client";
import { FolderIcon, FolderOpenIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useSelectedNote } from "./sidebarHook";

interface NoteExplorerProps {
  WorkspaceTitle: string;
  Folders: string;
}

interface ServerData {
  [folder: string]: {
    [note: string]: string;
  };
}

const NoteExplorer = ({ Folders, WorkspaceTitle }: NoteExplorerProps) => {
  const [selectedNote, setSelectedNote] = useSelectedNote();
  const FoldersObject: ServerData = JSON.parse(Folders);
  return (
    <div className="flex pt-2 pb-2 ml-2 mr-2 justify-start flex-col select-none">
      <p className="ml-2 text-base">{WorkspaceTitle}</p>
      {Object.entries(FoldersObject).map(([folderTitle, notes]) => (
        <FolderItem
          key={folderTitle}
          notes={{
            notes: Object.entries(notes).map(([noteTitle, noteId]) => ({
              title: noteTitle,
              id: noteId,
            })),
          }}
          folderTitle={folderTitle}
          currentSelectedNote={selectedNote}
          setCurrentSelectedNote={setSelectedNote as (value: any[]) => void}
        />
      ))}
    </div>
  );
};

interface FolderItemProps {
  folderTitle: string;
  notes: {
    notes: {
      title: string;
      id: string;
    }[];
  };
  currentSelectedNote: [string, string];
  setCurrentSelectedNote: (value: [string, string]) => void;
}

const FolderItem = ({
  folderTitle,
  currentSelectedNote,
  setCurrentSelectedNote,
  notes,
}: FolderItemProps) => {
  const [open, setOpen] = useState<Boolean>(false);

  return (
    <div>
      <div onClick={(e) => setOpen(!open)} className="flex  w-full">
        <div className="flex w-full ml-2 mt-2 text-base rounded-md col-span-2 cursor-pointer hover:bg-gray-400 transition-all ease-in-out delay-50">
          {open ? (
            <FolderOpenIcon className="ml-2 h-6 w-6" />
          ) : (
            <FolderIcon className="ml-2 h-6 w-6" />
          )}
          <p className={`ml-2 text-lg "font-normal"`}>{folderTitle}</p>
        </div>
      </div>
      <div className="border-l-2 rounded-sm border-gray-300 ml-6">
        {open &&
          notes.notes.map((note) => (
            <NoteItem
              key={folderTitle + "/" + note.title}
              NoteTitle={note.title}
              Path={note.id}
              currentSelectedNote={currentSelectedNote}
              setCurrentSelectedNote={setCurrentSelectedNote}
            />
          ))}
      </div>
    </div>
  );
};

interface NoteItemProps {
  NoteTitle: string;
  Path: string;

  currentSelectedNote: [string, string];
  setCurrentSelectedNote: (value: [string, string]) => void;
}

const NoteItem = ({
  NoteTitle,
  Path,
  currentSelectedNote,
  setCurrentSelectedNote,
}: NoteItemProps) => {
  return (
    <div
      className="flex w-full rounded-md hover:bg-gray-300 cursor-pointer transition-all ease-in-out"
      onClick={(e) => setCurrentSelectedNote([NoteTitle, Path])}
    >
      <p
        className={`ml-8 ${
          currentSelectedNote[1] == Path ? "font-bold" : "font-normal"
        }`}
      >
        {NoteTitle}
      </p>
    </div>
  );
};

export default NoteExplorer;
