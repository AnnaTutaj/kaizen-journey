import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import Modal from '@common/components/Modal';
import MascotWelcomeImage from '../MascotWelcomeImage/MascotWelcomeImage';
import LoginForm from './LoginForm/LoginForm';
import RegisterForm from './RegisterForm/RegisterForm';
import LoginWithEmailForm from './LoginWithEmailForm/LoginWithEmailForm';
import RegisterWithEmailForm from './RegisterWithEmailForm/RegisterWithEmailForm';
import useStyles from './useStyles';

export enum Mode {
  login = 'login',
  register = 'register',
  loginWithEmail = 'loginWithEmail',
  registerWithEmail = 'registerWithEmail'
}

export interface IAuthModalProps {
  initMode: Mode.login | Mode.register;
  handleCancel: () => void;
}

const AuthModal: React.FC<IAuthModalProps> = ({ initMode, handleCancel }) => {
  const intl = useIntl();
  const { styles } = useStyles();
  const [mode, setMode] = useState<Mode>(initMode);

  const renderContent = () => {
    switch (mode) {
      case Mode.login: {
        return <LoginForm handleCancel={handleCancel} setMode={setMode} />;
      }

      case Mode.loginWithEmail: {
        return <LoginWithEmailForm setMode={setMode} />;
      }

      case Mode.register: {
        return <RegisterForm handleCancel={handleCancel} setMode={setMode} />;
      }

      case Mode.registerWithEmail: {
        return <RegisterWithEmailForm setMode={setMode} />;
      }
    }
  };

  const title = () => {
    switch (mode) {
      case Mode.login: {
        return intl.formatMessage({ id: 'login.form.title' });
      }

      case Mode.loginWithEmail: {
        return intl.formatMessage({ id: 'loginWithEmail.form.title' });
      }

      case Mode.register: {
        return intl.formatMessage({ id: 'register.form.title' });
      }

      case Mode.registerWithEmail: {
        return intl.formatMessage({ id: 'registerWithEmail.form.title' });
      }
    }
  };

  return (
    <Modal title={title()} open={true} onCancel={handleCancel} width={400}>
      <div className={styles.contentContainer}>
        <MascotWelcomeImage />
        {renderContent()}
      </div>
    </Modal>
  );
};

export default AuthModal;
