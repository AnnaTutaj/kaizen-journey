import React from 'react';
import { useIntl } from 'react-intl';
import { Form, Input } from 'antd';
import Modal from '@common/components/Modal';
import { IHabitFormModel } from '@modules/Habit/models/HabitFormModel';
import { CategoryColorsDTO } from '@common/constants/CategoryColors';
import Button from '@common/components/Button';
import Select from '@common/components/Select';

const { TextArea } = Input;

interface IProps {
  title: string;
  initialValues: Partial<IHabitFormModel>;
  onFinish: (values: IHabitFormModel) => void;
  handleCancel: () => void;
}

const HabitForm: React.FC<IProps> = ({ title, initialValues, onFinish, handleCancel }) => {
  const intl = useIntl();
  const [form] = Form.useForm();

  const maxNameLength = 100;
  const maxDescriptionLength = 250;

  return (
    <Modal title={title} open onCancel={handleCancel} width={500}>
      <Form
        name="basic"
        form={form}
        initialValues={initialValues}
        onFinish={onFinish}
        autoComplete="off"
        layout={'vertical'}
      >
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
            rows={2}
            showCount
            maxLength={maxDescriptionLength}
            placeholder={intl.formatMessage({ id: 'habit.form.field.description.placeholder' })}
          />
        </Form.Item>

        <Form.Item label={intl.formatMessage({ id: 'common.form.field.color' })} name="color">
          <Select<CategoryColorsDTO> type="color" />
        </Form.Item>

        <Form.Item label={intl.formatMessage({ id: 'common.form.field.visibility' })} name="isPublic">
          <Select<boolean> type="visibility" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {intl.formatMessage({ id: 'habit.form.submit' })}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default HabitForm;
