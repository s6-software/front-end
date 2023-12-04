import React from "react";

const page = () => {
  return (
    <div className="w-full h-screen bg-red-200 align-middle justify-center">
      <div className="flex bg-gray-300 w-3/4 h-screen mx-auto">
        <div className="flex flex-col w-full align-center">
          <div>
            <p className="text-2xl w-full text-center border-b-2 border-b-gray-200">
              Dashboard
            </p>
          </div>
          <h1>Header title</h1>
          <WorkspaceExplorer />
        </div>
      </div>
    </div>
  );
};

const WorkspaceExplorer = () => {
  const workspaces = [
    "card 1",
    "card 2",
    "card 3",
    "card 4",
    "card 5",
    "card 6",
  ];
  return (
    <div className="flex overflow-x-scroll overflow-y-hidden w-full">
      {workspaces.map((workspace, index) => (
        <WorkspaceCardItem
          key={index}
          name={workspace}
          description={`Description for ${workspace}`}
          id={`workspace-${index}`}
        />
      ))}
    </div>
  );
};

interface WorkspaceCardItemProps {
  name: string;
  description: string;
  id: string;
}

const WorkspaceCardItem = ({
  name,
  description,
  id,
}: WorkspaceCardItemProps) => {
  return (
    <div className="flex">
      <a
        href="#"
        className="text-center w-60 h-40 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {name}
        </h1>
        <div className="flex justify-center h-full align-middle">
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {description}
          </p>
        </div>
      </a>
    </div>
  );
};
export default page;
