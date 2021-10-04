import Icon from '@ant-design/icons/lib/components/Icon';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'antd';
import React from 'react';

import { useIntl } from 'react-intl';

interface IProps {
  federatedLogin: any;
}

const RegisterModal: React.FC<IProps> = ({ federatedLogin }) => {
  const intl = useIntl();

  return (
    <div>
      <Button onClick={() => federatedLogin('facebook')}>
        <FontAwesomeIcon icon={faFacebook} />
        <Icon name="facebook" /> Zaloguj się przez Facebook
      </Button>

      <Button onClick={() => federatedLogin('google')}>
        <FontAwesomeIcon icon={faGoogle} />
        Zaloguj się przez Google
      </Button>
    </div>
  );
};

export default RegisterModal;
