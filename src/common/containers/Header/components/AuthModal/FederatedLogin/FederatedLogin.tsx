import { useAuth } from '@common/contexts/AuthContext';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useIntl } from 'react-intl';
import Button from '@common/components/Button';
import { StyledFullWidthSpace } from '@common/components/Space/styled';

interface IProps {
  closeModal: () => void;
}

const FederatedLogin: React.FC<IProps> = ({ closeModal }) => {
  const intl = useIntl();
  const { signInWithGoogle, signInWithFacebook } = useAuth();

  return (
    <StyledFullWidthSpace direction="vertical" size={16}>
      <Button
        onClick={() => {
          closeModal();
          signInWithFacebook();
        }}
        block
        icon={<FontAwesomeIcon icon={faFacebook} />}
        text={intl.formatMessage({ id: 'federatedLogin.facebook' })}
      />

      <Button
        onClick={() => {
          closeModal();
          signInWithGoogle();
        }}
        block
        icon={<FontAwesomeIcon icon={faGoogle} />}
        text={intl.formatMessage({ id: 'federatedLogin.google' })}
      />
    </StyledFullWidthSpace>
  );
};

export default FederatedLogin;
