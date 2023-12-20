import { createStyles } from 'antd-style';

export default createStyles(({ css }) => {
  const textContainerStyle = css`
    text-align: center;
  `;

  return {
    textContainer: css`
      ${textContainerStyle}
    `,
    contentContainer: css`
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    `,
    textContainerFooter: css`
      ${textContainerStyle}
      margin-top: 40px;
    `
  };
});
