import { Form } from 'antd';
import { FormProps } from 'antd/es/form';
import Button from '@common/components/Button';
import { useState } from 'react';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ css }) => ({
  footer: css`
    display: flex;
    justify-content: flex-end;
  `
}));

export interface IForWrapperProps<T> extends FormProps<T> {
  submitButtonText: string;
  onFinish: (values: T) => Promise<void>;
  children: JSX.Element;
}

const FormWrapper = <T extends {}>({ submitButtonText, children, ...props }: IForWrapperProps<T>) => {
  const { styles } = useStyles();
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
        <div className={styles.footer}>
          <Button type="primary" htmlType="submit" loading={isSubmitting} disabled={isSubmitting}>
            {submitButtonText}
          </Button>
        </div>
      </>
    </Form>
  );
};

export default FormWrapper;
