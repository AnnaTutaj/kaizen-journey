import React from 'react';
import styles from './Spinner.module.less';

const Spinner: React.FC = () => {
  const count = 4;

  return (
    <div className={styles.Spinner}>
      {[...Array(count)].map((value, index) => (
        <span className={styles[`Dot_${index + 1}`]} key={index} />
      ))}
    </div>
  );
};

export default Spinner;
