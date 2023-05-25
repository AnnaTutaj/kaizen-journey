import React from 'react';
import { Row, Col } from 'antd';
import { useIntl } from 'react-intl';
import styles from './HomeFeature.module.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain, faHeart, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import cn from 'classnames';
import HomeSectionWrapper from '../HomeSectionWrapper/HomeSectionWrapper';

interface IFeature {
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
      <div className={styles.FeatureContainer}>
        <FontAwesomeIcon
          className={cn(styles.FeatureIcon, {
            [styles.FeatureIconHabit]: feature.type === 'habit',
            [styles.FeatureIconGratitude]: feature.type === 'gratitude',
            [styles.FeatureIconFriends]: feature.type === 'friends'
          })}
          icon={feature.icon}
        />
        <h2 className={styles.FeatureTitle}>{feature.title}</h2>
        <div
          className={styles.FeatureDescription}
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
      <Row gutter={[50, 50]} justify="center" className={styles.FeatureRow}>
        {features.map((f, index) => (
          <Col key={index} lg={7} className={styles.FeatureCol}>
            {renderFeature(f)}
          </Col>
        ))}
      </Row>
    </HomeSectionWrapper>
  );
};

export default HomeFeature;
