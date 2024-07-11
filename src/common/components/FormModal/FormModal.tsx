import Modal, { IModalProps } from '@common/components/Modal/Modal';
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

export interface IFormModalProps<T> extends FormProps<T> {
  modalProps: IModalProps;
  submitButtonText: string;
  onFinish: (values: T) => Promise<void>;
  children: JSX.Element;
}

const FormModal = <T extends {}>({
  modalProps,
  submitButtonText,
  children,
  onFinish,
  ...props
}: IFormModalProps<T>) => {
  const { styles } = useStyles();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleOnFinish = async (values: T) => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    await onFinish(values);
    setIsSubmitting(false);
  };

  return (
    <Modal open width={500} {...modalProps}>
      <Form
        name="basic"
        form={props.form}
        initialValues={props.initialValues}
        onFinish={handleOnFinish}
        autoComplete="off"
        layout={'vertical'}
        {...props}
      >
        <>
          {children}
          <div className={styles.footer}>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={isSubmitting} disabled={isSubmitting}>
                {submitButtonText}
              </Button>
            </Form.Item>
          </div>
        </>
      </Form>
    </Modal>
  );
};

export default FormModal;
