import React from 'react';
import image from '@assets/mascot_map.svg';
import { Typography } from 'antd';
import { useIntl } from 'react-intl';
import PageLoading from '../PageLoading';
import Spinner from '../Spinner';
import { StyledImage, StyledSpace } from './styled';

const { Title } = Typography;

interface IProps {
  title: string;
}
const PageUnderConstruction: React.FC<IProps> = ({ title }) => {
  const intl = useIntl();

  return (
    <>
      <PageLoading />
      <StyledSpace align="center" direction="vertical" size={30}>
        <Title level={3}>{title}</Title>
        <StyledImage src={image} alt="Under construction" preview={false} />
        <Title level={4}>{intl.formatMessage({ id: 'pageUnderConstruction.title' })}</Title>
      </StyledSpace>
      <Spinner />
    </>
  );
};

export default PageUnderConstruction;
