import React from 'react';
import styles from './HomeSectionWrapper.module.less';

interface IProps {
  coloredBg: boolean;
  title: string;
  description?: JSX.Element;
  children: JSX.Element;
}

const HomeSectionWrapper: React.FC<IProps> = ({ coloredBg, title, description, children }) => {
  return (
    <div className={coloredBg ? styles.ContainerColoredBg : styles.Container}>
      <h2 className={description ? styles.TitleWithDescription : styles.Title}>{title}</h2>
      {description ? <div className={styles.Description}>{description}</div> : null}
      {children}
    </div>
  );
};

export default HomeSectionWrapper;
