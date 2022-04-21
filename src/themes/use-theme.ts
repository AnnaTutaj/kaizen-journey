import { useEffect, useState } from 'react';

const DARK_MODE = 'dark-mode';

const getDarkMode = (): boolean => {
  const darkMode: string | null = localStorage.getItem(DARK_MODE);
  if (darkMode) {
    return JSON.parse(darkMode) === true ? true : false;
  }

  return false;
};

export const useTheme = () => {
  const [darkMode, setDarkMode] = useState<boolean>(getDarkMode);

  useEffect(() => {
    const initialValue = getDarkMode();
    if (initialValue !== darkMode) {
      localStorage.setItem(DARK_MODE, JSON.stringify(darkMode));
      window.location.reload();
    }
  }, [darkMode]);

  return { darkMode, setDarkMode };
};
