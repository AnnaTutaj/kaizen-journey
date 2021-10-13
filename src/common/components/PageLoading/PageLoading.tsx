import { Spin } from 'antd';
import React from 'react';
import styles from './PageLoading.module.less';

const PageLoading: React.FC = () => {
  return (
    <div className={styles.PageLoader}>
      <Spin size="large" />
    </div>
  );
};

export default PageLoading;
