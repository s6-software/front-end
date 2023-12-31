"use client";
import {
  ChevronRightIcon,
  HomeIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import {
  AdjustmentsHorizontalIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { signOut } from "next-auth/react";
import NoteExplorer from "./folderexplorer";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useFolders } from "./sidebarHook";

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const show_empty = true;
  const { data: session } = useSession();
  const userName = session?.user?.name || "invalid user";
  const [folders, setFolders] = useFolders();
  return (
    <div className="flex h-screen">
      <div
        className={`${
          open ? "w-80" : "w-40"
        } h-full flex flex-col bg-gray-50 relative transition-all duration-300 ease-in-out border-r border-gray-400`}
      >
        <ProfileItem text={userName} setOpen={setOpen} open={open} />
        {show_empty ? (
          <div>
            <div className="border-t border-gray-400 pt-2 m-2 "></div>
            <HomeButton />
            <SearchItem />
            <div className="border-t border-gray-400 pt-2 m-2 "></div>

            {folders.length > 0 && (
              <>
                <NoteExplorer
                  WorkspaceTitle="Default Workspace"
                  Folders={folders}
                />
                <div className="border-t border-gray-400 pt-2 m-2 "></div>
              </>
            )}

            <WorkspaceSettings />
          </div>
        ) : (
          <div></div>
        )}
        <LogoutButton />
      </div>
    </div>
  );
}

interface ProfileItemProps {
  text: string;
  setOpen: (value: boolean) => void;
  open: boolean;
}
const ProfileItem = ({ text, setOpen, open }: ProfileItemProps) => {
  return (
    <div className="flex grid-cols-1 justify-center">
      <div className="flex grid-cols-3 justify-between w-full h-24 items-center ml-2 ">
        <div className="flex grid-cols-2 items-center">
          <img
            className="w-20 h-20 rounded-lg bg-white border-2 border-black"
            src="https://api.dicebear.com/7.x/notionists/svg"
          />
          <div className="ml-2" style={{ fontSize: "1.2rem", color: "black" }}>
            {open ? text : ""}
          </div>
        </div>

        <button className="mr-5" onClick={(e) => setOpen(!open)}>
          {open ? (
            <ChevronRightIcon className="w-6 h-6 rotate-180" />
          ) : (
            <ChevronRightIcon className="w-6 h-6 " />
          )}
        </button>
      </div>
    </div>
  );
};

const SearchItem = ({}) => {
  return (
    <Link
      href={"/dashboard"}
      className="flex pt-2 pb-2 ml-2 mr-2 mt-1 rounded-md justify-start col-span-2 hover:bg-gray-300 transition-all ease-in-out delay-50 cursor-pointer"
    >
      <MagnifyingGlassIcon className="ml-2 h-6 w-6" />
      <p className="ml-2 text-md">search</p>
    </Link>
  );
};

const HomeButton = () => {
  return (
    <Link
      href={"/dashboard"}
      className="flex pt-2 pb-2 ml-2 mr-2 rounded-md justify-start col-span-2 hover:bg-gray-300 transition-all ease-in-out delay-50 cursor-pointer"
    >
      <HomeIcon className="ml-2 h-6 w-6" />
      <p className="ml-2 text-md">dashboard</p>
    </Link>
  );
};

const WorkspaceSettings = () => {
  return (
    <div className="flex pt-2 pb-2 ml-2 mr-2 rounded-md justify-start col-span-2 hover:bg-gray-300 transition-all ease-in-out delay-50 cursor-pointer">
      <AdjustmentsHorizontalIcon className="ml-2 h-6 w-6" />
      <p className="ml-2 text-md">Manager</p>
    </div>
  );
};

const LogoutButton = () => {
  const logout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div
      onClick={logout}
      className="flex mt-auto mb-2 pt-2 pb-2 ml-2 mr-2 rounded-md justify-start col-span-2 hover:bg-red-300 transition-all ease-in-out delay-150 cursor-pointer"
    >
      <ArrowRightOnRectangleIcon className="ml-2 h-6 w-6" />
      <p className="ml-2 text-md">logout</p>
    </div>
  );
};
