import React, { useContext } from 'react';
import { theme } from 'antd';
import { DarkModeContext } from '@common/contexts/DarkMode/DarkModeContext';
import { ThemeProvider } from 'styled-components';
import { layout } from './layout';
import GlobalStyle from './GlobalStyle';
import { IUserTheme, useUserProfile } from '@common/contexts/UserProfile/UserProfileContext';

export interface IProps {
  children: JSX.Element;
  customizeColorsPreview?: IUserTheme;
}

const StyledTheme: React.FC<IProps> = ({ children, customizeColorsPreview }) => {
  const { token } = theme.useToken();
  const { darkMode } = useContext(DarkModeContext);
  const { userProfile } = useUserProfile();

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
