import React from 'react';
import { useIntl } from 'react-intl';
import { Form, Row, Col, Divider } from 'antd';
import { IGratitudeListFiltersModel } from '@modules/Gratitude/models/GratitudeListFiltersModel';
import { CategoryColorType } from '@common/containers/App/ColorPalette';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser } from '@fortawesome/free-solid-svg-icons';
import Button from '@common/components/Button';
import Select from '@common/components/Select';

interface IProps {
  initialValues?: Partial<IGratitudeListFiltersModel>;
  onFinish: (values: IGratitudeListFiltersModel) => void;
  hideVisiblity?: boolean;
  colorMode: 'myCategory' | 'color';
}

const GratitudeListFilters: React.FC<IProps> = ({ initialValues, onFinish, hideVisiblity, colorMode }) => {
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
      <Row gutter={30} align="bottom">
        <Col lg={10} span={24}>
          <Form.Item label={intl.formatMessage({ id: 'gratitude.form.field.tags' })} name="tags">
            <Select<string[]>
              type="tag"
              mode="tags"
              style={{ width: '100%' }}
              tokenSeparators={['#', ' ']}
              onChange={(value) => {
                form.setFieldsValue({ tags: value.map((i) => i.toLowerCase()) });
                form.submit();
              }}
            />
          </Form.Item>
        </Col>
        <Col lg={7} span={24}>
          {colorMode === 'myCategory' ? (
            <Form.Item label={intl.formatMessage({ id: 'common.form.field.category' })} name="color">
              <Select<CategoryColorType> type="category" onChange={() => form.submit()} allowClear />
            </Form.Item>
          ) : (
            <Form.Item label={intl.formatMessage({ id: 'common.form.field.color' })} name="color">
              <Select<CategoryColorType> type="color" onChange={() => form.submit()} allowClear />
            </Form.Item>
          )}
        </Col>
        <Col lg={7} span={24}>
          {!hideVisiblity ? (
            <Form.Item label={intl.formatMessage({ id: 'common.form.field.visibility' })} name="isPublic">
              <Select<boolean> type="visibility" onChange={() => form.submit()} allowClear />
            </Form.Item>
          ) : null}
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
              icon={<FontAwesomeIcon icon={faEraser} />}
              text={intl.formatMessage({ id: 'common.filters.clear' })}
            />
          </Form.Item>
        </Col>
      </Row>
      <Divider />
    </Form>
  );
};

export default GratitudeListFilters;
