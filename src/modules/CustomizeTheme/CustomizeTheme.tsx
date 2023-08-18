import React, { useContext } from 'react';
import { Col, ConfigProvider, Form, Popover, Row, Space } from 'antd';
import { useIntl } from 'react-intl';
import { HexColorPicker } from 'react-colorful';
import {
  StyledColorBox,
  StyledColorContainer,
  StyledFormContainer,
  StyledFormItemValue,
  StyledHexColorInput
} from './styled';
import { DarkModeContext } from '@common/contexts/DarkMode/DarkModeContext';
import { useAuth } from '@common/contexts/AuthContext';
import { antdThemeComponents, antdThemeToken } from '@common/containers/App/antdThemeToken';
import StyledTheme from '@common/containers/App/StyledTheme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from '@common/components/Button/Button';
import { useTheme } from 'styled-components';
import FormWrapper from '@common/components/FormWrapper/FormWrapper';
import useErrorMessage from '@common/hooks/useErrorMessage';
import { IUserTheme } from '@common/contexts/UserProfile/UserProfileContext';
interface ICustomizeThemeFormModel {
  colorPrimary: string;
}

const CustomizeTheme: React.FC = () => {
  const intl = useIntl();
  const theme = useTheme();
  const { updateProfileTheme } = useAuth();
  const { showError } = useErrorMessage();

  const [form] = Form.useForm();
  const { darkMode } = useContext(DarkModeContext);

  const colorPrimaryValue = Form.useWatch('colorPrimary', form);

  const customizedStyles: IUserTheme = {
    colorPrimary: colorPrimaryValue
  };

  const onFinish = async (values: ICustomizeThemeFormModel) => {
    try {
      /* todo:
        - send only changed colors to updateProfileTheme
        - add "Reset" above changed color
        - add more components to preview + style that view
        - center label  
        - add more colors to change
      */

      await updateProfileTheme({ theme: { ...values } });
    } catch (error) {
      showError(error);
    }
  };

  return (
    <>
      <Row gutter={[20, 20]}>
        <Col flex="300px">
          <StyledFormContainer>
            <FormWrapper
              name="CustomizeThemeForm"
              initialValues={{ colorPrimary: theme.antd.colorPrimary }}
              layout={'horizontal'}
              onFinish={onFinish}
              form={form}
              submitButtonText={intl.formatMessage({ id: 'customizeTheme.form.submitButton' })}
            >
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, curValues) => prevValues.colorPrimary !== curValues.colorPrimary}
              >
                {({ setFieldValue }) => {
                  return (
                    <Form.Item
                      label={intl.formatMessage({ id: 'customizeTheme.form.colorPrimary' })}
                      name="colorPrimary"
                    >
                      <Popover
                        placement="bottomLeft"
                        content={
                          <Space size={10} direction="vertical">
                            <HexColorPicker
                              color={colorPrimaryValue}
                              onChange={(newColor) => setFieldValue('colorPrimary', newColor)}
                            />
                            <StyledHexColorInput
                              prefixed
                              color={colorPrimaryValue}
                              onChange={(newColor) => setFieldValue('colorPrimary', newColor)}
                            />
                          </Space>
                        }
                        trigger="click"
                      >
                        <StyledFormItemValue>
                          <StyledColorContainer>
                            <StyledColorBox $color={colorPrimaryValue} />
                            <span>{colorPrimaryValue}</span>
                          </StyledColorContainer>
                        </StyledFormItemValue>
                      </Popover>
                    </Form.Item>
                  );
                }}
              </Form.Item>
            </FormWrapper>
          </StyledFormContainer>
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
              <Space size={[10, 10]} wrap>
                <Button
                  type="primary"
                  icon={<FontAwesomeIcon icon={faPlus} />}
                  text={intl.formatMessage({ id: 'customizeTheme.primaryButton' })}
                />

                <Button type="primary" ghost>
                  {intl.formatMessage({ id: 'customizeTheme.primaryButton' })}
                </Button>
              </Space>
            </StyledTheme>
          </ConfigProvider>
        </Col>
      </Row>
    </>
  );
};

export default CustomizeTheme;
