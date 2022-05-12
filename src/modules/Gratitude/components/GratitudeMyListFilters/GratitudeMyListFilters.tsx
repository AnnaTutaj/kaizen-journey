import React from 'react';
import { useIntl } from 'react-intl';
import { Form, Select, Space, Row, Col, Divider } from 'antd';
import { IGratitudeMyListFiltersModel } from '@modules/Gratitude/models/GratitudeMyListFiltersModel';
import { CategoryColors, CategoryColorsDTO } from '@common/constants/CategoryColors';
import styles from './GratitudeMyListFilters.module.less';

const { Option } = Select;

interface IProps {
  initialValues?: Partial<IGratitudeMyListFiltersModel>;
  onFinish: (values: IGratitudeMyListFiltersModel) => void;
}

const GratitudeMyListFilters: React.FC<IProps> = ({ initialValues, onFinish }) => {
  const intl = useIntl();
  const [form] = Form.useForm();

  return (
    <Form
      name="basic"
      initialValues={initialValues}
      autoComplete="off"
      layout={'vertical'}
      onFinish={onFinish}
      form={form}
    >
      <Row gutter={30}>
        <Col lg={9} span={24}>
          <Form.Item label={intl.formatMessage({ id: 'gratitude.form.field.tags' })} name="tags">
            <Select mode="tags" style={{ width: '100%' }} tokenSeparators={['#', ' ']} onChange={() => form.submit()} />
          </Form.Item>
        </Col>
        <Col lg={9} span={24}>
          <Form.Item label={intl.formatMessage({ id: 'gratitude.form.field.color' })} name="color">
            <Select<CategoryColorsDTO> onChange={() => form.submit()}>
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
      </Row>
      <Divider />
    </Form>
  );
};

export default GratitudeMyListFilters;