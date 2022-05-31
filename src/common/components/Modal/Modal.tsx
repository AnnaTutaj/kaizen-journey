import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal as AntDModal } from 'antd';
import { ModalProps } from 'antd/es/modal';
import cn from 'classnames';
import styles from './Modal.module.less';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export interface IModalProps extends ModalProps {}

const Modal: React.FC<IModalProps> = (props) => (
  <AntDModal
    closeIcon={<FontAwesomeIcon icon={faTimes} className={styles.CloseIcon} />}
    footer={false}
    maskClosable={false}
    {...props}
    className={cn(styles.Modal, props.className)}
  />
);

export default Modal;
