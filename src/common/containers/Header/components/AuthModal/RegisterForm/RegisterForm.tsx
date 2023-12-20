import { Form } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import FederatedLogin from '../FederatedLogin';
import Button from '@common/components/Button';
import { Mode } from '../AuthModal';
import useStyles from '../useStyles';

export interface IRegisterFormProps {
  handleCancel: () => void;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
}

const RegisterForm: React.FC<IRegisterFormProps> = ({ handleCancel, setMode }) => {
  const intl = useIntl();
  const { styles } = useStyles();

  return (
    <Form name="RegisterForm" layout={'vertical'}>
      <div className={styles.contentContainer}>
        <FederatedLogin closeModal={handleCancel} />
        <Button type="link" size="small" onClick={() => setMode(Mode.registerWithEmail)}>
          {intl.formatMessage({ id: 'register.form.registerWithEmailLink' })}
        </Button>
        <div className={styles.textContainerFooter}>
          {intl.formatMessage(
            { id: 'register.form.loginText' },
            {
              link: (
                <Button type="link" size="small" onClick={() => setMode(Mode.login)}>
                  {intl.formatMessage({ id: 'register.form.loginLink' })}
                </Button>
              )
            }
          )}
        </div>
      </div>
    </Form>
  );
};

export default RegisterForm;
