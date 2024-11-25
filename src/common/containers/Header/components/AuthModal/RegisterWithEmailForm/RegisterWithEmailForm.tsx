import { Form, Input } from 'antd';
import React from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useIntl } from 'react-intl';
import { serverTimestamp } from 'firebase/firestore';
import { db } from '@common/util/firebase';
import { useSelector } from 'react-redux';
import { ILayoutOwnState } from '@common/redux/modules/Layout/LayoutInterface';
import Button from '@common/components/Button';
import { useNavigate } from 'react-router-dom';
import { Paths } from '@common/constants/Paths';
import { Mode } from '../AuthModal';
import useErrorMessage from '@common/hooks/useErrorMessage';
import useStyles from '../useStyles';
import UserResource from '@common/api/UserResource';

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
  const { styles } = useStyles();
  const navigate = useNavigate();
  const auth = getAuth();
  const { showError } = useErrorMessage();
  const siteLanguage = useSelector(({ layout }: ILayoutOwnState) => layout.siteLanguage);

  const onFinish = async (values: IRegisterWithEmailFormModelProps) => {
    try {
      const createdUser = await createUserWithEmailAndPassword(auth, values.email, values.password);

      const newUser = {
        username: values.username,
        language: siteLanguage,
        createdAt: serverTimestamp()
      };

      await UserResource.setDoc(createdUser.user.uid, { ...newUser });
      navigate(Paths.Habit);
    } catch (error) {
      showError(error);
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

      <div className={styles.contentContainer}>
        <div className={styles.textContainer}>
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
        </div>
        <div className={styles.textContainerFooter}>
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
        </div>
      </div>
    </Form>
  );
};

export default RegisterWithEmailForm;
