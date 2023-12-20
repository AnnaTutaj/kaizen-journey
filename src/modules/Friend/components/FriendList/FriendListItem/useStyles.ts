import { createStyles } from 'antd-style';

export default createStyles(({ token, css }) => ({
  listItem: css`
    margin-bottom: 16px;
    padding: 10px 16px !important;
    background-color: ${token.layout.colorHeaderBg};
    border-radius: ${token.borderRadiusLG}px;
  `,
  listItemRow: css`
    width: 100%;
  `,
  textCol: css`
    overflow: hidden;
  `
}));
