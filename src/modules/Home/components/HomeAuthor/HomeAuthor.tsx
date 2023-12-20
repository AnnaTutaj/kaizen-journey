import React from 'react';
import Avatar from '@common/components/Avatar/Avatar';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ css }) => ({
  container: css`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
    text-align: center;
  `,
  authorDescription: css`
    font-size: 0.8rem;
  `
}));

interface IProps {
  image: string;
  name: string;
  description: string;
}

const HomeAuthor: React.FC<IProps> = ({ image, name, description }) => {
  const { styles } = useStyles();

  return (
    <div className={styles.container}>
      <Avatar size={64} src={image} />
      <div>{name}</div>

      <div className={styles.authorDescription}>{description}</div>
    </div>
  );
};

export default HomeAuthor;
