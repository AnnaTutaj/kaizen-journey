import React from 'react';
import { useIntl } from 'react-intl';
import { Form, Input, DatePicker, Row, Col } from 'antd';
import { IGratitudeFormModel } from '@modules/Gratitude/models/GratitudeFormModel';
import { CategoryColorType } from '@common/containers/App/ColorPalette';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FormModal from '@common/components/FormModal';
import Button from '@common/components/Button';
import Select from '@common/components/Select';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ css, token }) => ({
  iconImageRemove: css`
    cursor: pointer;

    :hover {
      color: ${token.colorErrorText};
    }
  `
}));

const { TextArea } = Input;

interface IProps {
  title: string;
  initialValues: Partial<IGratitudeFormModel>;
  onFinish: (values: IGratitudeFormModel) => Promise<void>;
  handleCancel: () => void;
}

const GratitudeForm: React.FC<IProps> = ({ title, initialValues, onFinish, handleCancel }) => {
  const intl = useIntl();
  const { styles } = useStyles();
  const [form] = Form.useForm();

  const maxTitleLength = 100;
  const maxDescriptionLength = 2000;

  const handleOnPaste = (e: any, filedNumber: number) => {
    const pastedText = e.clipboardData.getData('Text');
    if (pastedText.includes('https://drive.google.com/file/d/')) {
      e.preventDefault();
      const splitText = pastedText.split('/');
      const convertedUrls = form.getFieldValue('imageURLs');
      convertedUrls[filedNumber] = `https://drive.google.com/uc?id=${splitText[5]}`;
      form.setFieldValue('imageURLs', convertedUrls);
    }
  };

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
            type="tag"
            mode="tags"
            style={{ width: '100%' }}
            tokenSeparators={['#', ' ']}
            onChange={(value) => form.setFieldsValue({ tags: value.map((i) => i.toLowerCase()) })}
          />
        </Form.Item>

        <Form.Item label={intl.formatMessage({ id: 'common.form.field.color' })} name="color">
          <Select<CategoryColorType> type="color" />
        </Form.Item>

        <Form.Item label={intl.formatMessage({ id: 'gratitude.form.field.date' })} name="date">
          <DatePicker allowClear={false} />
        </Form.Item>

        <Form.Item label={intl.formatMessage({ id: 'common.form.field.visibility' })} name="isPublic">
          <Select<boolean> type="visibility" />
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
                        <Input onPaste={(e) => handleOnPaste(e, field.name)} />
                      </Form.Item>
                    </Col>
                    <Col>
                      <FontAwesomeIcon
                        className={styles.iconImageRemove}
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
