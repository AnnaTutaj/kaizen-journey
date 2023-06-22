import Modal, { IModalProps } from '@common/components/Modal/Modal';
import { Form } from 'antd';
import { FormProps } from 'antd/es/form';
import Button from '@common/components/Button';
import { useState } from 'react';
import { StyledFooter } from './styled';

export interface IFormModalProps<T> extends FormProps<T> {
  modalProps: IModalProps;
  submitButtonText: string;
  onFinish: (values: T) => Promise<void>;
  children: JSX.Element;
}

const FormModal = <T extends {}>({ modalProps, submitButtonText, children, ...props }: IFormModalProps<T>) => {
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
    <Modal open width={500} {...modalProps}>
      <Form
        name="basic"
        form={props.form}
        initialValues={props.initialValues}
        onFinish={onFinish}
        autoComplete="off"
        layout={'vertical'}
      >
        <>
          {children}
          <StyledFooter>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={isSubmitting} disabled={isSubmitting}>
                {submitButtonText}
              </Button>
            </Form.Item>
          </StyledFooter>
        </>
      </Form>
    </Modal>
  );
};

export default FormModal;
