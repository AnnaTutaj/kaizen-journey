import { createStyles, keyframes } from 'antd-style';
import { SpinnerSize } from './Spinner';

const getSpinnerSize = (size: SpinnerSize) => {
  switch (size) {
    case 'small':
      return 18;

    case 'middle':
      return 24;

    case 'large':
      return 38;
  }
};

const getDotSize = (size: SpinnerSize) => {
  switch (size) {
    case 'small':
      return 3;

    case 'middle':
      return 4;

    case 'large':
      return 7;
  }
};

export const useStylesDot = createStyles(({ css, token }, { index, size }: { index: number; size: SpinnerSize }) => {
  const getColor = () => {
    switch (index) {
      case 1:
        return token.colorPrimary;

      case 2:
        return token.layout.colorTurquoise;

      case 3:
        return token.layout.colorCoral;

      case 4:
        return token.layout.colorStraw;
    }
  };

  const backGroundColor = getColor();

  const dotRotateTwoLaps = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(${360 * 2}deg);
  }
`;

  const spinnerSize = getSpinnerSize(size);
  const halfSpinnerSize = spinnerSize / 2;
  const dotSize = getDotSize(size);

  return {
    dot: css`
      position: absolute;
      transform-origin: 0 250% 0;
      transition: all 0.5s;
      animation: ${dotRotateTwoLaps} 2s both infinite;
      background-color: ${backGroundColor};
      animation-timing-function: cubic-bezier(0.25, ${0.3 * index}, 0.5, 1);
      left: ${halfSpinnerSize}px;
      width: ${dotSize}px;
      height: ${dotSize}px;
      border-radius: 50%;
    `
  };
});

export const useStylesSpinner = createStyles(({ css }, { size }: { size: SpinnerSize }) => {
  const spinnerSize = getSpinnerSize(size);
  return {
    spinner: css`
      position: relative;
      width: ${spinnerSize}px;
      height: ${spinnerSize}px;
    `
  };
});
