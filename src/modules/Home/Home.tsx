import { Space, Row, Col, Button } from 'antd';
import React, { useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';
import styles from './Home.module.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import kaizenJourneyLogo from '@assets/kaizen_journey_logo.svg';
import LayoutActions from '@common/redux/modules/Layout/LayoutActions';
import { useDispatch } from 'react-redux';

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
        <Row justify="center" style={{ textAlign: 'center' }}>
          <Col md={24} className={styles.HeaderFontSize}>
            {intl.formatMessage({ id: 'home.kaizenMeaning' })}
          </Col>
          <Col span={24}>
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
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Home;
