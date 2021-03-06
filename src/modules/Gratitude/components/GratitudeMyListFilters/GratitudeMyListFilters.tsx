import React from 'react';
import { useIntl } from 'react-intl';
import { Form, Select, Space, Row, Col, Divider, Button } from 'antd';
import { IGratitudeMyListFiltersModel } from '@modules/Gratitude/models/GratitudeMyListFiltersModel';
import { CategoryColors, CategoryColorsDTO } from '@common/constants/CategoryColors';
import styles from './GratitudeMyListFilters.module.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faGlobe, faLock } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '@common/contexts/AuthContext';
import { Visibility } from '@common/constants/Visibility';

const { Option } = Select;

interface IProps {
  initialValues?: Partial<IGratitudeMyListFiltersModel>;
  onFinish: (values: IGratitudeMyListFiltersModel) => void;
}

const GratitudeMyListFilters: React.FC<IProps> = ({ initialValues, onFinish }) => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const { userProfile } = useAuth();

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
    <Form
      name="basic"
      initialValues={initialValues}
      autoComplete="off"
      layout={'vertical'}
      onFinish={onFinish}
      form={form}
    >
      <Row gutter={30} align="bottom">
        <Col lg={10} span={24}>
          <Form.Item label={intl.formatMessage({ id: 'gratitude.form.field.tags' })} name="tags">
            <Select<string[]>
              mode="tags"
              style={{ width: '100%' }}
              tokenSeparators={['#', ' ']}
              onChange={(value) => {
                form.setFieldsValue({ tags: value.map((i) => i.toLowerCase()) });
                form.submit();
              }}
            >
              {userProfile?.tags.map((tag) => (
                <Option key={tag}>{tag}</Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col lg={7} span={24}>
          <Form.Item label={intl.formatMessage({ id: 'gratitude.form.field.color' })} name="color">
            <Select<CategoryColorsDTO> onChange={() => form.submit()} allowClear>
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
        </Col>
        <Col lg={7} span={24}>
          <Form.Item label={intl.formatMessage({ id: 'common.form.field.visibility' })} name="isPublic">
            <Select<boolean> onChange={() => form.submit()} allowClear>
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
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Item>
            <Button
              onClick={() => {
                form.setFieldsValue({
                  tags: [],
                  color: undefined,
                  isPublic: undefined
                });
                form.submit();
              }}
            >
              <Space size={10}>
                <FontAwesomeIcon icon={faEraser} />
                {intl.formatMessage({ id: 'common.filters.clear' })}
              </Space>
            </Button>
          </Form.Item>
        </Col>
      </Row>
      <Divider />
    </Form>
  );
};

export default GratitudeMyListFilters;
