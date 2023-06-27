import { IUserTheme } from '@common/contexts/AuthContext';
import { lighten, darken } from 'polished';

export type ColorsCategory = {
  default: string;
  red: string;
  fuchsia: string;
  pink: string;
  purple: string;
  blue: string;
  navy: string;
  green: string;
  olive: string;
  yellow: string;
  orange: string;
  brown: string;
  gray: string;
};

export type CategoryColorType = keyof ColorsCategory;

type ColorShades = {
  main: string;
  10: string;
  20: string;
  40: string;
  120: string;
  130: string;
};

const generateColorShades = (color: string): ColorShades => {
  return {
    main: color,
    10: lighten(0.1, color),
    20: lighten(0.2, color),
    40: lighten(0.4, color),
    120: darken(0.2, color),
    130: darken(0.3, color)
  };
};

interface IColorPalette {
  primaryColor: ColorShades;
  secondaryColor: ColorShades;
  categoryColors: ColorsCategory;
  categoryColorsHover: ColorsCategory;
}

const DefaultColorPalette: IColorPalette = {
  primaryColor: generateColorShades('#8236d5'),
  secondaryColor: generateColorShades('#d5b436'),
  categoryColors: {
    default: '#86cfc4',
    red: '#b94242',
    fuchsia: '#b94290',
    pink: '#cf86b6',
    purple: '#8e86c2',
    blue: '#2ea8f5',
    navy: '#2929b9',
    green: '#2b7b23',
    olive: '#93a738',
    yellow: '#cda70e',
    orange: '#d87732',
    brown: '#bb9153',
    gray: '#8a8a8a'
  },
  categoryColorsHover: {
    default: '#9ed8cf',
    red: '#c86666',
    fuchsia: '#c866a6',
    pink: '#d89ec4',
    purple: '#a49ece',
    blue: '#57b9f7',
    navy: '#4545d5',
    green: '#3eb132',
    olive: '#b0c553',
    yellow: '#f0c725',
    orange: '#df925b',
    brown: '#c8a775',
    gray: '#a1a1a1'
  }
};

export const userColorPalette = (userTheme: IUserTheme): IColorPalette => {
  return {
    primaryColor: userTheme.colorPrimary
      ? generateColorShades(userTheme.colorPrimary)
      : DefaultColorPalette.primaryColor,
    secondaryColor: userTheme.secondaryColor
      ? generateColorShades(userTheme.secondaryColor)
      : DefaultColorPalette.secondaryColor,
    categoryColors: {
      ...DefaultColorPalette.categoryColors,
      default: userTheme.colorCategoryDefault
        ? userTheme.colorCategoryDefault
        : DefaultColorPalette.categoryColors.default
    },
    categoryColorsHover: {
      ...DefaultColorPalette.categoryColorsHover,
      default: userTheme.colorCategoryDefaultHover
        ? userTheme.colorCategoryDefaultHover
        : DefaultColorPalette.categoryColorsHover.default
    }
  };
};
