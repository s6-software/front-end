import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import React from "react";

const page = () => {
  return (
    <div className="w-full h-screen align-middle justify-center">
      <div className="flex bg-gray-100 border-gray-300  border w-3/4 h-screen mx-auto">
        <div className="flex flex-col w-full align-center">
          <div>
            <h1 className="text-center mb-4 text-4xl font-extrabold text-black md:text-5xl lg:text-6xl ">
              All workspaces
            </h1>
          </div>

          <WorkspaceExplorer />

          <div className="flex w-full justify-center">
            <CreateWorkspaceButton />
          </div>
        </div>
      </div>
    </div>
  );
};

const CreateWorkspaceButton = () => {
  return (
    <div className="flex w-96 flex-col  mb-2 bg-green-300 border-dashed border  border-black p-6 rounded-lg shadow hover:bg-green-200 cursor-pointer transition-all duration-300">
      <h1 className="flex w-full mb-2 text-2xl font-bold tracking-tight text-black">
        Create new workspace
      </h1>
      <div className="flex w-full">
        <p className="font-normal text-gray700">
          Create a new workspace to start taking notes
        </p>
      </div>
      <div className="flex w-full justify-end">
        <PlusCircleIcon className="w-16 h-16" />
      </div>
    </div>
  );
};

const WorkspaceExplorer = () => {
  const workspaces = [
    {
      name: "Research notes",
      description: "This is the max amount of chars",
      id: "1",
      shared: true,
    },
    {
      name: "Research notes",
      description: "This is the max amount of chars",
      id: "2",
      shared: false,
    },
    {
      name: "Research notes",
      description: "This is the max amount of chars",
      id: "3",
      shared: false,
    },
    {
      name: "Research notes",
      description: "This is the max amount of chars",
      id: "4",
      shared: true,
    },
    {
      name: "Research notes",
      description: "This is the max amount of chars",
      id: "5",
      shared: false,
    },
    {
      name: "Research notes",
      description: "This is the max amount of chars",
      id: "6",
      shared: false,
    },
    {
      name: "Research notes",
      description: "This is the max amount of chars",
      id: "7",
      shared: false,
    },
    {
      name: "Research notes",
      description: "This is the max amount of chars",
      id: "8",
      shared: false,
    },
  ];
  return (
    <div className="flex flex-row gap-4 overflow-x-scroll overflow-y-hidden mx-auto w-5/6">
      {workspaces.map((obj) => (
        <WorkspaceCardItem
          name={obj.name}
          description={obj.description}
          id={obj.id}
          shared={obj.shared}
        />
      ))}
    </div>
  );
};

interface WorkspaceCardItemProps {
  name: string;
  description: string;
  id: string;
  shared?: boolean;
}
const WorkspaceCardItem = ({
  name,
  description,
  id,
  shared,
}: WorkspaceCardItemProps) => {
  const cardstyle = { flex: "1 0 30%" };

  return (
    <div
      style={cardstyle}
      className="flex flex-col mb-2 bg-slate-100 border border-black p-6 rounded-lg shadow hover:bg-gray-100 cursor-pointer transition-all duration-300"
    >
      <div className="flex w-full flex-col">
        <h1 className="flex w-full mb-2 text-2xl font-bold tracking-tight text-black">
          {name}
        </h1>

        <p className="font-normal text-gray700">{description}</p>
      </div>
      {shared && (
        <div className="flex w-full justify-end items-end mt-auto">
          <UserGroupIcon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
};
export default page;
