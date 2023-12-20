import React from 'react';
import { useStylesDot, useStylesSpinner } from './useStyles';

export type SpinnerSize = 'small' | 'middle' | 'large';
export interface ISpinnerProps {
  size?: SpinnerSize;
}

const Spinner: React.FC<ISpinnerProps> = ({ size = 'large' }) => {
  const count = 4;
  const { styles: stylesSpinner } = useStylesSpinner({ size });

  return (
    <div className={stylesSpinner.spinner}>
      {[...Array(count)].map((value, index) => {
        const { styles } = useStylesDot({ index: index + 1, size });
        return <span className={styles.dot} key={index} />;
      })}
    </div>
  );
};

export default Spinner;
