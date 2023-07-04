import { Form, Input, message } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import { FirebaseError } from '@firebase/util';
import { Language, useAuth } from '@common/contexts/AuthContext';
import FormModal from '@common/components/FormModal';
import Select, { Option } from '@common/components/Select/Select';

export interface ISettingsModalProps {
  handleCancel: () => void;
}

interface ISettingsFormProps {
  username: string;
  language: Language;
  tags: string[];
}

const SettingsModal: React.FC<ISettingsModalProps> = ({ handleCancel }) => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const { updateProfileSettings, userProfile } = useAuth();

  const onFinish = async (values: ISettingsFormProps) => {
    try {
      await updateProfileSettings(values);
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
    <FormModal
      modalProps={{ title: intl.formatMessage({ id: 'settings.form.title' }), onCancel: handleCancel, width: 400 }}
      form={form}
      initialValues={{ username: userProfile.username, language: userProfile.language, tags: userProfile.tags }}
      onFinish={onFinish}
      submitButtonText={intl.formatMessage({ id: 'settings.form.submit' })}
    >
      <>
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
      </>
    </FormModal>
  );
};

export default SettingsModal;
