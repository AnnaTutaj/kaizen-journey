import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert as AntDAlert, AlertProps } from 'antd';
import styles from './Alert.module.less';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export interface IAlertProps extends AlertProps {}

const Alert: React.FC<IAlertProps> = (props) => (
  <AntDAlert closeIcon={<FontAwesomeIcon icon={faTimes} className={styles.CloseIcon} />} {...props} />
);

export default Alert;
