import { Modal, Form, Input, Button, Divider, message } from 'antd';
import React from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

import { useIntl } from 'react-intl';
import FederatedLogin from '../FederatedLogin';
import { serverTimestamp, doc, setDoc } from 'firebase/firestore';
import { db } from '@common/config/firebase';
import { FirebaseError } from '@firebase/util';

interface IProps {
  isModalVisible: boolean;
  handleSubmit: () => void;
  handleCancel: () => void;
}

const RegisterModal: React.FC<IProps> = ({ isModalVisible, handleSubmit, handleCancel }) => {
  const intl = useIntl();
  const auth = getAuth();

  const onFinish = async (values: any) => {
    try {
      const createdUser = await createUserWithEmailAndPassword(auth, values.email, values.password);

      const newUser = {
        username: values.username,
        createdAt: serverTimestamp()
      };

      await setDoc(doc(db, `users/${createdUser.user.uid}`), { ...newUser });

      handleSubmit();
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
    <Modal
      title={intl.formatMessage({ id: 'register.form.title' })}
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={false}
    >
      <Form name="basic" initialValues={{}} onFinish={onFinish} autoComplete="off" layout={'vertical'}>
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
          <Button type="primary" htmlType="submit">
            {intl.formatMessage({ id: 'register.form.submit' })}
          </Button>
        </Form.Item>

        <Divider>{intl.formatMessage({ id: 'register.form.or' })}</Divider>
        {/* <FederatedLogin federatedLogin={federatedLogin} /> */}
      </Form>
    </Modal>
  );
};

export default RegisterModal;
