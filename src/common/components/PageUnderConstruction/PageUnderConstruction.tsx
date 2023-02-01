import React from 'react';
import image from '@assets/under_construction.svg';
import { Image, Space } from 'antd';
import { Typography } from 'antd';
import { useIntl } from 'react-intl';
import styles from './PageUnderConstruction.module.less';
import PageLoading from '../PageLoading';
import Spinner from '../Spinner';

const { Title } = Typography;

interface IProps {
  title: string;
}
const PageUnderConstruction: React.FC<IProps> = ({ title }) => {
  const intl = useIntl();

  return (
    <>
      <Space align="center" direction="vertical" size={30} className={styles.SpaceContainer}>
        <PageLoading />
        <Title level={3}>{title}</Title>
        <Image className={styles.Image} src={image} alt="Under construction" preview={false} />
        <Title level={4}>{intl.formatMessage({ id: 'pageUnderConstruction.title' })}</Title>
      </Space>
      <Spinner />
    </>
  );
};

export default PageUnderConstruction;
