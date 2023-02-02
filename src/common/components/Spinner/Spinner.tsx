import React from 'react';
import styles from './Spinner.module.less';
import cn from 'classnames';

export interface ISpinnerProps {
  size?: 'small' | 'middle' | 'large';
}

const Spinner: React.FC<ISpinnerProps> = ({ size = 'large' }) => {
  const count = 4;

  return (
    <div
      className={cn(styles.Spinner, {
        [styles.SpinnerSmall]: size === 'small',
        [styles.SpinnerMiddle]: size === 'middle',
        [styles.SpinnerLarge]: size === 'large'
      })}
    >
      {[...Array(count)].map((value, index) => (
        <span className={styles[`Dot_${index + 1}`]} key={index} />
      ))}
    </div>
  );
};

export default Spinner;
