import { createStyles } from 'antd-style';

const gradientColors =
  '#f28d77, #eb8078, #e27379, #d7677b, #cb5c7e, #bd5380, #ad4b82, #9c4484, #893f85, #743b85, #5c3884, #413582';
const homeHeaderGradient = `radial-gradient(circle at 80% 10%, ${gradientColors})`;
const homeEndingGradient = `radial-gradient(circle at 10% 80%, ${gradientColors})`;

const paddingHorizontal = 30;
export default createStyles(({ css, token, responsive }) => ({
  headerWapper: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100vh - ${token.layout.headerHeight});
    min-height: 450px;
    background: ${homeHeaderGradient};
    gap: 40px;
    padding: 0 ${paddingHorizontal}px;
  `,
  headerContainer: css`
    width: 100%;
    max-width: 1200px;
    overflow: hidden;
  `,
  endingContainer: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100vh - ${token.layout.headerHeight} - ${token.layout.footerHeight}px);
    min-height: 200px;
    padding: 30px;
    color: ${token.colorWhite};
    text-align: center;
    background: ${homeEndingGradient};
  `,
  headerTitle: css`
    font-weight: 900;
    font-size: 4rem;
    margin-bottom: ${token.marginSM}px;

    ${responsive.md} {
      font-size: 2.5rem;
    }

    ${responsive.sm} {
      font-size: 2rem;
    }
  `,
  headerSubtitle: css`
    margin-bottom: ${token.marginLG}px;
    font-size: 1.2rem;
  `,
  contentContainer: css`
    scroll-margin-top: ${token.layout.headerHeight};
  `,
  endingTitle: css`
    margin-bottom: 20px;
    font-size: 1.7em;
  `,
  mascotImage: css`
    width: 100%;
    max-height: 290px;
  `
}));
