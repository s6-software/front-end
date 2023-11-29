"use client";
import {
  ChevronRightIcon,
  FolderIcon,
  FolderOpenIcon,
  HomeIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import {
  ArrowRightOnRectangleIcon,
  HomeModernIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { signOut } from "next-auth/react";

const sidebar = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex">
      <div
        className={`${
          open ? "w-80" : "w-32"
        } h-screen flex flex-col bg-gray-500 relative transition-all duration-300 ease-in-out`}
      >
        <ProfileItem text={"display name"} setOpen={setOpen} open={open} />
        <div className="border-t border-gray-700 pt-2 m-2 "></div>
        <HomeButton />
        <SearchItem />
        <div className="border-t border-gray-700 pt-2 m-2 "></div>

        <NoteExplorer />
        <LogoutButton />
      </div>
    </div>
  );
};

const ProfileItem = ({ text, setOpen, open }) => {
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
          {open ? "<" : ">"}
        </button>
      </div>
    </div>
  );
};

const SearchItem = ({}) => {
  return (
    <div className="flex pt-2 pb-2 ml-2 mr-2 mt-1 rounded-md justify-start col-span-2 hover:bg-gray-400 transition-all ease-in-out delay-50 cursor-pointer">
      <MagnifyingGlassIcon className="ml-2 h-6 w-6" />
      <p className="ml-2 text-md">search</p>
    </div>
  );
};

const HomeButton = () => {
  return (
    <div className="flex pt-2 pb-2 ml-2 mr-2 rounded-md justify-start col-span-2 hover:bg-gray-400 transition-all ease-in-out delay-50 cursor-pointer">
      <HomeIcon className="ml-2 h-6 w-6" />
      <p className="ml-2 text-md">dashboard</p>
    </div>
  );
};

const LogoutButton = () => {
  const logout = async () => {
    try {
      await signOut(); // Call the signOut function from NextAuth.js
      // Additional logout logic or redirect can be added here
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div
      onClick={logout}
      className="flex mt-auto mb-2 pt-2 pb-2 ml-2 mr-2 rounded-md justify-start col-span-2 hover:bg-red-400 transition-all ease-in-out delay-150 cursor-pointer"
    >
      <ArrowRightOnRectangleIcon className="ml-2 h-6 w-6" />
      <p className="ml-2 text-md">logout</p>
    </div>
  );
};

const NoteExplorer = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex pt-2 pb-2 ml-2 mr-2 justify-start flex-col">
      <p className="ml-2 text-base">Workspace Title</p>

      <div
        onClick={(e) => setOpen(!open)}
        className="flex ml-2 text-base rounded-md col-span-2 cursor-pointer hover:bg-gray-400 transition-all ease-in-out delay-50"
      >
        {open ? (
          <FolderOpenIcon className="ml-2 h-6 w-6" />
        ) : (
          <FolderIcon className="ml-2 h-6 w-6" />
        )}
        <p className="ml-2">folder title</p>
      </div>
    </div>
  );
};
export default sidebar;
