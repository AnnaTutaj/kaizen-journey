import { createStyles } from 'antd-style';

export default createStyles(({ css }) => {
  return {
    homeContainerTwoSections: css`
      display: flex;
      flex-wrap: wrap;
      gap: 50px;
      justify-content: center;
    `
  };
});
