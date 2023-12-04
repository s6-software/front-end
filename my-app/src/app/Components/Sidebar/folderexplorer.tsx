import { FolderIcon, FolderOpenIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import useCurrentSelectedNote from "./sidebarHook";

interface NoteExplorerProps {
  WorkspaceTitle: string;
}
const NoteExplorer = ({ WorkspaceTitle }: NoteExplorerProps) => {
  const All_Folders = ["Folder A", "Folder B", "Folder C"];
  const [currentSelectedNote, setCurrentSelectedNote] =
    useCurrentSelectedNote();
  return (
    <div className="flex pt-2 pb-2 ml-2 mr-2 justify-start flex-col">
      <p className="ml-2 text-base">{WorkspaceTitle}</p>

      {All_Folders.map((item) => (
        <FolderItem
          key={item}
          folderTitle={item}
          currentSelectedNote={currentSelectedNote}
          setCurrentSelectedNote={setCurrentSelectedNote}
        />
      ))}
    </div>
  );
};

interface FolderItemProps {
  folderTitle: string;
  currentSelectedNote: string;
  setCurrentSelectedNote: (value: string) => void;
}

const FolderItem = ({
  folderTitle,
  currentSelectedNote,
  setCurrentSelectedNote,
}: FolderItemProps) => {
  const [open, setOpen] = useState<Boolean>(false);
  const list = ["note 1", "note 2", "note 3", "note 4", "note 5"];

  return (
    <div>
      <div onClick={(e) => setOpen(!open)} className="flex  w-full">
        <div className="flex w-full ml-2 mt-2 text-base rounded-md col-span-2 cursor-pointer hover:bg-gray-400 transition-all ease-in-out delay-50">
          {open ? (
            <FolderOpenIcon className="ml-2 h-6 w-6" />
          ) : (
            <FolderIcon className="ml-2 h-6 w-6" />
          )}
          <p className={`ml-2 text-lg ${open ? "font-bold" : "font-normal"}`}>
            {folderTitle}
          </p>
        </div>
      </div>
      <div className="border-l-2 rounded-sm border-gray-300 ml-6">
        {open &&
          list.map((item) => (
            <NoteItem
              key={folderTitle + "/" + item}
              NoteTitle={item}
              Path={folderTitle + "/" + item}
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

  currentSelectedNote: string;
  setCurrentSelectedNote: (value: string) => void;
}

const NoteItem = ({
  NoteTitle,
  Path,
  currentSelectedNote,
  setCurrentSelectedNote,
}: NoteItemProps) => {
  return (
    <div
      className="flex w-full rounded-md hover:bg-gray-400 cursor-pointer transition-all ease-in-out"
      onClick={(e) => setCurrentSelectedNote(Path)}
    >
      <p
        className={`ml-8 ${
          currentSelectedNote == Path ? "font-bold" : "font-normal"
        }`}
      >
        {NoteTitle}
      </p>
    </div>
  );
};

export default NoteExplorer;
