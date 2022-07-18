import React from 'react';
import { useIntl } from 'react-intl';
import { Form, Input, Button, DatePicker, Select, Space } from 'antd';
import Modal from '@common/components/Modal';
import { IGratitudeFormModel } from '@modules/Gratitude/models/GratitudeFormModel';
import { CategoryColors, CategoryColorsDTO } from '@common/constants/CategoryColors';
import styles from './GratitudeForm.module.less';
import { useAuth } from '@common/contexts/AuthContext';
import { faGlobe, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Visibility } from '@common/constants/Visibility';

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
  const [form] = Form.useForm();
  const { userProfile } = useAuth();

  const maxTitleLength = 100;
  const maxDescriptionLength = 2000;

  const visibilityOptions = [
    {
      type: Visibility.public,
      icon: faGlobe,
      value: true
    },
    {
      type: Visibility.private,
      icon: faLock,
      value: false
    }
  ];

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
          label={intl.formatMessage({ id: 'gratitude.form.field.title' })}
          name="title"
          rules={[
            { required: true, message: intl.formatMessage({ id: 'common.form.field.required.error' }) },
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
          <TextArea rows={3} showCount maxLength={maxDescriptionLength} />
        </Form.Item>

        <Form.Item label={intl.formatMessage({ id: 'gratitude.form.field.tags' })} name="tags">
          <Select<string[]>
            mode="tags"
            style={{ width: '100%' }}
            tokenSeparators={['#', ' ']}
            onChange={(value) => form.setFieldsValue({ tags: value.map((i) => i.toLowerCase()) })}
          >
            {userProfile?.tags.map((tag) => (
              <Option key={tag}>{tag}</Option>
            ))}
          </Select>
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

        <Form.Item label={intl.formatMessage({ id: 'common.form.field.visibility' })} name="isPublic">
          <Select<boolean>>
            {visibilityOptions.map((visibility, index) => (
              <Option key={index} value={visibility.value}>
                <Space>
                  <FontAwesomeIcon icon={visibility.icon} />
                  {intl.formatMessage({ id: `common.visibility.${visibility.type}` })}
                </Space>
              </Option>
            ))}
          </Select>
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
