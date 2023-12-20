import { Button, Form } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import FederatedLogin from '../FederatedLogin';
import { Mode } from '../AuthModal';
import useStyles from '../useStyles';

export interface ILoginFormProps {
  handleCancel: () => void;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
}

const LoginForm: React.FC<ILoginFormProps> = ({ handleCancel, setMode }) => {
  const intl = useIntl();
  const { styles } = useStyles();

  return (
    <Form name="LoginForm" layout={'vertical'}>
      <div className={styles.contentContainer}>
        <FederatedLogin closeModal={handleCancel} />
        <Button type="link" size="small" onClick={() => setMode(Mode.loginWithEmail)}>
          {intl.formatMessage({ id: 'login.form.logInWithEmailLink' })}
        </Button>
        <div className={styles.textContainerFooter}>
          {intl.formatMessage(
            { id: 'login.form.registerText' },
            {
              link: (
                <Button type="link" size="small" onClick={() => setMode(Mode.register)}>
                  {intl.formatMessage({ id: 'login.form.registerLink' })}
                </Button>
              )
            }
          )}
        </div>
      </div>
    </Form>
  );
};

export default LoginForm;
