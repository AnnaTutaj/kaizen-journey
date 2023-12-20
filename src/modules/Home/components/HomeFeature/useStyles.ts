import { createStyles, keyframes } from 'antd-style';
import { homeBlockMaxWidth } from '../styledHelper';
import { IFeature } from './HomeFeature';
import { lighten } from 'polished';

export const useMainStyles = createStyles(({ css }) => {
  return {
    featureRow: css`
      &.ant-row {
        margin: 0 !important;
      }
    `,
    featureCol: css`
      display: flex;
      flex-direction: column;
      align-items: center;
    `
  };
});

export const useFeatureStyles = createStyles(({ css, token }, { type }: { type: IFeature['type'] }) => {
  const jelly = keyframes`
  0% {
    transform: scale3d(1, 1, 1);
  }

  30% {
    transform: scale3d(1.25, 0.75, 1);
  }

  40% {
    transform: scale3d(0.75, 1.25, 1);
  }

  50% {
    transform: scale3d(1.15, 0.85, 1);
  }

  65% {
    transform: scale3d(0.95, 1.05, 1);
  }

  75% {
    transform: scale3d(1.05, 0.95, 1);
  }

  100% {
    transform: scale3d(1, 1, 1);
  }
`;

  const pulse = keyframes`
  0% {
    transform: scale(1);
    transform-origin: center center;
    animation-timing-function: ease-out;
  }

  10% {
    transform: scale(0.81);
    animation-timing-function: ease-in;
  }

  17% {
    transform: scale(0.9);
    animation-timing-function: ease-out;
  }

  33% {
    transform: scale(0.77);
    animation-timing-function: ease-in;
  }

  45% {
    transform: scale(1);
    animation-timing-function: ease-out;
  }
`;

  const wobble = keyframes`
  0%,
  100% {
    transform: translateX(0%);
    transform-origin: 50% 50%;
  }

  15% {
    transform: translateX(-30px) rotate(-6deg);
  }

  30% {
    transform: translateX(15px) rotate(6deg);
  }

  45% {
    transform: translateX(-15px) rotate(-3.6deg);
  }

  60% {
    transform: translateX(9px) rotate(2.4deg);
  }

  75% {
    transform: translateX(-6px) rotate(-1.2deg);
  }
`;

  const handleType = (type: IFeature['type']) => {
    switch (type) {
      case 'habit':
        return css`
          animation: ${jelly} 2s ease 0s infinite;
        `;
      case 'gratitude':
        return css`
          animation: ${pulse} 2s ease 0s infinite;
        `;
      case 'friends':
        return css`
          animation: ${wobble} 2s ease 0s infinite;
        `;
    }
  };

  return {
    featureContainer: css`
      max-width: ${homeBlockMaxWidth};
      height: 100%;
      margin-bottom: 32px;
      padding: 80px 25px;
      text-align: center;
      background-color: ${token.colorBgLayout};
      border-radius: ${token.layout.borderRadiusXL};
      box-shadow:
        0 1px 1px ${token.layout.colorBoxShadow},
        0 2px 2px ${token.layout.colorBoxShadow},
        0 4px 4px ${token.layout.colorBoxShadow},
        0 8px 8px ${token.layout.colorBoxShadow},
        0 16px 16px ${token.layout.colorBoxShadow},
        0 32px 32px ${token.layout.colorBoxShadow};
    `,
    featureIcon: css`
      margin-bottom: 20px;
      color: ${lighten(0.1, token.colorPrimary)};
      font-size: 45px;
      ${handleType(type)}
    `,
    featureTitle: css`
      margin-bottom: 30px;
      color: ${lighten(0.1, token.colorPrimary)};
      font-weight: 600;
      font-size: 22px;
    `,

    featureDescription: css`
      font-size: 18px;
      text-align: left;

      strong {
        background: linear-gradient(45deg, ${token.layout.colorsGradient});
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    `
  };
});
