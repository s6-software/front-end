"use client";
import React from "react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { CheckBadgeIcon, XCircleIcon } from "@heroicons/react/24/outline";
const page = () => {
  const [isValid, setIsValid] = React.useState(false);

  return (
    <div className=" w-full h-screen flex">
      <div className="flex bg-gray-100 border-gray-300  border w-3/4 h-screen mx-auto justify-center">
        <form className="flex flex-col w-full justify-center">
          <div className="flex text-3xl justify-center mt-12">
            <h1 className="text">Create a new workspace</h1>
          </div>
          <div className="flex justify-center">
            <WorkspaceNameInput isValid={isValid} setIsValid={setIsValid} />
          </div>
          <div className="flex justify-center h-1/3">
            <textarea
              className="w-1/2 h-1/2 border-2 border-gray-300 p-2 rounded-lg m-2"
              placeholder="Workspace description"
              style={{ resize: "none" }}
            />
          </div>
          <div className="flex justify-center">
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded-md m-2"
              disabled={!isValid}
            >
              Create
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
}

const WorkspaceNameInput = ({
  isValid,
  setIsValid,
}: WorkspaceNameInputProps) => {
  const [workspaceName, setWorkspaceName] = React.useState("");
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

export default page;
