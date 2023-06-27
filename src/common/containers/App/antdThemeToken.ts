import { AliasToken } from 'antd/es/theme/internal';
import { OverrideToken } from 'antd/es/theme/interface';
import { layout } from './layout';
import { IUserTheme } from '@common/contexts/AuthContext';
import { userColorPalette } from './ColorPalette';

export const antdThemeToken = (darkMode: boolean, userTheme: IUserTheme): Partial<AliasToken> => {
  const colorPalette = userColorPalette(userTheme);

  return {
    fontFamily: "'Open Sans', sans-serif",
    fontSize: 16,
    colorPrimary: userTheme.colorPrimary || colorPalette.primaryColor.main,
    colorError: '#c0293b',
    colorWhite: '#ffffff',
    borderRadius: 8,
    borderRadiusSM: 5,
    borderRadiusLG: 16,
    controlItemBgActive: darkMode ? '#393b3d' : '#e1e5eb',
    colorBgLayout: darkMode ? '#181818' : '#ffffff'
  };
};

export const antdThemeComponents = (darkMode: boolean, userTheme: IUserTheme): Partial<OverrideToken> => {
  return {
    Table: {
      colorFillAlter: layout(darkMode, userTheme)['colorHeaderBg'],
      //e.g. when table header has active sorter
      colorFillSecondary: layout(darkMode, userTheme)['colorHeaderBgSecondary']
    }
  };
};
