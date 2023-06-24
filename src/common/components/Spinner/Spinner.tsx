import React from 'react';
import { StyledDot, StyledSpinner } from './styled';

export type SpinnerSize = 'small' | 'middle' | 'large';
export interface ISpinnerProps {
  size?: SpinnerSize;
}

const Spinner: React.FC<ISpinnerProps> = ({ size = 'large' }) => {
  const count = 4;

  return (
    <StyledSpinner $size={size}>
      {[...Array(count)].map((value, index) => (
        <StyledDot key={index} $index={index +1} />
      ))}
    </StyledSpinner>
  );
};

export default Spinner;
