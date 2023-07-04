import { Form, Input, message } from 'antd';
import React from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useIntl } from 'react-intl';
import { serverTimestamp, doc, setDoc } from 'firebase/firestore';
import { db } from '@common/util/firebase';
import { FirebaseError } from '@firebase/util';
import { useSelector } from 'react-redux';
import { ILayoutOwnState } from '@common/redux/modules/Layout/LayoutInterface';
import Button from '@common/components/Button';
import { useNavigate } from 'react-router-dom';
import { Paths } from '@common/constants/Paths';
import { StyledContentContainer, StyledTextContainer, StyledTextContainerFooter } from '../styled';
import { Mode } from '../AuthModal';

export interface IRegisterWithEmailFormProps {
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
}

interface IRegisterWithEmailFormModelProps {
  username: string;
  email: string;
  password: string;
}

const RegisterWithEmailForm: React.FC<IRegisterWithEmailFormProps> = ({ setMode }) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const auth = getAuth();
  const siteLanguage = useSelector(({ layout }: ILayoutOwnState) => layout.siteLanguage);

  const onFinish = async (values: IRegisterWithEmailFormModelProps) => {
    try {
      const createdUser = await createUserWithEmailAndPassword(auth, values.email, values.password);

      const newUser = {
        username: values.username,
        language: siteLanguage,
        createdAt: serverTimestamp()
      };

      await setDoc(doc(db, `users/${createdUser.user.uid}`), { ...newUser });
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
    <Form name="RegisterWithEmailForm" initialValues={{}} onFinish={onFinish} autoComplete="off" layout={'vertical'}>
      <Form.Item
        label={intl.formatMessage({ id: 'registerWithEmail.form.field.username' })}
        name="username"
        rules={[{ required: true, message: intl.formatMessage({ id: 'common.form.field.required.error' }) }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={intl.formatMessage({ id: 'registerWithEmail.form.field.email' })}
        name="email"
        rules={[{ required: true, message: intl.formatMessage({ id: 'common.form.field.required.error' }) }]}
      >
        <Input type="email" />
      </Form.Item>

      <Form.Item
        label={intl.formatMessage({ id: 'registerWithEmail.form.field.password' })}
        name="password"
        rules={[{ required: true, message: intl.formatMessage({ id: 'common.form.field.required.error' }) }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          {intl.formatMessage({ id: 'registerWithEmail.form.submit' })}
        </Button>
      </Form.Item>

      <StyledContentContainer>
        <StyledTextContainer>
          {intl.formatMessage(
            { id: 'registerWithEmail.form.federatedRegisterText' },
            {
              link: (
                <Button type="link" size="small" onClick={() => setMode(Mode.register)}>
                  {intl.formatMessage({ id: 'registerWithEmail.form.federatedRegisterLink' })}
                </Button>
              )
            }
          )}
        </StyledTextContainer>
        <StyledTextContainerFooter>
          {intl.formatMessage(
            { id: 'registerWithEmail.form.loginText' },
            {
              link: (
                <Button type="link" size="small" onClick={() => setMode(Mode.login)}>
                  {intl.formatMessage({ id: 'registerWithEmail.form.loginLink' })}
                </Button>
              )
            }
          )}
        </StyledTextContainerFooter>
      </StyledContentContainer>
    </Form>
  );
};

export default RegisterWithEmailForm;
