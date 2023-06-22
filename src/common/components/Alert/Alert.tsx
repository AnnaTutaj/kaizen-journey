import { Alert as AntDAlert, AlertProps } from 'antd';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { StyledCloseIcon } from './styled';

export interface IAlertProps extends AlertProps {}

const Alert: React.FC<IAlertProps> = (props) => <AntDAlert closeIcon={<StyledCloseIcon icon={faTimes} />} {...props} />;

export default Alert;
