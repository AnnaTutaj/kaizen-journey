import React from 'react';
import { useIntl } from 'react-intl';
import { faBrain, faHeart, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import HomeSectionWrapper from '../HomeSectionWrapper/HomeSectionWrapper';
import {
  StyledFeatureCol,
  StyledFeatureContainer,
  StyledFeatureDescription,
  StyledFeatureIcon,
  StyledFeatureRow,
  StyledFeatureTitle
} from './styled';

export interface IFeature {
  type: 'habit' | 'gratitude' | 'friends';
  title: string;
  description: string;
  icon: IconProp;
}

const HomeFeature: React.FC = () => {
  const intl = useIntl();

  const features: IFeature[] = [
    {
      type: 'habit',
      title: intl.formatMessage({ id: 'home.feature.habit.title' }),
      description: intl.formatMessage({ id: 'home.feature.habit.description' }),
      icon: faBrain
    },
    {
      type: 'gratitude',
      title: intl.formatMessage({ id: 'home.feature.gratitude.title' }),
      description: intl.formatMessage({ id: 'home.feature.gratitude.description' }),
      icon: faHeart
    },
    {
      type: 'friends',
      title: intl.formatMessage({ id: 'home.feature.friends.title' }),
      description: intl.formatMessage({ id: 'home.feature.friends.description' }),
      icon: faUserGroup
    }
  ];

  const renderFeature = (feature: IFeature) => {
    return (
      <StyledFeatureContainer>
        <StyledFeatureIcon $type={feature.type} icon={feature.icon} />
        <StyledFeatureTitle>{feature.title}</StyledFeatureTitle>
        <StyledFeatureDescription
          dangerouslySetInnerHTML={{
            __html: feature.description
          }}
        />
      </StyledFeatureContainer>
    );
  };

  return (
    <HomeSectionWrapper
      coloredBg={true}
      title={intl.formatMessage({ id: 'home.feature.title' })}
      description={
        <>
          <div>{intl.formatMessage({ id: 'home.feature.description1' })}</div>
          <div>{intl.formatMessage({ id: 'home.feature.description2' })}</div>
        </>
      }
    >
      <StyledFeatureRow gutter={[50, 50]} justify="center">
        {features.map((f, index) => (
          <StyledFeatureCol key={index} lg={7}>
            {renderFeature(f)}
          </StyledFeatureCol>
        ))}
      </StyledFeatureRow>
    </HomeSectionWrapper>
  );
};

export default HomeFeature;
