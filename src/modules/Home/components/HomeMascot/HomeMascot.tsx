import React from 'react';
import { useIntl } from 'react-intl';
import image from '@assets/mascot_map.svg';
import HomeSectionWrapper from '../HomeSectionWrapper/HomeSectionWrapper';
import { StyledImage } from './styled';

const HomeMascot: React.FC = () => {
  const intl = useIntl();

  return (
    <HomeSectionWrapper
      coloredBg={true}
      title={intl.formatMessage({ id: 'home.mascot.title' })}
      description={
        <>
          <div>{intl.formatMessage({ id: 'home.mascot.description1' })}</div>
          <div>{intl.formatMessage({ id: 'home.mascot.description2' })}</div>
        </>
      }
    >
      <StyledImage src={image} alt="Kaizen Journey Mascot" />
    </HomeSectionWrapper>
  );
};

export default HomeMascot;
