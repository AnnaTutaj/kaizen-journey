import { Form, Input } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import { useAuth } from '@common/contexts/AuthContext';
import Button from '@common/components/Button';
import { useNavigate } from 'react-router-dom';
import { Paths } from '@common/constants/Paths';
import { Mode } from '../AuthModal';
import useErrorMessage from '@common/hooks/useErrorMessage';
import useStyles from '../useStyles';

export interface ILoginWithEmailFormProps {
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
  showResetPassword: (email?: string) => void;
}

interface ILoginWithEmailFormModelProps {
  email: string;
  password: string;
}

const LoginWithEmailForm: React.FC<ILoginWithEmailFormProps> = ({ setMode, showResetPassword }) => {
  const intl = useIntl();
  const { styles } = useStyles();
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showError } = useErrorMessage();
  const [form] = Form.useForm<ILoginWithEmailFormModelProps>();

  const onFinish = async (values: ILoginWithEmailFormModelProps) => {
    try {
      if (login) {
        await login(values.email, values.password);
      }
      navigate(Paths.Habit);
    } catch (error) {
      showError(error);
    }
  };

  return (
    <Form
      name="LoginWithEmailForm"
      initialValues={{}}
      onFinish={onFinish}
      autoComplete="off"
      layout={'vertical'}
      form={form}
    >
      <Form.Item
        label={intl.formatMessage({ id: 'loginWithEmail.form.field.email' })}
        name="email"
        rules={[{ required: true, message: intl.formatMessage({ id: 'common.form.field.required.error' }) }]}
      >
        <Input type="email" />
      </Form.Item>
      <Form.Item label={intl.formatMessage({ id: 'loginWithEmail.form.field.password' })}>
        <Form.Item
          noStyle
          name="password"
          rules={[{ required: true, message: intl.formatMessage({ id: 'common.form.field.required.error' }) }]}
        >
          <Input.Password />
        </Form.Item>
        <Button type="link" size="small" onClick={() => showResetPassword(form.getFieldValue('email'))}>
          {intl.formatMessage({ id: 'loginWithEmail.form.forgotPassowrdLink' })}
        </Button>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          {intl.formatMessage({ id: 'loginWithEmail.form.submit' })}
        </Button>
      </Form.Item>
      <div className={styles.contentContainer}>
        <div className={styles.textContainer}>
          {intl.formatMessage(
            { id: 'loginWithEmail.form.signUpText' },
            {
              link: (
                <Button type="link" size="small" onClick={() => setMode(Mode.register)}>
                  {intl.formatMessage({ id: 'loginWithEmail.form.signUpLink' })}
                </Button>
              )
            }
          )}
        </div>
        <div className={styles.textContainerFooter}>
          {intl.formatMessage(
            { id: 'loginWithEmail.form.federatedLoginText' },
            {
              link: (
                <Button type="link" size="small" onClick={() => setMode(Mode.login)}>
                  {intl.formatMessage({ id: 'loginWithEmail.form.federatedLoginLink' })}
                </Button>
              )
            }
          )}
        </div>
      </div>
    </Form>
  );
};

export default LoginWithEmailForm;
