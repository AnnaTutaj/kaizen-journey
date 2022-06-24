import styles from './HeaderText.module.less';
import cn from 'classnames';
export interface IHeaderTextProps {
  text: string;
  size?: 'small';
  className?: string;
}

const HeaderText: React.FC<IHeaderTextProps> = ({ text, size, className }) => {
  return (
    <span className={cn(styles.HeaderText, { [styles.HeaderTextSmall]: size === 'small' }, className)}>{text}</span>
  );
};

export default HeaderText;
