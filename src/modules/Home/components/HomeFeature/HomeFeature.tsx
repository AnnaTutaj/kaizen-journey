import React from 'react';
import { Row, Col } from 'antd';
import { useIntl } from 'react-intl';
import styles from './HomeFeature.module.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain, faHeart, faUserGroup } from '@fortawesome/free-solid-svg-icons';

import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface IFeature {
  title: string;
  description: string;
  icon: IconProp;
}

const HomeFeature: React.FC = () => {
  const intl = useIntl();

  const features = [
    {
      title: intl.formatMessage({ id: 'home.feature.habit.title' }),
      description: intl.formatMessage({ id: 'home.feature.habit.description' }),
      icon: faBrain
    },
    {
      title: intl.formatMessage({ id: 'home.feature.gratitude.title' }),
      description: intl.formatMessage({ id: 'home.feature.gratitude.description' }),
      icon: faHeart
    },
    {
      title: intl.formatMessage({ id: 'home.feature.friends.title' }),
      description: intl.formatMessage({ id: 'home.feature.friends.description' }),
      icon: faUserGroup
    }
  ];

  const renderFeature = (feature: IFeature) => {
    return (
      <div className={styles.FeatureContainer}>
        <FontAwesomeIcon className={styles.FeatureIcon} icon={feature.icon} />
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
    <Row gutter={[50, 50]} justify="center" align="top" className={styles.FeatureRow}>
      {features.map((f, index) => (
        <Col key={index} lg={7} className={styles.FeatureCol}>
          {renderFeature(f)}
        </Col>
      ))}
    </Row>
  );
};

export default HomeFeature;
