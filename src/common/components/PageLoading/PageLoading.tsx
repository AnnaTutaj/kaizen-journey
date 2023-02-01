import React from 'react';
import Spinner from '../Spinner';
import styles from './PageLoading.module.less';

const PageLoading: React.FC = () => {
  return (
    <div className={styles.PageLoader}>
      <Spinner />
    </div>
  );
};

export default PageLoading;
