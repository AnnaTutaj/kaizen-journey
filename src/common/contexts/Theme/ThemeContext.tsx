import { createContext, Dispatch, SetStateAction } from 'react';

export const ThemeContext = createContext<{
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
  footerHeight: number;
  setFooterHeight: Dispatch<SetStateAction<number>>;
}>({
  darkMode: false,
  setDarkMode: () => {},
  footerHeight: 0,
  setFooterHeight: () => {}
}) as React.Context<{
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
  footerHeight: number;
  setFooterHeight: Dispatch<SetStateAction<number>>;
}>;
