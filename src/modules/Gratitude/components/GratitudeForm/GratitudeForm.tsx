import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { Form, Input, DatePicker, Row, Col, InputNumber } from 'antd';
import { IGratitudeFormModel } from '@modules/Gratitude/models/GratitudeFormModel';
import { CategoryColorType } from '@common/containers/App/ColorPalette';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FormModal from '@common/components/FormModal';
import Button from '@common/components/Button';
import Select from '@common/components/Select';
import { createStyles } from 'antd-style';
import { useWatch } from 'antd/es/form/Form';
import Dropdown from '@common/components/Dropdown';
import { DropdownMenuItemProps } from '@common/components/Dropdown/Dropdown';
import { faClock } from '@fortawesome/free-regular-svg-icons';

const useStyles = createStyles(({ css, token }) => ({
  iconImageRemove: css`
    cursor: pointer;

    :hover {
      color: ${token.colorErrorText};
    }
  `,
  formItemTime: css`
    width: 120px;
    margin-bottom: 0;
  `,
  timeIcon: css`
    cursor: pointer;
  `
}));

const { TextArea } = Input;

interface IProps {
  title: string;
  initialValues: Partial<IGratitudeFormModel>;
  showInactiveColors?: CategoryColorType[];
  onFinish: (values: IGratitudeFormModel) => Promise<void>;
  handleCancel: () => void;
}

const GratitudeForm: React.FC<IProps> = ({ title, initialValues, showInactiveColors, onFinish, handleCancel }) => {
  const intl = useIntl();
  const { styles } = useStyles();
  const [form] = Form.useForm();
  const imageUrls: string[] | undefined = useWatch('imageURLs', form);

  useEffect(() => {
    if (!imageUrls) {
      return;
    }

    const validUrls = imageUrls.map((url) => {
      if (url.includes('https://drive.google.com/file/d/')) {
        const splitText = url.split('/');
        return `https://drive.google.com/uc?id=${splitText[5]}`;
      }

      return url;
    });

    form.setFieldValue('imageURLs', validUrls);
  }, [imageUrls]);

  const maxTitleLength = 100;
  const maxDescriptionLength = 2500;

  const hoursSelect: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const hoursMenuItems: DropdownMenuItemProps = hoursSelect.map((i) => {
    return {
      key: i,
      item: {
        text: `${i.toString()} h`
      },
      onClick: () => {
        form.setFieldValue('hours', i);
      }
    };
  });

  const minutesSelect: number[] = [0, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
  const minutesMenuItems: DropdownMenuItemProps = minutesSelect.map((i) => {
    return {
      key: i,
      item: {
        text: `${i.toString()} m`
      },
      onClick: () => {
        form.setFieldValue('minutes', i);
      }
    };
  });

  const hoursAddonAfter = (
    <Dropdown style={{ width: 60 }} menuItems={hoursMenuItems}>
      <FontAwesomeIcon icon={faClock} className={styles.timeIcon} />
    </Dropdown>
  );

  const minutesAddonAfter = (
    <Dropdown style={{ width: 60 }} menuItems={minutesMenuItems}>
      <FontAwesomeIcon icon={faClock} className={styles.timeIcon} />
    </Dropdown>
  );

  return (
    <FormModal<IGratitudeFormModel>
      modalProps={{ title, onCancel: handleCancel }}
      form={form}
      initialValues={initialValues}
      onFinish={onFinish}
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

        <Form.Item label={intl.formatMessage({ id: 'common.form.field.category' })} name="color">
          <Select<CategoryColorType> type="category" showInactiveColors={showInactiveColors} />
        </Form.Item>

        <Form.Item label={intl.formatMessage({ id: 'gratitude.form.field.date' })} name="date">
          <DatePicker allowClear={false} />
        </Form.Item>

        <Form.Item label={intl.formatMessage({ id: 'gratitude.form.field.seconds' })}>
          <Row gutter={10}>
            <Col>
              <Form.Item label="" name="hours" className={styles.formItemTime}>
                <InputNumber min={0} max={999} suffix="h" type="number" controls={false} addonAfter={hoursAddonAfter} />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="" name="minutes" className={styles.formItemTime}>
                <InputNumber
                  min={0}
                  max={59}
                  suffix="m"
                  type="number"
                  controls={false}
                  addonAfter={minutesAddonAfter}
                />
              </Form.Item>
            </Col>
          </Row>
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
                        <Input />
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
                <Button type="dashed" onClick={() => add('')} block icon={<FontAwesomeIcon icon={faPlus} />}>
                  {intl.formatMessage({ id: 'gratitude.form.field.addLink' })}
                </Button>
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
