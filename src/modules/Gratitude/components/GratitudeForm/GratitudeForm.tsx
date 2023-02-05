import React from 'react';
import { useIntl } from 'react-intl';
import { Form, Input, DatePicker, Select, Space, Row, Col } from 'antd';
import { IGratitudeFormModel } from '@modules/Gratitude/models/GratitudeFormModel';
import { CategoryColors, CategoryColorsDTO } from '@common/constants/CategoryColors';
import styles from './GratitudeForm.module.less';
import { useAuth } from '@common/contexts/AuthContext';
import { faPlus, faGlobe, faLock, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Visibility } from '@common/constants/Visibility';
import FormModal from '@common/components/FormModal';
import Button from '@common/components/Button';

const { TextArea } = Input;
const { Option } = Select;

interface IProps {
  title: string;
  initialValues: Partial<IGratitudeFormModel>;
  onFinish: (values: IGratitudeFormModel) => Promise<void>;
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
    <FormModal<IGratitudeFormModel>
      modalProps={{ title, onCancel: handleCancel }}
      form={form}
      initialValues={initialValues}
      onFinish={onFinish}
      submitButtonText={intl.formatMessage({ id: 'gratitude.form.submit' })}
    >
      <>
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
            {userProfile.tags.map((tag) => (
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
          <DatePicker allowClear={false} />
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

        <Form.List name="imageURLs">
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  key={field.key}
                  label={index === 0 ? intl.formatMessage({ id: 'gratitude.form.field.links' }) : ''}
                >
                  <Row gutter={20} align="middle" wrap={false}>
                    <Col flex={1}>
                      <Form.Item
                        {...field}
                        name={[field.name]}
                        validateTrigger={['onChange', 'onBlur']}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: intl.formatMessage({ id: 'common.form.field.requiredOrDelete.error' })
                          },
                          {
                            type: 'url',
                            message: intl.formatMessage({ id: 'common.form.field.url.error' })
                          }
                        ]}
                        noStyle
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col>
                      <FontAwesomeIcon
                        className={styles.IconImageRemove}
                        icon={faTrash}
                        onClick={() => remove(field.name)}
                      />
                    </Col>
                  </Row>
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<FontAwesomeIcon icon={faPlus} />}
                  text={intl.formatMessage({ id: 'gratitude.form.field.addLink' })}
                />
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
      </>
    </FormModal>
  );
};

export default GratitudeForm;
