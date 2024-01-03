"use client";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { SparklesIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useFolders } from "@/app/Components/Sidebar/sidebarHook";
function getWorkspaces(token: string, setWorkspaces: any) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  fetch("http://localhost:3456/workspace", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      setWorkspaces(data);
    })
    .catch((error) => {
      signOut();
    });
}

function Page() {
  const { data: session, status } = useSession();
  const [workspace, setWorkspace] = React.useState([]);
  const [folders, setFolders] = useFolders();

  useEffect(() => {
    setFolders([]);
    getWorkspaces(session?.user?.email as string, setWorkspace);
  }, []);
  return (
    <div className="w-full h-screen align-middle justify-center">
      <div className="flex bg-gray-100 border-gray-300  border w-3/4 h-screen mx-auto">
        <div className="flex flex-col w-full align-center">
          <div>
            <h1 className="text-center mb-4 text-4xl font-bold text-black md:text-5xl lg:text-6xl mt-5">
              Your workspaces
            </h1>
          </div>
          <div className="flex flex-col justify-between h-full mt-20">
            <WorkspaceExplorer workspace={workspace} />

            <div className="flex w-full self-end justify-center">
              <CreateWorkspaceButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const CreateWorkspaceButton = () => {
  return (
    <Link
      href={"create"}
      className="flex w-96 flex-col  mb-2 bg-green-300 border-dashed border  border-black p-6 rounded-lg shadow hover:bg-green-200 cursor-pointer transition-all duration-300"
    >
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
    </Link>
  );
};

const WorkspaceExplorer = (workspace: any) => {
  let workspaces = [
    {
      title: "Research notes",
      description: "This is the max amount of chars",
      _id: "1",
      shared: true,
      owner: true,
      time: "2 days ago",
    },
  ];

  if (workspace.workspace.length > 0) {
    workspaces = workspace.workspace;
    console.log(workspaces);
  }

  return (
    <div className="flex flex-row gap-4 overflow-x-scroll overflow-y-hidden mx-auto w-5/6">
      {workspaces.map((obj) => (
        <WorkspaceCardItem
          name={obj.title}
          key={obj._id}
          description={obj.description}
          id={obj._id}
          shared={obj.shared}
          owner={obj.owner}
          time={obj.time}
        />
      ))}
      {workspaces.length < 2 && (
        <>
          <EmptyWorkspaceCardItem />
          <EmptyWorkspaceCardItem />
          <EmptyWorkspaceCardItem />
        </>
      )}
    </div>
  );
};

const EmptyWorkspaceCardItem = () => {
  const cardstyle = { flex: "1 0 30%" };
  return (
    <div
      style={cardstyle}
      className="flex flex-col h-72 mb-2 bg-slate-200 border border-dashed border-black p-6 rounded-lg shadow"
    >
      <div className="flex w-full flex-col">
        <h1 className="flex w-full mb-2 text-2xl font-bold tracking-tight text-black">
          Empty slot
        </h1>

        <p className="font-normal text-gray700"></p>
      </div>

      <div className="flex w-full justify-between items-end mt-auto">
        <div className="flex flex-row"></div>
      </div>
    </div>
  );
};
interface WorkspaceCardItemProps {
  name: string;
  description: string;
  id: string;
  shared?: boolean;
  owner?: boolean;
  time?: string;
}
const WorkspaceCardItem = ({
  name,
  description,
  id,
  shared,
  owner,
  time,
}: WorkspaceCardItemProps) => {
  const cardstyle = { flex: "1 0 30%" };

  return (
    <Link
      href={"/workspace/" + id}
      style={cardstyle}
      className="flex flex-col h-72 mb-2 bg-slate-100 border border-black p-6 rounded-lg shadow hover:bg-gray-50 cursor-pointer transition-all duration-300"
    >
      <div className="flex w-full flex-col">
        <h1 className="flex w-full mb-2 text-2xl font-bold tracking-tight text-black">
          {name}
        </h1>

        <p className="font-normal text-gray700">{description}</p>
      </div>

      <div className="flex w-full justify-between items-end mt-auto">
        <div className="flex flex-row">
          {shared && (
            <UserGroupIcon
              title="This workspace is shared"
              className="w-8 h-8 fill-blue-500 stroke-black"
            />
          )}

          {owner && (
            <SparklesIcon
              title="you are the owner of this workspace"
              className="w-8 h-8 fill-yellow-500 stroke-black"
            />
          )}
        </div>
        {time && <p className="flex font-normal text-gray-700 ">{time}</p>}
      </div>
    </Link>
  );
};
export default Page;
