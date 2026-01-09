import { createStyles } from 'antd-style';
import { homeBaseTextSize, homeBlockMaxWidth } from '../styledHelper';

//todo: nie dzialaja te style z kropkami
export default createStyles(({ css, cx, token }) => {
  const crouselDots = cx(css``);
  const dotsMargin = 35;
  return {
    crouselDots,
    carousel: css`
      .slick-dots {
        z-index: 0 !important;
      }

      width: min(100vw, ${homeBlockMaxWidth});
      margin-bottom: ${dotsMargin}px;
      .${crouselDots} {
        bottom: -${dotsMargin}px;

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
