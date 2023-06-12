import { ColorPalette } from './ColorPalette';

export type ILayout = {
  colorHeaderBg: string;
  colorPrimaryBg: string;
  colorDarkGray: string;
  colorLightGray: string;
  colorTitleGray: string;
  headerHeight: string;
  footerHeight: string;
  contentPaddingVertical: string;
};

export const layout = (darkMode: boolean): ILayout => {
  return {
    colorHeaderBg: darkMode ? '#202020' : '#f0f2f5',
    colorPrimaryBg: darkMode ? ColorPalette.primaryColor.dark : ColorPalette.primaryColor.light,
    colorDarkGray: '#6b6b6b',
    colorLightGray: '#e6e6e6',
    colorTitleGray: '#8b8b8b',

    //Dimensions
    headerHeight: '60px',
    footerHeight: '80px',
    contentPaddingVertical: '20px'
  };
};
