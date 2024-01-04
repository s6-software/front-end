"use client";
import { useState, useEffect, createContext, useContext } from "react";

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

import React from "react";
type FoldersContextType = {
  folders: any[];
  setFolders: React.Dispatch<React.SetStateAction<any[]>>;

  selectedNote: string;
  setSelectedNote: React.Dispatch<React.SetStateAction<string>>;
};

const FoldersContext = createContext<FoldersContextType | undefined>(undefined);

export const FoldersProvider = ({ children }: any) => {
  const [folders, setFolders] = useState<any[]>([]);
  const [selectedNote, setSelectedNote] = useState<string>("");

  useEffect(() => {
    const storedFolders = localStorage.getItem("Folders");
    const storedSelectedNote = localStorage.getItem("ActiveNote");
    if (storedFolders) {
      setFolders(JSON.parse(storedFolders));
    }
    if (storedSelectedNote) {
      setSelectedNote(storedSelectedNote);
    }
  }, []);

  useEffect(() => {
    if (folders.length > 0) {
      localStorage.setItem("Folders", JSON.stringify(folders));
    }
  }, [folders]);

  useEffect(() => {
    if (selectedNote !== "") {
      localStorage.setItem("ActiveNote", selectedNote);
    }
  }, [selectedNote]);
  return (
    <FoldersContext.Provider
      value={{
        folders,
        setFolders,

        selectedNote,
        setSelectedNote,
      }}
    >
      {children}
    </FoldersContext.Provider>
  );
};

export const useFolders = () => {
  const context = useContext(FoldersContext);

  if (!context) {
    throw new Error("useFolders must be used within a FoldersProvider");
  }
  return [context.folders, context.setFolders];
};

export const useSelectedNote = () => {
  const context = useContext(FoldersContext);

  if (!context) {
    throw new Error("useSelectedNote must be used within a FoldersProvider");
  }
  return [context.selectedNote, context.setSelectedNote];
};
