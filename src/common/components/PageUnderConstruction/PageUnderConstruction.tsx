import React from 'react';
import image from '@assets/mascot_map.svg';
import { Typography } from 'antd';
import { useIntl } from 'react-intl';
import PageLoading from '../PageLoading';
import Spinner from '../Spinner';
import { Space } from 'antd';
import Image from '../Image/Image';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ css }) => ({
  space: css`
    display: block;
    text-align: center;
  `,
  image: css`
    max-height: 300px;
  `
}));

const { Title } = Typography;

interface IProps {
  title: string;
}
const PageUnderConstruction: React.FC<IProps> = ({ title }) => {
  const intl = useIntl();
  const { styles } = useStyles();

  return (
    <>
      <PageLoading />
      <Space className={styles.space} align="center" orientation="vertical" size={30}>
        <Title level={3}>{title}</Title>
        <Image className={styles.image} src={image} alt="Under construction" preview={false} />
        <Title level={4}>{intl.formatMessage({ id: 'pageUnderConstruction.title' })}</Title>
      </Space>
      <Spinner />
    </>
  );
};

export default PageUnderConstruction;
