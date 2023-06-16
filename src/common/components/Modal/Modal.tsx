import { ModalProps } from 'antd/es/modal';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { StyledCloseIcon, StyledModal } from './styled';

export interface IModalProps extends ModalProps {}

const Modal: React.FC<IModalProps> = (props) => (
  <StyledModal closeIcon={<StyledCloseIcon icon={faTimes} />} footer={false} maskClosable={false} {...props} />
);

export default Modal;
