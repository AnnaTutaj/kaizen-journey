import { createStyles } from 'antd-style';

export default createStyles(({ css, token }) => ({
  ellipsisContainer: css`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  `,
  headerText: css`
    font-size: 30px;
    font-family: 'Amatic SC', cursive;
    letter-spacing: 4px;
  `,
  headerTextSmall: css`
    font-size: 18px;
  `,
  colorTextLink: css`
    color: ${token.colorText};

    &:hover {
      color: ${token.colorPrimary};
    }
  `
}));
