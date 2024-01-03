"use client";
import { useState, useEffect, createContext, useContext } from "react";
const WorkspaceContext = createContext([]);

const useLocalStorage = (key: string, initialValue: any) => {
  const [value, setValue] = useState(() => {
    if (typeof window !== "undefined") {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export const useCurrentSelectedNote = () => {
  const [currentSelectedNote, setCurrentSelectedNote] = useLocalStorage(
    "ActiveNote",
    "none"
  );
  return [currentSelectedNote, setCurrentSelectedNote];
};

export const useCurrentWorkspace = () => {
  const [currentWorkspace, setCurrentWorkspace] = useLocalStorage(
    "ActiveWorkspace",
    "none"
  );
  return [currentWorkspace, setCurrentWorkspace];
};

// export const WorkspaceInstance = ({}) => {
//   const [currentWorkspace, setCurrentWorkspace] = useState("");
//   const [allWorkspaces, setAllWorkspaces] = useState([{}]);
//   const [currentSelectedNote, setCurrentSelectedNote] = useState();
//   const [allNotes, setAllNotes] = useState();

//   useEffect(() => {}, []);

//   const initWorkspace = (credentials: string) => {
//     // send request to server
//     const link = "https://jsonplaceholder.typicode.com/todos/1";
//     console.log(credentials);
//     fetch(link)
//       .then((response) => response.json())
//       .then((json) => console.log(json));
//     // set all workspaces

//     setAllWorkspaces([
//       {
//         name: "Research notes",
//         description: "This is the max amount of chars",
//         id: "1",
//         shared: true,
//         owner: true,
//         time: "2 days ago",
//       },
//       {
//         name: "Research notes",
//         description: "This is the max amount of chars",
//         id: "2",
//         shared: false,
//         owner: false,
//         time: "1 days ago",
//       },
//       {
//         name: "Research notes",
//         description: "This is the max amount of chars",
//         id: "3",
//         shared: false,
//         owner: false,
//         time: "3 days ago",
//       },
//     ]);
//   };

// return <WorkspaceContext.Provider value={}}></WorkspaceContext.Provider>;
// };

// export const useWorkspaceInstance = () => {
//   const context = useContext(WorkspaceContext);

//   if (!context) {
//     throw new Error(
//       "useWorkspaceInstance must be used within a WorkspaceInstance"
//     );
//   }

//   return context;
// };
import React from "react";
type FoldersContextType = [any[], React.Dispatch<React.SetStateAction<any[]>>];

const FoldersContext = createContext<FoldersContextType | undefined>(undefined);

export const FoldersProvider = ({ children }) => {
  const [folders, setFolders] = useState<any[]>([]);

  useEffect(() => {
    const storedFolders = localStorage.getItem("Folders");
    if (storedFolders) {
      setFolders(JSON.parse(storedFolders));
    }
  }, []);

  useEffect(() => {
    if (folders.length > 0) {
      localStorage.setItem("Folders", JSON.stringify(folders));
    }
  }, [folders]);

  return (
    <FoldersContext.Provider value={[folders, setFolders]}>
      {children}
    </FoldersContext.Provider>
  );
};

export const useFolders = () => {
  const context = useContext(FoldersContext);

  if (!context) {
    throw new Error("useFolders must be used within a FoldersProvider");
  }

  return context;
};
