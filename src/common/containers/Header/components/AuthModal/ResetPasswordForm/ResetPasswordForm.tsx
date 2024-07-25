import { Form, Input } from 'antd';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useAuth } from '@common/contexts/AuthContext';
import Button from '@common/components/Button';
import Alert from '@common/components/Alert';
import { createStyles } from 'antd-style';

export interface IResetPasswordFormProps {
  email?: string;
}

interface IResetPasswordFormModelProps {
  email: string;
}

const ResetPasswordForm: React.FC<IResetPasswordFormProps> = ({ email }) => {
  const intl = useIntl();
  const { styles } = useStyles();
  const { resetPassword } = useAuth();
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);

  const onFinish = async (values: IResetPasswordFormModelProps) => {
    try {
      await resetPassword(values.email);
      setShowSuccessAlert(true);
    } catch (e) {
      setShowSuccessAlert(true);
    }
  };

  return (
    <Form
      name="ResetPasswordForm"
      initialValues={{ email: email }}
      onFinish={onFinish}
      autoComplete="off"
      layout={'vertical'}
    >
      {!showSuccessAlert ? (
        <>
          <div className={styles.infoContianer}>{intl.formatMessage({ id: 'resetPassword.form.info' })}</div>
          <Form.Item
            label={intl.formatMessage({ id: 'resetPassword.form.field.email' })}
            name="email"
            rules={[{ required: true, message: intl.formatMessage({ id: 'common.form.field.required.error' }) }]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {intl.formatMessage({ id: 'common.continue' })}
            </Button>
          </Form.Item>
        </>
      ) : (
        <Alert
          closable={false}
          showIcon
          description={intl.formatMessage({ id: 'resetPassword.form.successInfo' })}
          type="success"
        />
      )}
    </Form>
  );
};

const useStyles = createStyles(({ css, token }) => ({
  infoContianer: css`
    margin-bottom: ${token.margin}px;
  `
}));

export default ResetPasswordForm;
