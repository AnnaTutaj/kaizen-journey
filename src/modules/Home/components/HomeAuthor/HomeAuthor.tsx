import React from 'react';
import styles from './HomeAuthor.module.less';
import Avatar from '@common/components/Avatar/Avatar';

interface IProps {
  image: string;
  name: string;
  description: string;
}

const HomeAuthor: React.FC<IProps> = ({ image, name, description }) => {
  return (
    <div className={styles.Container}>
      <Avatar size={64} src={image} />
      <div>{name}</div>
 
      <div className={styles.AuthorDescription}>{description}</div>
    </div>
  );
};

export default HomeAuthor;
