"use client";
import { useState, useEffect } from "react";

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

export const getAllWorkspaces = () => {
  const [allWorkspaces, setAllWorkspaces] = useLocalStorage(
    "Workspaces",
    "none"
  );
  return [allWorkspaces, setAllWorkspaces];
};
