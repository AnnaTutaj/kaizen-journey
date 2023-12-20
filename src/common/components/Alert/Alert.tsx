import { Alert as AntDAlert, AlertProps } from 'antd';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import useStyles from './useStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface IAlertProps extends AlertProps {}

const Alert: React.FC<IAlertProps> = (props) => {
  const { styles } = useStyles();
  return <AntDAlert closeIcon={<FontAwesomeIcon className={styles.closeIcon} icon={faTimes} />} {...props} />;
};

export default Alert;
