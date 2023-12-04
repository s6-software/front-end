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

          <WorkspaceExplorer />
        </div>
      </div>
    </div>
  );
};

const WorkspaceExplorer = () => {
  return (
    <div>
      <div>hel</div>
    </div>
  );
};
export default page;
