import { lighten, darken } from 'polished';

//styles that can be customized in the future
export const ColorPalette = {
  primaryColor: {
    main: '#8236d5',
    10: lighten(0.1, '#8236d5'),
    20: lighten(0.2, '#8236d5'),
    40: lighten(0.4, '#8236d5'),
    120: darken(0.2, '#8236d5'),
    130: darken(0.3, '#8236d5')
  },
  secondaryColor: {
    main: '#d5b436',
    10: lighten(0.1, '#d5b436'),
    20: lighten(0.2, '#d5b436'),
    40: lighten(0.4, '#d5b436'),
    120: darken(0.2, '#d5b436'),
    130: darken(0.3, '#d5b436')
  },
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

export type CategoryColorsDTO = keyof typeof ColorPalette.categoryColors;
