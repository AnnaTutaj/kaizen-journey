import { createStyles } from 'antd-style';

export default createStyles(({ token, css }) => ({
  closeIcon: css`
    color: ${token.layout.colorDarkGray};
    font-size: ${token.fontSizeHeading4};
  `
}));
