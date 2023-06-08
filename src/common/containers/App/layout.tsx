import { ColorPalette } from './ColorPalette';

export const layout = (darkMode: boolean) => {
  return {
    colorHeaderBg: darkMode ? '#202020' : '#f0f2f5',
    colorPrimaryBg: darkMode ? ColorPalette.primaryColor.dark : ColorPalette.primaryColor.light,
    headerHeight: '60px',
    colorDarkGray: '#6b6b6b'
  };
};
