import Modal, { IModalProps } from '@common/components/Modal/Modal';
import { Form } from 'antd';
import { FormProps } from 'antd/es/form';
import Button from '@common/components/Button';
import { useState } from 'react';
import { createStyles } from 'antd-style';
import { useIntl } from 'react-intl';

const useStyles = createStyles(({ css }) => ({
  footer: css`
    display: flex;
    justify-content: flex-end;
  `
}));

export interface IFormModalProps<T> extends FormProps<T> {
  modalProps: IModalProps;
  submitButtonText?: string;
  onFinish: (values: T) => Promise<void>;
  children: JSX.Element;
  name: string;
}

const FormModal = <T extends Record<string, any>>({
  modalProps,
  submitButtonText,
  children,
  onFinish,
  name,
  ...props
}: IFormModalProps<T>) => {
  const intl = useIntl();
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
      <Form name={name} onFinish={handleOnFinish} autoComplete="off" layout={'vertical'} {...props}>
        <>
          {children}
          <div className={styles.footer}>
            <Button type="primary" htmlType="submit" loading={isSubmitting} disabled={isSubmitting}>
              {submitButtonText || intl.formatMessage({ id: 'common.save' })}
            </Button>
          </div>
        </>
      </Form>
    </Modal>
  );
};

export default FormModal;
