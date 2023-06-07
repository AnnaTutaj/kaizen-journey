import { Form, Input, Divider, message } from 'antd';
import React from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useIntl } from 'react-intl';
import FederatedLogin from '../FederatedLogin';
import { serverTimestamp, doc, setDoc } from 'firebase/firestore';
import { db } from '@common/util/firebase';
import { FirebaseError } from '@firebase/util';
import Modal from '@common/components/Modal';
import { useSelector } from 'react-redux';
import { ILayoutOwnState } from '@common/redux/modules/Layout/LayoutInterface';
import Button from '@common/components/Button';
import MascotWelcomeImage from '../MascotWelcomeImage/MascotWelcomeImage';
import { useNavigate } from 'react-router-dom';
import { Paths } from '@common/constants/Paths';

export interface IRegisterModalProps {
  handleCancel: () => void;
}

interface IRegisterFormProps {
  username: string;
  email: string;
  password: string;
}

const RegisterModal: React.FC<IRegisterModalProps> = ({  handleCancel }) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const auth = getAuth();
  const siteLanguage = useSelector(({ layout }: ILayoutOwnState) => layout.siteLanguage);

  const onFinish = async (values: IRegisterFormProps) => {
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
    <Modal title={intl.formatMessage({ id: 'register.form.title' })} open={true} onCancel={handleCancel} width={400}>
      <Form name="basic" initialValues={{}} onFinish={onFinish} autoComplete="off" layout={'vertical'}>
        <MascotWelcomeImage />
        <Form.Item
          label={intl.formatMessage({ id: 'register.form.field.username' })}
          name="username"
          rules={[{ required: true, message: intl.formatMessage({ id: 'common.form.field.required.error' }) }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={intl.formatMessage({ id: 'register.form.field.email' })}
          name="email"
          rules={[{ required: true, message: intl.formatMessage({ id: 'common.form.field.required.error' }) }]}
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item
          label={intl.formatMessage({ id: 'register.form.field.password' })}
          name="password"
          rules={[{ required: true, message: intl.formatMessage({ id: 'common.form.field.required.error' }) }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            {intl.formatMessage({ id: 'register.form.submit' })}
          </Button>
        </Form.Item>

        <Divider>{intl.formatMessage({ id: 'common.or' })}</Divider>

        <FederatedLogin closeModal={handleCancel} />
      </Form>
    </Modal>
  );
};

export default RegisterModal;
