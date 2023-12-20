import { createStyles } from 'antd-style';
import { homePaddingHorizontal } from '../styledHelper';

export default createStyles(
  ({ css, token }, { coloredBg, description }: { coloredBg: boolean; description: boolean }) => ({
    container: css`
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 100px ${homePaddingHorizontal};
      background-color: ${coloredBg ? token.colorPrimaryBgHover : undefined};
    `,
    title: css`
      margin-bottom: ${description ? 16 : 64}px;
      font-weight: 600;
      font-size: 1.8rem;
      letter-spacing: 0.2em;
      text-align: center;

      @media (width >= 992px) {
        font-size: 2rem;
      }
    `,
    description: css`
      margin-bottom: 64px;
      color: ${token.colorTextTertiary};
      font-size: 1.1rem;
      letter-spacing: 0.2em;
      text-align: center;
    `
  })
);
