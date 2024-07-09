import { Col, Form, Input, Row, Switch } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import { useAuth } from '@common/contexts/AuthContext';
import FormModal from '@common/components/FormModal';
import Select, { Option } from '@common/components/Select/Select';
import useErrorMessage from '@common/hooks/useErrorMessage';
import { IUserCategory, useUserProfile } from '@common/contexts/UserProfile/UserProfileContext';
import { Language } from '@common/constants/Language';
import { CategoryColorType } from '@common/containers/App/ColorPalette';
import { createStyles, useTheme } from 'antd-style';
import useCategories from '@common/hooks/useCategories';

export interface ISettingsModalProps {
  handleCancel: () => void;
}

interface ISettingsFormProps {
  username: string;
  language: Language;
  tags: string[];
  categories: IUserCategory[];
}

const SettingsModal: React.FC<ISettingsModalProps> = ({ handleCancel }) => {
  const intl = useIntl();
  const { styles } = useStyles();
  const [form] = Form.useForm();
  const { updateProfileSettings } = useAuth();
  const { userProfile } = useUserProfile();
  const { defaultCategories } = useCategories();
  const { showError } = useErrorMessage();
  const theme = useTheme();

  const getUserCategoryColors = (): IUserCategory[] => {
    return defaultCategories.map((categoryColor) => {
      const userCategory = userProfile.categories.find((i) => i.color === categoryColor.color);

      return userCategory
        ? {
            name: userCategory.name,
            isSelected: userCategory.isSelected,
            color: userCategory.color
          }
        : categoryColor;
    });
  };

  const onFinish = async (values: ISettingsFormProps) => {
    try {
      await updateProfileSettings(values);
    } catch (error) {
      showError(error);
    }
  };

  return (
    <FormModal
      modalProps={{ title: intl.formatMessage({ id: 'settings.form.title' }), onCancel: handleCancel, width: 400 }}
      form={form}
      initialValues={{
        username: userProfile.username,
        language: userProfile.language,
        tags: userProfile.tags,
        categories: getUserCategoryColors()
      }}
      onFinish={onFinish}
      submitButtonText={intl.formatMessage({ id: 'settings.form.submit' })}
    >
      <>
        <Form.Item
          label={intl.formatMessage({ id: 'settings.form.field.username' })}
          name="username"
          rules={[{ required: true, message: intl.formatMessage({ id: 'common.form.field.required.error' }) }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={intl.formatMessage({ id: 'settings.form.field.language' })}
          name="language"
          rules={[{ required: true, message: intl.formatMessage({ id: 'common.form.field.required.error' }) }]}
        >
          <Select>
            <Option value={Language.pl}>{intl.formatMessage({ id: 'common.language.polish' })}</Option>
            <Option value={Language.en}>{intl.formatMessage({ id: 'common.language.english' })}</Option>
          </Select>
        </Form.Item>

        <Form.Item label={intl.formatMessage({ id: 'settings.form.field.tags' })} name="tags">
          <Select<string[]>
            mode="tags"
            style={{ width: '100%' }}
            tokenSeparators={['#', ' ']}
            onChange={(value) => form.setFieldsValue({ tags: value.map((i) => i.toLowerCase()) })}
          />
        </Form.Item>
        <Form.List name="categories">
          {(fields, _, { errors }) => {
            return (
              <>
                {fields.map((field, index) => {
                  return (
                    <Form.Item
                      key={field.key}
                      label={index === 0 ? intl.formatMessage({ id: 'settings.form.field.categories' }) : ''}
                    >
                      <Row gutter={20} align="middle" wrap={false}>
                        <Col flex="30px">
                          <div
                            className={styles.categoryColor}
                            style={{
                              backgroundColor:
                                theme.layout.colorsCategory[
                                  form.getFieldValue(['categories', field.name]).color as CategoryColorType
                                ]
                            }}
                          />
                        </Col>
                        <Col flex={1}>
                          <Form.Item
                            name={[field.name, 'name']}
                            validateTrigger={['onChange', 'onBlur']}
                            rules={[
                              {
                                required: true,
                                whitespace: true,
                                message: intl.formatMessage({ id: 'common.form.field.required.error' })
                              }
                            ]}
                            noStyle
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col>
                          <Form.Item name={[field.name, 'isSelected']} noStyle valuePropName="checked">
                            <Switch disabled={field.name === 0} />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form.Item>
                  );
                })}
                <Form.Item>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            );
          }}
        </Form.List>
      </>
    </FormModal>
  );
};

const useStyles = createStyles(({ css, token }) => ({
  categoryColor: css`
    width: 20px;
    height: 20px;
    border-radius: ${token.borderRadiusSM}px;
  `,
  iconImageRemove: css`
    cursor: pointer;

    :hover {
      color: ${token.colorErrorText};
    }
  `
}));

export default SettingsModal;
