import { Form } from 'antd';
import { FormProps } from 'antd/es/form';
import Button from '@common/components/Button';
import { useState } from 'react';
import { StyledFooter } from './styled';

export interface IForWrapperProps<T> extends FormProps<T> {
  submitButtonText: string;
  onFinish: (values: T) => Promise<void>;
  children: JSX.Element;
}

const FormWrapper = <T extends {}>({ submitButtonText, children, ...props }: IForWrapperProps<T>) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onFinish = async (values: T) => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    await props.onFinish(values);
    setIsSubmitting(false);
  };

  return (
    <Form
      form={props.form}
      initialValues={props.initialValues}
      autoComplete="off"
      colon={false}
      {...props}
      onFinish={onFinish}
    >
      <>
        {children}
        <StyledFooter>
          <Button type="primary" htmlType="submit" loading={isSubmitting} disabled={isSubmitting}>
            {submitButtonText}
          </Button>
        </StyledFooter>
      </>
    </Form>
  );
};

export default FormWrapper;
