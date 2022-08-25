import { Form, Input, Divider, message } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import FederatedLogin from '../FederatedLogin';
import { FirebaseError } from '@firebase/util';
import { useAuth } from '@common/contexts/AuthContext';
import Modal from '@common/components/Modal';
import Button from '@common/components/Button';

interface IProps {
  isModalVisible: boolean;
  handleSubmit: () => void;
  handleCancel: () => void;
}

interface ILoginFormProps {
  email: string;
  password: string;
}

const LoginModal: React.FC<IProps> = ({ isModalVisible, handleSubmit, handleCancel }) => {
  const intl = useIntl();
  const { login } = useAuth();

  const onFinish = async (values: ILoginFormProps) => {
    try {
      if (login) {
        await login(values.email, values.password);
      }

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
      title={intl.formatMessage({ id: 'login.form.title' })}
      visible={isModalVisible}
      onCancel={handleCancel}
      width={400}
    >
      <Form name="basic" initialValues={{}} onFinish={onFinish} autoComplete="off" layout={'vertical'}>
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
            {intl.formatMessage({ id: 'login.form.submit' })}
          </Button>
        </Form.Item>

        <Divider>{intl.formatMessage({ id: 'common.or' }).toUpperCase()}</Divider>

        <FederatedLogin closeModal={handleCancel} />
      </Form>
    </Modal>
  );
};

export default LoginModal;
