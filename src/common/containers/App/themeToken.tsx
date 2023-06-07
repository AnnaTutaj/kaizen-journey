import { AliasToken } from 'antd/es/theme/internal';

export const themeToken = (darkMode: boolean): Partial<AliasToken> => {
  return {
    fontFamily: "'Open Sans', sans-serif",
    fontSize: 16,
    colorPrimary: '#8236d5',
    colorError: '#c0293b',
    colorWhite: '#ffffff',
    borderRadius: 8,
    borderRadiusSM: 5,
    borderRadiusLG: 16,
    controlItemBgActive: darkMode ? "#393b3d" : "#e1e5eb"
  };
};
