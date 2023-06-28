import { memo, useEffect, useState } from 'react';
import { ThemeContext } from './ThemeContext';

const ThemeProvider = ({ children }: any) => {
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

  return <ThemeContext.Provider value={{ darkMode, setDarkMode }}>{children}</ThemeContext.Provider>;
};

export default memo(ThemeProvider) as typeof ThemeProvider;
