import React from 'react';
import useStyles from './useStyles';

interface IProps {
  coloredBg: boolean;
  title: string;
  description?: JSX.Element;
  children: JSX.Element;
}

const HomeSectionWrapper: React.FC<IProps> = ({ coloredBg, title, description, children }) => {
  const { styles } = useStyles({ coloredBg, description: !!description });

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      {description ? <div className={styles.description}>{description}</div> : null}
      {children}
    </div>
  );
};

export default HomeSectionWrapper;
