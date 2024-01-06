"use client";
import React from "react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Cookies from "js-cookie";
import { useSession } from "next-auth/react";
type workspace = {
  title: string;
  description: string;
};

function createWorkspace(workspace: workspace, token: string) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(workspace),
  };
  fetch(`${process.env.NEXT_PUBLIC_NOTESERVICE_URL}`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
}

const Page = () => {
  const { data: session, status } = useSession();
  const [isValid, setIsValid] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const [workspaceName, setWorkspaceName] = useState("");
  const [workspaceDescription, setWorkspaceDescription] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // setSubmitted(true);

    createWorkspace(
      {
        title: workspaceName,
        description: workspaceDescription,
      },
      session?.user?.email as string
    );
  };
  return (
    <div className=" w-full h-screen flex">
      <div className="flex bg-gray-100 border-gray-300  border w-3/4 h-screen mx-auto justify-center">
        <form
          className="flex flex-col w-full justify-center"
          onSubmit={handleSubmit}
        >
          <div className="flex text-3xl justify-center mt-12">
            <h1 className="text">Create a new workspace</h1>
          </div>
          <div className="flex justify-center">
            <WorkspaceNameInput
              isValid={isValid}
              setIsValid={setIsValid}
              setWorkspaceName={setWorkspaceName}
              workspaceName={workspaceName}
            />
          </div>
          <div className="flex justify-center h-1/3">
            <textarea
              className="w-1/2 h-1/2 border-2 border-gray-300 p-2 rounded-lg m-2"
              placeholder="description (optional)"
              style={{ resize: "none" }}
              value={workspaceDescription}
              onChange={(e) => setWorkspaceDescription(e.target.value)}
            />
          </div>
          <div className="flex justify-center">
            <button
              className={`bg-${
                isValid ? "blue" : "gray"
              }-500 text-white px-6 py-2 rounded-md m-2`}
              disabled={!isValid || submitted}
              type="submit"
            >
              {submitted ? (
                <div className="flex flex-row">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <p>loading...</p>
                </div>
              ) : (
                "Create"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface WorkspaceNameInputProps {
  isValid: boolean;
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
  setWorkspaceName: React.Dispatch<React.SetStateAction<string>>;
  workspaceName: string;
}

const WorkspaceNameInput = ({
  isValid,
  setIsValid,
  setWorkspaceName,
  workspaceName,
}: WorkspaceNameInputProps) => {
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setWorkspaceName(value);
    handleWorkspaceNameChange(value);
  };
  const handleWorkspaceNameChange = (workspaceName: string) => {
    const MinimalCharacterLength = 5;
    const alphanumericRegex = /^[a-zA-Z0-9]+(?:\s[a-zA-Z0-9]+)*$/;

    if (workspaceName.length < MinimalCharacterLength) {
      setIsValid(false);
      setErrorMessage(
        `Workspace name must be at least ${MinimalCharacterLength} characters long.`
      );
    } else if (!alphanumericRegex.test(workspaceName)) {
      setIsValid(false);
      setErrorMessage(
        "Workspace name can only contain alphabetical and numerical characters, with a single whitespace separation between words."
      );
    } else {
      setIsValid(true);
      setErrorMessage("");
    }
  };
  return (
    <div className="flex flex-col justify-center items-center mt-12 w-1/2">
      <div className="flex w-full border-2 border-gray-300 bg-white p-2 rounded-lg m-2">
        <input
          className="w-full h-full outline-none "
          placeholder="Workspace name"
          value={workspaceName}
          onChange={handleInputChange}
          required
        />
        {isValid ? (
          <CheckIcon className="h-5 w-5 text-green-500" />
        ) : (
          <XCircleIcon className="h-5 w-5 text-red-500" />
        )}
      </div>
      {!isValid && (
        <div className="w-full">
          <p className="w-full text-red-400 font-normal italic">
            {errorMessage}
          </p>
        </div>
      )}
    </div>
  );
};

export default Page;
