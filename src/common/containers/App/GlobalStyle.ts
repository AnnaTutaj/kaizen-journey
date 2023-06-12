import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle<{ $darkMode?: boolean }>`
  body {
    margin: 0;
    color: ${(props) => props.theme.antd.colorText};
    line-height: ${(props) => props.theme.antd.lineHeight};
    background-color: ${(props) => props.theme.antd.colorBgLayout};
  }

  h2 {
    font-weight: 500;
  }
`;

export default GlobalStyle;
