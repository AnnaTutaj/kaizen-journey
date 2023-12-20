import React from 'react';
import Spinner from '../Spinner';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ css }) => ({
  container: css`
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 100;
    transform: translate(-50%, -50%);
  `
}));

const PageLoading: React.FC = () => {
  const { styles } = useStyles();
  return (
    <div className={styles.container}>
      <Spinner />
    </div>
  );
};

export default PageLoading;
