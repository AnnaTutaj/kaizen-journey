import React, { useContext } from 'react';
import { Col, ConfigProvider, Form, Grid, Popover, Row, Space } from 'antd';
import { useIntl } from 'react-intl';
import { HexColorInput, HexColorPicker } from 'react-colorful';
import { ThemeContext } from '@common/contexts/Theme/ThemeContext';
import { useAuth } from '@common/contexts/AuthContext';
import { antdThemeComponents, antdThemeToken } from '@common/containers/App/antdThemeToken';
import StyledTheme from '@common/containers/App/StyledTheme';
import FormWrapper from '@common/components/FormWrapper/FormWrapper';
import useErrorMessage from '@common/hooks/useErrorMessage';
import { IUserTheme, useUserProfile } from '@common/contexts/UserProfile/UserProfileContext';
import useStyles from './useStyles';
import CustomizeThemePreview from './components/CustomizeThemePreview';
import { userColorPalette } from '@common/containers/App/ColorPalette';

const { useBreakpoint } = Grid;

interface ICustomizeThemeFormModel {
  colorPrimary: string;
}

const CustomizeTheme: React.FC = () => {
  const intl = useIntl();
  const { styles, cx } = useStyles();
  const { updateProfileTheme } = useAuth();
  const { showError } = useErrorMessage();
  const { userProfile } = useUserProfile();
  const screens = useBreakpoint();

  const [form] = Form.useForm();
  const { darkMode } = useContext(ThemeContext);
  const defaultColorPalette = userColorPalette({});
  const colorPrimaryValue = Form.useWatch('colorPrimary', form);
  const colorSecondaryValue = Form.useWatch('colorSecondary', form);

  const customizedStyles: IUserTheme = {
    colorPrimary: colorPrimaryValue,
    colorSecondary: colorSecondaryValue
  };

  const onFinish = async (values: ICustomizeThemeFormModel) => {
    try {
      /* todo:
        - add more components to preview + style that view
        - add more colors to change
      */

      await updateProfileTheme({ theme: { ...values } });
    } catch (error) {
      showError(error);
    }
  };

  const reset = async (name: string) => {
    try {
      const values = { ...form.getFieldsValue() };
      delete values[name];
      await updateProfileTheme({ theme: { ...values } });
    } catch (error) {
      showError(error);
    }
  };

  const renderFormColor = (name: 'colorPrimary' | 'colorSecondary', value: string, defaultValue: string) => {
    return (
      <Form.Item noStyle shouldUpdate={(prevValues, curValues) => prevValues[name] !== curValues[name]}>
        {({ setFieldValue }) => {
          return (
            <Form.Item
              label={
                <div className={styles.formItemLabel}>
                  <div>{intl.formatMessage({ id: `customizeTheme.form.${name}` })}</div>
                  <a
                    onClick={() => reset(name)}
                    className={cx(styles.reset, {
                      [styles.showReset]: !!userProfile.theme[name] && userProfile.theme[name] !== defaultValue
                    })}
                  >
                    {intl.formatMessage({ id: 'customizeTheme.form.reset' })}
                  </a>
                </div>
              }
              name={name}
            >
              <Popover
                placement="bottomLeft"
                content={
                  <Space size={10} direction="vertical">
                    <HexColorPicker color={value} onChange={(newColor) => setFieldValue(name, newColor)} />
                    <HexColorInput
                      className={styles.hexColorInput}
                      prefixed
                      color={value}
                      onChange={(newColor) => setFieldValue(name, newColor)}
                    />
                  </Space>
                }
                trigger="click"
              >
                <div className={cx({ [styles.formItemValueToRight]: screens.sm })}>
                  <Space className={styles.colorContainer}>
                    <div className={styles.colorBox} style={{ backgroundColor: value }} />
                    <span>{value}</span>
                  </Space>
                </div>
              </Popover>
            </Form.Item>
          );
        }}
      </Form.Item>
    );
  };

  return (
    <>
      <Row gutter={[20, 20]}>
        <Col flex={screens.sm ? '400px' : 1}>
          <div className={styles.formContainer}>
            <FormWrapper
              name="CustomizeThemeForm"
              initialValues={{
                //there can't be theme.colorPrimary beceause on darkMode this color is darker
                colorPrimary: userProfile.theme.colorPrimary || defaultColorPalette.primaryColor.main,
                colorSecondary: userProfile.theme.colorSecondary || defaultColorPalette.secondaryColor.main
              }}
              layout={'horizontal'}
              onFinish={onFinish}
              form={form}
              submitButtonText={intl.formatMessage({ id: 'customizeTheme.form.submitButton' })}
              className={styles.formWrapper}
            >
              <>
                {renderFormColor('colorPrimary', colorPrimaryValue, defaultColorPalette.primaryColor.main)}
                {renderFormColor('colorSecondary', colorSecondaryValue, defaultColorPalette.secondaryColor.main)}
              </>
            </FormWrapper>
          </div>
        </Col>

        <Col flex="auto">
          <ConfigProvider
            theme={{
              hashed: false,
              token: antdThemeToken(darkMode, customizedStyles),
              components: antdThemeComponents(darkMode, customizedStyles)
            }}
          >
            <StyledTheme customizeColorsPreview={customizedStyles}>
              <CustomizeThemePreview />
            </StyledTheme>
          </ConfigProvider>
        </Col>
      </Row>
    </>
  );
};

export default CustomizeTheme;
