import { lazy, Suspense } from 'react';
import { useTheme } from './useTheme';

const DarkTheme = lazy(() => import('./DarkTheme'));
const LightTheme = lazy(() => import('./LightTheme'));

interface IThemeProvider {
  children: React.ReactElement;
}

export const ThemeProvider: React.FC<IThemeProvider> = ({ children }) => {
  const { darkMode } = useTheme();

  return (
    <>
      <Suspense fallback={<span />}>
        {darkMode ? <DarkTheme children={children} /> : <LightTheme children={children} />}
      </Suspense>
    </>
  );
};
