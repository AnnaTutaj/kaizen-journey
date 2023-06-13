import { rgba } from 'polished';
import { ColorPalette } from './ColorPalette';

export type ILayout = {
  colorHeaderBg: string;
  colorPrimaryBg: string;
  colorDarkGray: string;
  colorLightGray: string;
  colorTitleGray: string;
  colorBoxShadow: string;
  colorsGradient: string;

  headerHeight: string;
  footerHeight: string;
  contentPaddingVertical: string;

  borderRadiusXL: string;
};

export const layout = (darkMode: boolean): ILayout => {
  return {
    colorHeaderBg: darkMode ? '#202020' : '#f0f2f5',
    colorPrimaryBg: darkMode ? ColorPalette.primaryColor.dark : ColorPalette.primaryColor.light,
    colorDarkGray: '#6b6b6b',
    colorLightGray: '#e6e6e6',
    colorTitleGray: '#8b8b8b',
    colorBoxShadow: darkMode ? rgba(0, 0, 0, 0.2) : rgba(0, 0, 0, 0.11),
    colorsGradient: '#d5b436, #ea982c, #f97838, #ff534f, #fd266e, #eb0091, #c50ab5, #8236d5',
    
    //Dimensions
    headerHeight: '60px',
    footerHeight: '80px',
    contentPaddingVertical: '20px',

    borderRadiusXL: '46px'
  };
};
