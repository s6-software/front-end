import { useState, useEffect } from "react";

const useLocalStorage = (key: string, initialValue: any) => {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

const useCurrentSelectedNote = () => {
  const [currentSelectedNote, setCurrentSelectedNote] = useLocalStorage(
    "ActiveNote",
    "none"
  );
  return [currentSelectedNote, setCurrentSelectedNote];
};

export default useCurrentSelectedNote;
