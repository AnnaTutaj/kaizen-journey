import { useAuth } from '@common/contexts/AuthContext';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'antd';
import React from 'react';
import styles from './FederatedLogin.module.less';

import { useIntl } from 'react-intl';

interface IProps {
  closeModal: () => void;
}

const RegisterModal: React.FC<IProps> = ({ closeModal }) => {
  const intl = useIntl();
  const { signInWithGoogle, signInWithFacebook } = useAuth();

  return (
    <>
      <Button
        onClick={() => {
          closeModal();
          signInWithFacebook();
        }}
        block
        className={styles.Button}
      >
        <FontAwesomeIcon icon={faFacebook} className={styles.Icon} />
        {intl.formatMessage({ id: 'federatedLogin.facebook' })}
      </Button>

      <Button
        onClick={() => {
          closeModal();
          signInWithGoogle();
        }}
        block
        className={styles.Button}
      >
        <FontAwesomeIcon icon={faGoogle} className={styles.Icon} />
        {intl.formatMessage({ id: 'federatedLogin.google' })}
      </Button>
    </>
  );
};

export default RegisterModal;
