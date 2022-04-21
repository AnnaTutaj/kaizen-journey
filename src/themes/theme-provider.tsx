import { lazy, Suspense } from 'react';
import { useTheme } from './use-theme';

const DarkTheme = lazy(() => import('./dark-theme'));
const LightTheme = lazy(() => import('./light-theme'));

interface IThemeProvider {
  children: React.ReactElement;
}

export const ThemeProvider: React.FC<IThemeProvider> = ({ children }) => {
  const { darkMode } = useTheme();

  return (
    <>
      <Suspense fallback={<span />}>{darkMode ? <DarkTheme /> : <LightTheme />}</Suspense>
      {children}
    </>
  );
};
