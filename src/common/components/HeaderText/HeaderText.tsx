import styles from './HeaderText.module.less';
import cn from 'classnames';
export interface IHeaderTextProps {
  text: string;
  size?: 'small';
}

const HeaderText: React.FC<IHeaderTextProps> = ({ text, size }) => {
  return <span className={cn(styles.HeaderText, { [styles.HeaderTextSmall]: size === 'small' })}>{text}</span>;
};

export default HeaderText;
