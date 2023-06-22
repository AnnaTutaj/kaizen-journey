import { createGlobalStyle } from 'styled-components';

export const ImagePreviewCn = 'ImagePreviewCn';

export const GlobalStyle = createGlobalStyle`
  .${ImagePreviewCn} {
    min-width: 25px;
    max-width: 250px;
    max-height: ${({ theme }) => `calc(100vh - ${theme.layout.headerHeight} - 10px)`};
    object-fit: cover;
    }
`;
