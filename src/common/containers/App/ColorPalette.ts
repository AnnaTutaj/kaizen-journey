import { lighten, darken } from 'polished';

//styles that can be customized in the future
export const ColorPalette = {
  primaryColor: {
    main: '#8236d5',
    20: lighten(0.2, '#8236d5'),
    40: lighten(0.4, '#8236d5'),
    120: darken(0.2, '#8236d5'),
    130: darken(0.3, '#8236d5')
  },
  secondaryColor: {
    main: '#d5b436',
    20: lighten(0.2, '#d5b436'),
    40: lighten(0.4, '#d5b436'),
    120: darken(0.2, '#d5b436'),
    130: darken(0.3, '#d5b436')
  }
};
