import { useEffect, useState } from 'react';

const useLocalStorage = (initialState, key) => {
  const [value, setValue] = useState(function () {
    const storeValue = localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key))
      : initialState;
    return storeValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
