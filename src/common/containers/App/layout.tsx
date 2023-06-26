import { darken, lighten, rgba } from 'polished';
import { ColorPalette, ColorsCategory } from './ColorPalette';

export type ILayout = {
  devTestColor: string;

  colorHeaderBg: string;
  colorHeaderBgSecondary: string;
  colorHeaderBgTertiary: string;
  colorPrimaryBg: string;
  colorPrimaryBgSecondary: string;
  colorPrimaryHover: string;
  colorSecondary: string;
  colorDarkGray: string;
  colorLightGray: string;
  colorTitleGray: string;
  colorStraw: string;
  colorTurquoise: string;
  colorCoral: string;
  colorBoxShadow: string;
  colorsGradient: string;
  colorsCategory: ColorsCategory;
  colorsCategoryHover: ColorsCategory;

  headerHeight: string;
  footerHeight: string;
  contentPaddingVertical: string;

  borderRadiusXL: string;
};

export const layout = (darkMode: boolean): ILayout => {
  const colorHeaderBg: string = darkMode ? '#202020' : '#f0f2f5';

  return {
    devTestColor: darkMode ? 'red' : 'blue',

    colorHeaderBg,
    colorHeaderBgSecondary: darkMode ? lighten(0.1, colorHeaderBg) : darken(0.1, colorHeaderBg),
    colorHeaderBgTertiary: darkMode ? lighten(0.01, colorHeaderBg) : '#f7f7f7',
    colorPrimaryBg: darkMode ? ColorPalette.primaryColor[130] : ColorPalette.primaryColor[40],
    colorPrimaryBgSecondary: darkMode ? ColorPalette.primaryColor[120] : ColorPalette.primaryColor[20],
    colorPrimaryHover: ColorPalette.primaryColor[10],
    colorSecondary: ColorPalette.secondaryColor.main,
    colorDarkGray: '#6b6b6b',
    colorLightGray: '#e6e6e6',
    colorTitleGray: '#8b8b8b',
    colorStraw: '#e6e167',
    colorTurquoise: '#4dccbd',
    colorCoral: '#ff8484',
    colorBoxShadow: darkMode ? rgba(0, 0, 0, 0.2) : rgba(0, 0, 0, 0.11),
    colorsGradient: '#d5b436, #ea982c, #f97838, #ff534f, #fd266e, #eb0091, #c50ab5, #8236d5',
    colorsCategory: ColorPalette.categoryColors,
    colorsCategoryHover: ColorPalette.categoryColorsHover,

    //Dimensions
    headerHeight: '60px',
    footerHeight: '80px',
    contentPaddingVertical: '20px',

    borderRadiusXL: '46px'
  };
};
