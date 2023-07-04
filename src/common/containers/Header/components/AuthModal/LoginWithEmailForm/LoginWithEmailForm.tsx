import { Form, Input, message } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import { FirebaseError } from '@firebase/util';
import { useAuth } from '@common/contexts/AuthContext';
import Button from '@common/components/Button';
import { useNavigate } from 'react-router-dom';
import { Paths } from '@common/constants/Paths';
import { Mode } from '../AuthModal';
import { StyledContentContainer, StyledTextContainer, StyledTextContainerFooter } from '../styled';

export interface ILoginWithEmailFormProps {
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
}

interface ILoginWithEmailFormModelProps {
  email: string;
  password: string;
}

const LoginWithEmailForm: React.FC<ILoginWithEmailFormProps> = ({ setMode }) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const { login } = useAuth();

  const onFinish = async (values: ILoginWithEmailFormModelProps) => {
    try {
      if (login) {
        await login(values.email, values.password);
      }
      navigate(Paths.Habit);
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorMessage = intl.formatMessage({
          id: error.code,
          defaultMessage: intl.formatMessage({ id: 'common.defaultErrorMessage' })
        });
        message.error(errorMessage);
      }
    }
  };

  return (
    <Form name="LoginWithEmailForm" initialValues={{}} onFinish={onFinish} autoComplete="off" layout={'vertical'}>
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
        <Button type="link" size="small">
          {intl.formatMessage({ id: 'loginWithEmail.form.forgotPassowrdLink' })}
        </Button>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          {intl.formatMessage({ id: 'loginWithEmail.form.submit' })}
        </Button>
      </Form.Item>
      <StyledContentContainer>
        <StyledTextContainer>
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
        </StyledTextContainer>
        <StyledTextContainerFooter>
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
        </StyledTextContainerFooter>
      </StyledContentContainer>
    </Form>
  );
};

export default LoginWithEmailForm;
