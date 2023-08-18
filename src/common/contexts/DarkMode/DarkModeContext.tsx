import { createContext, Dispatch, SetStateAction } from 'react';

export const DarkModeContext = createContext<{
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
}>({
  darkMode: false,
  setDarkMode: () => {}
}) as React.Context<{
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
}>;
