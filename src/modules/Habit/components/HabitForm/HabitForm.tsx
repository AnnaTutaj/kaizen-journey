import React from 'react';
import { useIntl } from 'react-intl';
import { Form, Input } from 'antd';
import { IHabitFormModel } from '@modules/Habit/models/HabitFormModel';
import { CategoryColorType } from '@common/containers/App/ColorPalette';
import Select from '@common/components/Select';
import FormModal from '@common/components/FormModal';

const { TextArea } = Input;

interface IProps {
  title: string;
  initialValues: Partial<IHabitFormModel>;
  onFinish: (values: IHabitFormModel) => Promise<void>;
  handleCancel: () => void;
}

const HabitForm: React.FC<IProps> = ({ title, initialValues, onFinish, handleCancel }) => {
  const intl = useIntl();
  const [form] = Form.useForm();

  const maxNameLength = 100;
  const maxDescriptionLength = 250;

  return (
    <FormModal<IHabitFormModel>
      name="habitForm"
      modalProps={{ title, onCancel: handleCancel }}
      form={form}
      initialValues={initialValues}
      onFinish={onFinish}
    >
      <>
        <Form.Item
          label={intl.formatMessage({ id: 'habit.form.field.name' })}
          name="name"
          rules={[
            { required: true, message: intl.formatMessage({ id: 'common.form.field.required.error' }) },
            {
              max: maxNameLength,
              message: intl.formatMessage({ id: 'common.form.field.max.error' }, { max: maxNameLength })
            }
          ]}
        >
          <Input
            showCount
            maxLength={maxNameLength}
            placeholder={intl.formatMessage({ id: 'habit.form.field.name.placeholder' })}
          />
        </Form.Item>

        <Form.Item
          label={intl.formatMessage({ id: 'habit.form.field.description' })}
          name="description"
          rules={[
            {
              max: maxDescriptionLength,
              message: intl.formatMessage({ id: 'common.form.field.max.error' }, { max: maxDescriptionLength })
            }
          ]}
        >
          <TextArea
            autoSize
            showCount
            maxLength={maxDescriptionLength}
            placeholder={intl.formatMessage({ id: 'habit.form.field.description.placeholder' })}
          />
        </Form.Item>

        <Form.Item label={intl.formatMessage({ id: 'common.form.field.color' })} name="color">
          <Select<CategoryColorType> type="color" />
        </Form.Item>

        <Form.Item label={intl.formatMessage({ id: 'common.form.field.visibility' })} name="isPublic">
          <Select<boolean> type="visibility" />
        </Form.Item>
      </>
    </FormModal>
  );
};

export default HabitForm;
