import { Modal as AntdModal, ModalProps } from 'antd';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { createStyles } from 'antd-style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const useStyles = createStyles(({ css, token }) => ({
  modal: css`
    .ant-modal-content {
      border-radius: ${token.borderRadiusLG}px;
    }

    .ant-modal-header {
      border-top-left-radius: ${token.borderRadiusLG}px;
      border-top-right-radius: ${token.borderRadiusLG}px;

      .ant-modal-title {
        margin-right: 20px;
        font-size: 20px;
        text-align: center;
      }
    }
  `,
  closeIcon: css`
    font-size: 25px;
    vertical-align: -6px;
  `
}));

export interface IModalProps extends ModalProps {}

const Modal: React.FC<IModalProps> = (props) => {
  const { styles } = useStyles();

  return (
    <AntdModal
      className={styles.modal}
      closeIcon={<FontAwesomeIcon className={styles.closeIcon} icon={faTimes} />}
      footer={false}
      maskClosable={false}
      {...props}
    />
  );
};

export default Modal;
