import { useAuth } from '@common/contexts/AuthContext';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useIntl } from 'react-intl';
import Button from '@common/components/Button';
import { Space } from 'antd';

interface IProps {
  closeModal: () => void;
}

const FederatedLogin: React.FC<IProps> = ({ closeModal }) => {
  const intl = useIntl();
  const { signInWithGoogle, signInWithFacebook } = useAuth();

  return (
    <Space orientation="vertical" size={16}>
      <Button
        onClick={() => {
          closeModal();
          signInWithFacebook();
        }}
        block
        icon={<FontAwesomeIcon icon={faFacebook} />}
      >
        {intl.formatMessage({ id: 'federatedLogin.facebook' })}
      </Button>

      <Button
        onClick={() => {
          closeModal();
          signInWithGoogle();
        }}
        block
        icon={<FontAwesomeIcon icon={faGoogle} />}
      >
        {intl.formatMessage({ id: 'federatedLogin.google' })}
      </Button>
    </Space>
  );
};

export default FederatedLogin;
