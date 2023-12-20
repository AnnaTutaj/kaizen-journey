import { createStyles } from 'antd-style';

const useStyles = createStyles(({ css }) => ({
  empty: css`
    .ant-empty-image {
      height: max-content;
    }
  `,
  emptyImage: css`
    max-width: 100%;
    max-height: 400px;
    object-fit: cover;

    @media (width <= 1600px) {
      max-height: 350px;
    }
  `,
  emptyHeaderText: css`
    display: block;
    margin-bottom: 20px;
  `
}));

export default useStyles;
