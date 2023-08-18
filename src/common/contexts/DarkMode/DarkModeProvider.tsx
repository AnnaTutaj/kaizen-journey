import { memo, useEffect, useState } from 'react';
import { DarkModeContext } from './DarkModeContext';

const DarkModeProvider = ({ children }: any) => {
  const DARK_MODE = 'dark-mode';

  const getDarkMode = (): boolean => {
    const darkMode: string | null = localStorage.getItem(DARK_MODE);
    if (darkMode) {
      return JSON.parse(darkMode) === true ? true : false;
    }

    return false;
  };

  const [darkMode, setDarkMode] = useState<boolean>(getDarkMode());

  useEffect(() => {
    const initialValue = getDarkMode();
    if (initialValue !== darkMode) {
      localStorage.setItem(DARK_MODE, JSON.stringify(darkMode));
    }
  }, [darkMode]);

  return <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>{children}</DarkModeContext.Provider>;
};

export default memo(DarkModeProvider) as typeof DarkModeProvider;
