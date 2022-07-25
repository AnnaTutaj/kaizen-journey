import { Space, Row, Col, Button, Divider } from 'antd';
import React, { useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';
import styles from './Home.module.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faBrain, faHeart, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import kaizenJourneyLogo from '@assets/kaizen_journey_logo.svg';
import LayoutActions from '@common/redux/modules/Layout/LayoutActions';
import { useDispatch } from 'react-redux';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface IFeature {
  title: string;
  description: string;
  icon: IconProp;
}

const Home: React.FC = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    LayoutActions.setHidePaddingAction(true)(dispatch);

    return () => {
      LayoutActions.setHidePaddingAction(false)(dispatch);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const executeScroll = () => {
    if (divRef && divRef.current) {
      divRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const onClick = () => {};

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
    <>
      <div className={styles.HeaderContainer}>
        <Space className={styles.HeaderKaizenJourney}>
          <img src={kaizenJourneyLogo} className={styles.LogoImage} alt="Kaizen Journey Logo" />
          <div className={styles.HeaderTitle}>Kaizen Journey</div>
        </Space>

        <div className={styles.HeaderSubtitle}>{intl.formatMessage({ id: 'home.header.subtitle' })}</div>
        <Space direction="vertical">
          <Button type="primary" onClick={onClick}>
            {intl.formatMessage({ id: 'home.header.button' })}
          </Button>
          {intl.formatMessage({ id: 'common.or' }).toLowerCase()}
          <Button type="text" onClick={executeScroll}>
            <Space size={10}>
              <FontAwesomeIcon icon={faChevronDown} />
              <span>{intl.formatMessage({ id: 'home.header.discoverMore' })}</span>
            </Space>
          </Button>
        </Space>
      </div>
      <div ref={divRef} className={styles.ContentDiv}>
        <section>
          <Row gutter={[50, 50]} justify="center" align="middle" className={styles.SectionFeatureContainer}>
            {features.map((f, index) => (
              <Col key={index} lg={7}>
                {renderFeature(f)}
              </Col>
            ))}
          </Row>
        </section>
        <Divider className={styles.SectionDivider} />
        <section className={styles.KaizenContainer}>
          <div className={styles.SectionHeaderTitle}>{intl.formatMessage({ id: 'home.kaizenMeaning.title' })}</div>
          <div className={styles.HeaderFontSize}>{intl.formatMessage({ id: 'home.kaizenMeaning' })}</div>
          <Space size={20}>
            <Space direction="vertical">
              <div className={styles.Kanji}>改</div>
              <div className={styles.KanjiMeaning}>Kai = {intl.formatMessage({ id: 'home.change' })}</div>
            </Space>
            <Space direction="vertical">
              <div className={styles.Kanji}>善</div>
              <div className={styles.KanjiMeaning}>Zen = {intl.formatMessage({ id: 'home.forTheBetter' })}</div>
            </Space>
          </Space>
          <div className={styles.HeaderFontSize}>{intl.formatMessage({ id: 'home.kaizenMeaning.description' })}</div>
        </section>
        <Divider className={styles.SectionDivider} />
        <section>
          <div className={styles.EndingContainer}>
            <div className={styles.SectionHeaderTitle}>{intl.formatMessage({ id: 'home.ending.title' })}</div>
            <Button type="primary" onClick={onClick}>
              {intl.formatMessage({ id: 'home.ending.button' })}
            </Button>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
