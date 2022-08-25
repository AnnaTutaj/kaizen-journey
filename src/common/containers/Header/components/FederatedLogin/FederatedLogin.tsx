import { useAuth } from '@common/contexts/AuthContext';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from './FederatedLogin.module.less';
import { useIntl } from 'react-intl';
import Button from '@common/components/Button';

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
        icon={<FontAwesomeIcon icon={faFacebook} />}
        text={intl.formatMessage({ id: 'federatedLogin.facebook' })}
      />

      <Button
        onClick={() => {
          closeModal();
          signInWithGoogle();
        }}
        block
        className={styles.Button}
        icon={<FontAwesomeIcon icon={faGoogle} />}
        text={intl.formatMessage({ id: 'federatedLogin.google' })}
      />
    </>
  );
};

export default RegisterModal;
