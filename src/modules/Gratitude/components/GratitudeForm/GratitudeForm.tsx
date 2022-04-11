import React from 'react';
import { useIntl } from 'react-intl';
import { Modal, Form, Input, Button, DatePicker, Switch, Select, Space } from 'antd';
import { IGratitudeFormModel } from '@modules/Gratitude/models/GratitudeFormModel';
import { CategoryColors, CategoryColorsDTO } from '@common/constants/CategoryColors';
import styles from './GratitudeForm.module.less';

const { TextArea } = Input;
const { Option } = Select;

interface IProps {
  title: string;
  initialValues: Partial<IGratitudeFormModel>;
  onFinish: (values: IGratitudeFormModel) => void;
  handleCancel: () => void;
}

const GratitudeForm: React.FC<IProps> = ({ title, initialValues, onFinish, handleCancel }) => {
  const intl = useIntl();

  return (
    <Modal title={title} visible onCancel={handleCancel} footer={false} width={400}>
      <Form name="basic" initialValues={initialValues} onFinish={onFinish} autoComplete="off" layout={'vertical'}>
        <Form.Item
          label={intl.formatMessage({ id: 'gratitude.form.field.title' })}
          name="title"
          rules={[
            { required: true, message: intl.formatMessage({ id: 'common.form.field.required.error' }) },
            { max: 50, message: intl.formatMessage({ id: 'common.form.field.max.error' }, { max: 100 }) }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={intl.formatMessage({ id: 'gratitude.form.field.description' })}
          name="description"
          rules={[{ max: 5000, message: intl.formatMessage({ id: 'common.form.field.max.error' }, { max: 5000 }) }]}
        >
          <TextArea rows={2} showCount maxLength={200} />
        </Form.Item>

        <Form.Item label={intl.formatMessage({ id: 'gratitude.form.field.color' })} name="color">
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

        <Form.Item label={intl.formatMessage({ id: 'gratitude.form.field.date' })} name="date">
          <DatePicker />
        </Form.Item>

        <Form.Item
          label={intl.formatMessage({ id: 'gratitude.form.field.isPublic' })}
          name="isPublic"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {intl.formatMessage({ id: 'gratitude.form.submit' })}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default GratitudeForm;
