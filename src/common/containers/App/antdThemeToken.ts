import { AliasToken } from 'antd/es/theme/internal';
import { ColorPalette } from './ColorPalette';

export const antdThemeToken = (darkMode: boolean): Partial<AliasToken> => {
  return {
    fontFamily: "'Open Sans', sans-serif",
    fontSize: 16,
    colorPrimary: ColorPalette.primaryColor.main,
    colorError: '#c0293b',
    colorWhite: '#ffffff',
    borderRadius: 8,
    borderRadiusSM: 5,
    borderRadiusLG: 16,
    controlItemBgActive: darkMode ? '#393b3d' : '#e1e5eb',
    colorBgLayout: darkMode ? '#181818' : '#ffffff'
  };
};
