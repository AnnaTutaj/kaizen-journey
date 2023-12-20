import React from 'react';
import { useIntl } from 'react-intl';
import { faBrain, faHeart, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import HomeSectionWrapper from '../HomeSectionWrapper/HomeSectionWrapper';
import { useMainStyles, useFeatureStyles } from './useStyles';
import { Col, Row } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface IFeature {
  type: 'habit' | 'gratitude' | 'friends';
  title: string;
  description: string;
  icon: IconProp;
}

const HomeFeature: React.FC = () => {
  const intl = useIntl();
  const { styles } = useMainStyles();

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
    const { styles: featureStyles } = useFeatureStyles({ type: feature.type });

    return (
      <div className={featureStyles.featureContainer}>
        <FontAwesomeIcon className={featureStyles.featureIcon} icon={feature.icon} />
        <h2 className={featureStyles.featureTitle}>{feature.title}</h2>
        <div
          className={featureStyles.featureDescription}
          dangerouslySetInnerHTML={{
            __html: feature.description
          }}
        />
      </div>
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
      <Row className={styles.featureRow} gutter={[50, 50]} justify="center">
        {features.map((f, index) => (
          <Col className={styles.featureCol} key={index} lg={7}>
            {renderFeature(f)}
          </Col>
        ))}
      </Row>
    </HomeSectionWrapper>
  );
};

export default HomeFeature;
