import { createStyles } from 'antd-style';
import { homeBaseTextSize, homeBlockMaxWidth } from '../styledHelper';

export default createStyles(({ css, cx, token }) => {
  const crouselDots = cx(css``);

  return {
    crouselDots,
    carousel: css`
      .slick-dots {
        z-index: 0 !important;
      }

      width: min(100vw, ${homeBlockMaxWidth});
      margin-bottom: 35px;
      .${crouselDots} {
        bottom: -35px;

        li button {
          width: 14px;
          height: 14px;
          background-color: ${token.layout.colorSecondary} !important;
          border-radius: 50%;
        }
      }
    `,
    quoteContainer: css`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      height: 475px;
      margin: 0 20px;
      padding: 40px;
      font-size: ${homeBaseTextSize};
      line-height: ${token.lineHeight};
      background-color: ${token.colorPrimaryBgHover};
      border-radius: ${token.layout.borderRadiusXL};
    `,
    quoteMark: css`
      color: ${token.colorPrimaryBorderHover};
      font-size: 55px;
    `
  };
});
