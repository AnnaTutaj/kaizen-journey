import { createStyles } from 'antd-style';

const gradientColors =
  '#f28d77, #eb8078, #e27379, #d7677b, #cb5c7e, #bd5380, #ad4b82, #9c4484, #893f85, #743b85, #5c3884, #413582';
const homeHeaderGradient = `radial-gradient(circle at 80% 10%, ${gradientColors})`;
const homeEndingGradient = `radial-gradient(circle at 10% 80%, ${gradientColors})`;

export default createStyles(({ css, token }) => {
  return {
  headerContainer: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100vh - ${token.layout.headerHeight});
    min-height: 450px;
    padding: 30px;
    color: ${token.colorWhite};
    text-align: center;
    background: ${homeHeaderGradient};
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
    font-size: clamp(40px, min(10vw, 10vh), 90px);
    letter-spacing: 0.1em;
  `,
  headerSubtitle: css`
    margin-bottom: 40px;
    font-size: 1.5rem;
    letter-spacing: 0.1em;
  `,
  contentContainer: css`
    scroll-margin-top: ${token.layout.headerHeight};
  `,
  endingTitle: css`
    margin-bottom: 20px;
    font-size: 1.7em;
  `,
  logoImage: css`
    height: 200px;

    @media (width <= 768px) {
      height: 150px;
    }
  `,
  headerKaizenJourneySpace: css`
    margin-bottom: 20px;
  `
}});
