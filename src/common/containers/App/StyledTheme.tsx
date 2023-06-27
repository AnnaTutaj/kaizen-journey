import React, { useContext } from 'react';
import { theme } from 'antd';
import { ThemeContext } from '@common/contexts/Theme/ThemeContext';
import { ThemeProvider } from 'styled-components';
import { layout } from './layout';
import GlobalStyle from './GlobalStyle';
import { useAuth } from '@common/contexts/AuthContext';

export interface IProps {
  children: JSX.Element;
}
const StyledTheme: React.FC<IProps> = ({ children }) => {
  const { token } = theme.useToken();
  const { darkMode } = useContext(ThemeContext);
  const { userProfile } = useAuth();

  return (
    <ThemeProvider
      theme={{
        antd: token,
        layout: layout(darkMode, userProfile.theme)
      }}
    >
      <GlobalStyle $darkMode={darkMode} />
      {children}
    </ThemeProvider>
  );
};

export default StyledTheme;
