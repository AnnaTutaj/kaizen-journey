import React from 'react';
import { Row, Col } from 'antd';
import { useIntl } from 'react-intl';
import styles from './HomeFeature.module.less';
import parentStyles from '@modules/Home/HomeCommon.module.less';
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
        <h2 className={styles.FeatureTitle}>
          <span className={styles.HomeGradientText}>{feature.title}</span>
        </h2>
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
    <div className={styles.HomeFeatureContainer}>
      <h2 className={parentStyles.HomeSectionTitle}>{intl.formatMessage({ id: 'home.feature.title' })}</h2>
      <div className={parentStyles.HomeSectionDescription}>
        <div>{intl.formatMessage({ id: 'home.feature.description1' })}</div>
        <div>{intl.formatMessage({ id: 'home.feature.description2' })}</div>
      </div>

      <Row gutter={[50, 50]} justify="center" align="top" className={styles.FeatureRow}>
        {features.map((f, index) => (
          <Col key={index} lg={7} className={styles.FeatureCol}>
            {renderFeature(f)}
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HomeFeature;
