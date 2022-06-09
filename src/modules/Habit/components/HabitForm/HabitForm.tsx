import React from 'react';
import { useIntl } from 'react-intl';
import { Form, Input, Button, Switch, Select, Space } from 'antd';
import Modal from '@common/components/Modal';
import { IHabitFormModel } from '@modules/Habit/models/HabitFormModel';
import { CategoryColors, CategoryColorsDTO } from '@common/constants/CategoryColors';
import styles from './HabitForm.module.less';

const { TextArea } = Input;
const { Option } = Select;

interface IProps {
  title: string;
  initialValues: Partial<IHabitFormModel>;
  onFinish: (values: IHabitFormModel) => void;
  handleCancel: () => void;
  isUpdated?: boolean;
}

const HabitForm: React.FC<IProps> = ({ title, initialValues, onFinish, handleCancel, isUpdated }) => {
  const intl = useIntl();
  const [form] = Form.useForm();

  const maxNameLength = 100;
  const maxDescriptionLength = 250;

  return (
    <Modal title={title} visible onCancel={handleCancel} width={500}>
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

        <Form.Item label={intl.formatMessage({ id: 'habit.form.field.color' })} name="color">
          <Select<CategoryColorsDTO>>
            {Object.entries(CategoryColors).map((categoryColor, index) => (
              <Option key={index} value={categoryColor[0]}>
                <Space>
                  <div
                    className={styles.CategoryColor}
                    style={{
                      backgroundColor: categoryColor[1]
                    }}
                  ></div>
                  {intl.formatMessage({ id: `common.color.${categoryColor[0]}` })}
                </Space>
              </Option>
            ))}
          </Select>
        </Form.Item>

        {isUpdated ? (
          <Form.Item
            label={intl.formatMessage({ id: 'habit.form.field.isArchived' })}
            name="isArchived"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        ) : null}

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
