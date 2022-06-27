import React from 'react';
import { Button } from 'antd';
import { useIntl } from 'react-intl';
import styles from './PageError.module.less';
import HeaderText from '../HeaderText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartBroken } from '@fortawesome/free-solid-svg-icons';

interface IProps {
  onClick: () => void;
}
const PageError: React.FC<IProps> = ({ onClick }) => {
  const intl = useIntl();

  return (
    <div className={styles.PageErrorContainer}>
      <FontAwesomeIcon icon={faHeartBroken} className={styles.PageErrorIcon} />
      <HeaderText text={intl.formatMessage({ id: 'pageError.title' })} size="small" />
      <Button type="primary" onClick={onClick}>
        {intl.formatMessage({ id: 'pageError.button' })}
      </Button>
    </div>
  );
};

export default PageError;
