import { Form, Input } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import FormModal from '@common/components/FormModal';
import Select from '@common/components/Select/Select';
import { CategoryColorType } from '@common/containers/App/ColorPalette';
import { maxDescriptionLength, maxTitleLength } from '@modules/Gratitude/models/GratitudeFormModel';
import { IGratitudeTemplateCreateForm } from '@common/models/GratitudeTemplateModel';

export interface IGratitudeTemplateCreateModalProps {
  onFinish: (values: IGratitudeTemplateCreateForm) => Promise<void>;
  handleCancel: () => void;
}

const { TextArea } = Input;

const GratitudeTemplateCreateModal: React.FC<IGratitudeTemplateCreateModalProps> = ({ onFinish, handleCancel }) => {
  const intl = useIntl();
  const [form] = Form.useForm<IGratitudeTemplateCreateForm>();

  const maxNameLength = 100;

  return (
    <FormModal<IGratitudeTemplateCreateForm>
      name="gratitudeTemplateCreate"
      modalProps={{
        title: intl.formatMessage({ id: 'gratitudeTemplate.form.title' }),
        onCancel: handleCancel,
        width: 400
      }}
      form={form}
      onFinish={onFinish}
      initialValues={{
        isPublic: false
      }}
    >
      <>
        <Form.Item
          label={intl.formatMessage({ id: 'gratitudeTemplate.form.field.name' })}
          name="templateName"
          rules={[
            { required: true, message: intl.formatMessage({ id: 'common.form.field.required.error' }) },
            {
              max: maxNameLength,
              message: intl.formatMessage({ id: 'common.form.field.max.error' }, { max: maxNameLength })
            }
          ]}
        >
          <Input showCount maxLength={maxTitleLength} />
        </Form.Item>

        <Form.Item
          label={intl.formatMessage({ id: 'gratitude.form.field.title' })}
          name="title"
          rules={[
            {
              max: maxTitleLength,
              message: intl.formatMessage({ id: 'common.form.field.max.error' }, { max: maxTitleLength })
            }
          ]}
        >
          <Input showCount maxLength={maxTitleLength} />
        </Form.Item>

        <Form.Item
          label={intl.formatMessage({ id: 'gratitude.form.field.description' })}
          name="description"
          rules={[
            {
              max: maxDescriptionLength,
              message: intl.formatMessage({ id: 'common.form.field.max.error' }, { max: maxDescriptionLength })
            }
          ]}
        >
          <TextArea autoSize showCount maxLength={maxDescriptionLength} />
        </Form.Item>
        <Form.Item label={intl.formatMessage({ id: 'common.form.field.tags' })} name="tags">
          <Select<string[]>
            type="tag"
            mode="tags"
            style={{ width: '100%' }}
            tokenSeparators={['#', ' ']}
            onChange={(value) => form.setFieldsValue({ tags: value.map((i) => i.toLowerCase()) })}
          />
        </Form.Item>
        <Form.Item label={intl.formatMessage({ id: 'common.form.field.category' })} name="color">
          <Select<CategoryColorType> type="category" />
        </Form.Item>
        <Form.Item label={intl.formatMessage({ id: 'common.form.field.visibility' })} name="isPublic">
          <Select<boolean> type="visibility" />
        </Form.Item>
      </>
    </FormModal>
  );
};

export default GratitudeTemplateCreateModal;
