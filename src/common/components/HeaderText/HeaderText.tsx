import styles from './HeaderText.module.less';

export interface IHeaderTextProps {
  text: string;
}

const HeaderText: React.FC<IHeaderTextProps> = ({ text }) => {
  return <span className={styles.HeaderText}>{text}</span>;
};

export default HeaderText;
