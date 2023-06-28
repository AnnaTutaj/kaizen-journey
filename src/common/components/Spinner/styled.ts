import styled, { keyframes } from 'styled-components';
import { SpinnerSize } from './Spinner';

const dotRotateTwoLaps = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(${360 * 2}deg);
  }
`;

export const StyledDot = styled.span<{ $index: number }>`
  position: absolute;
  transform-origin: 0 250% 0;
  transition: all 0.5s;
  animation: ${dotRotateTwoLaps} 2s both infinite;
  background-color: ${({ theme, $index }) => {
    switch ($index) {
      case 1:
        return theme.antd.colorPrimary;

      case 2:
        return theme.layout.colorTurquoise;

      case 3:
        return theme.layout.colorCoral;

      case 4:
        return theme.layout.colorStraw;
    }
  }};
  animation-timing-function: ${({ $index }) => `cubic-bezier(0.25, ${0.3 * $index}, 0.5, 1)`};
`;

const getSpinnerSize = ($size: SpinnerSize) => {
  switch ($size) {
    case 'small':
      return '18px';

    case 'middle':
      return '24px';

    case 'large':
      return '38px';
  }
};

const getDotSize = ($size: SpinnerSize) => {
  switch ($size) {
    case 'small':
      return '3px';

    case 'middle':
      return '4px';

    case 'large':
      return '7px';
  }
};

export const StyledSpinner = styled.div<{ $size: SpinnerSize }>`
  position: relative;
  width: ${({ $size }) => getSpinnerSize($size)};
  height: ${({ $size }) => getSpinnerSize($size)};

  ${StyledDot} {
    left: calc(${({ $size }) => getSpinnerSize($size)} / 2);
    width: ${({ $size }) => getDotSize($size)};
    height: ${({ $size }) => getDotSize($size)};
    border-radius: 50%;
  }
`;
