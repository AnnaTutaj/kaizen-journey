import { Form } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import FederatedLogin from '../FederatedLogin';
import Button from '@common/components/Button';
import { StyledContentContainer, StyledTextContainerFooter } from '../styled';
import { Mode } from '../AuthModal';

export interface IRegisterFormProps {
  handleCancel: () => void;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
}

const RegisterForm: React.FC<IRegisterFormProps> = ({ handleCancel, setMode }) => {
  const intl = useIntl();

  return (
    <Form name="RegisterForm" layout={'vertical'}>
      <StyledContentContainer>
        <FederatedLogin closeModal={handleCancel} />
        <Button type="link" size="small" onClick={() => setMode(Mode.registerWithEmail)}>
          {intl.formatMessage({ id: 'register.form.registerWithEmailLink' })}
        </Button>
        <StyledTextContainerFooter>
          {intl.formatMessage(
            { id: 'register.form.loginText' },
            {
              link: (
                <Button type="link" size="small" onClick={() => setMode(Mode.login)}>
                  {intl.formatMessage({ id: 'register.form.loginLink' })}
                </Button>
              )
            }
          )}
        </StyledTextContainerFooter>
      </StyledContentContainer>
    </Form>
  );
};

export default RegisterForm;
