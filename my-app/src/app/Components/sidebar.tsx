"use client";
import React, { useState } from "react";

const sidebar = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex">
      <div
        className={`${
          open ? "w-96" : "w-32"
        } h-screen bg-gray-500 relative transition-all duration-300 ease-in-out`}
      >
        <div className="flex grid-cols-1 justify-center">
          <ProfileItem text={"display name"} setOpen={setOpen} open={open} />
        </div>
        <div className="border-t border-gray-700 pt-2 m-2 "></div>
      </div>
    </div>
  );
};

const ProfileItem = ({ text, setOpen, open }) => {
  return (
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
  );
};

export default sidebar;
