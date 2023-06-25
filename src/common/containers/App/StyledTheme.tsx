import React, { useContext } from 'react';
import { theme } from 'antd';
import { ThemeContext } from '@common/contexts/Theme/ThemeContext';
import { ThemeProvider } from 'styled-components';
import { layout } from './layout';
import GlobalStyle from './GlobalStyle';

export interface IProps {
  children: JSX.Element;
}
const StyledTheme: React.FC<IProps> = ({ children }) => {
  const { token } = theme.useToken();
  const { darkMode } = useContext(ThemeContext);

  return (
    <ThemeProvider
      theme={{
        antd: token,
        layout: layout(darkMode)
      }}
    >
      <GlobalStyle $darkMode={darkMode} />
      {children}
    </ThemeProvider>
  );
};

export default StyledTheme;
