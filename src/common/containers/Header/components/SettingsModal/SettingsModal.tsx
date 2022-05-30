import { Modal, Form, Input, Button, message } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import { FirebaseError } from '@firebase/util';
import { Language, useAuth } from '@common/contexts/AuthContext';
import { Select } from 'antd';
const { Option } = Select;

interface IProps {
  isModalVisible: boolean;
  handleSubmit: () => void;
  handleCancel: () => void;
}

interface ISettingsFormProps {
  username: string;
  language: Language;
  tags: string[];
}

const SettingsModal: React.FC<IProps> = ({ isModalVisible, handleSubmit, handleCancel }) => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const { updateProfile, userProfile } = useAuth();

  const onFinish = async (values: ISettingsFormProps) => {
    try {
      updateProfile(values);

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
      title={intl.formatMessage({ id: 'settings.form.title' })}
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={false}
      width={400}
    >
      <Form
        name="basic"
        form={form}
        initialValues={{ username: userProfile?.username, language: userProfile?.language, tags: userProfile?.tags }}
        onFinish={onFinish}
        autoComplete="off"
        layout={'vertical'}
      >
        <Form.Item
          label={intl.formatMessage({ id: 'settings.form.field.username' })}
          name="username"
          rules={[{ required: true, message: intl.formatMessage({ id: 'common.form.field.required.error' }) }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={intl.formatMessage({ id: 'settings.form.field.language' })}
          name="language"
          rules={[{ required: true, message: intl.formatMessage({ id: 'common.form.field.required.error' }) }]}
        >
          <Select>
            <Option value={Language.pl}>{intl.formatMessage({ id: 'common.language.polish' })}</Option>
            <Option value={Language.en}>{intl.formatMessage({ id: 'common.language.english' })}</Option>
          </Select>
        </Form.Item>

        <Form.Item label={intl.formatMessage({ id: 'settings.form.field.tags' })} name="tags">
          <Select<string[]>
            mode="tags"
            style={{ width: '100%' }}
            tokenSeparators={['#', ' ']}
            onChange={(value) => form.setFieldsValue({ tags: value.map((i) => i.toLowerCase()) })}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {intl.formatMessage({ id: 'settings.form.submit' })}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SettingsModal;
