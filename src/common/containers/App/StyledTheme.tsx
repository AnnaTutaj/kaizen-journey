import React, { useContext } from 'react';
import { ThemeContext } from '@common/contexts/Theme/ThemeContext';
import { ThemeProvider, createStyles } from 'antd-style';
import { layout } from './layout';
import { IUserTheme, useUserProfile } from '@common/contexts/UserProfile/UserProfileContext';
import { NewToken } from './antdStyle';

const useStyles = createStyles(({ css, token }) => ({
  customBody: css`
    margin: 0;
    color: ${token.colorText};
    line-height: ${token.lineHeight};
    background-color: ${token.colorBgLayout};

    h2 {
      font-weight: 500;
    }
  `
}));

export interface IProps {
  children: JSX.Element;
  customizeColorsPreview?: IUserTheme;
}

const StyledTheme: React.FC<IProps> = ({ children }) => {
  const { styles } = useStyles();
  const { darkMode, footerHeight } = useContext(ThemeContext);
  const { userProfile } = useUserProfile();

  document.body.classList.add(styles.customBody);

  return (
    <ThemeProvider<NewToken>
      customToken={{ layout: { ...layout(darkMode, userProfile.theme), footerHeight: footerHeight } }}
      appearance={darkMode ? 'dark' : 'light'}
    >
      {children}
    </ThemeProvider>
  );
};

export default StyledTheme;
