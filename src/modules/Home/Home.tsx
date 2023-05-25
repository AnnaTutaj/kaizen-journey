import { Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import styles from './Home.module.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import kaizenJourneyLogo from '@assets/kaizen_journey_logo.svg';
import LayoutActions from '@common/redux/modules/Layout/LayoutActions';
import { useDispatch } from 'react-redux';
import { useAuth } from '@common/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Paths } from '@common/constants/Paths';
import RegisterModal, { IRegisterModalProps } from '@common/containers/Header/components/RegisterModal/RegisterModal';
import Button from '@common/components/Button';
import HomeFeature from './components/HomeFeature/HomeFeature';
import HomeKaizenMeaning from './components/HomeKaizenMeaning/HomeKaizenMeaning';
import HomeQuote from './components/HomeQuote/HomeQuote';
import HomeMascot from './components/HomeMascot/HomeMascot';

const Home: React.FC = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [registerModalConfig, setRegisterModalConfig] = useState<IRegisterModalProps>();
  const divRef = useRef<HTMLDivElement>(null);

  const { userProfile } = useAuth();

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

  const onClick = () => {
    if (userProfile.uid) {
      navigate(Paths.Support);
    } else {
      setRegisterModalConfig({
        handleCancel: () => setRegisterModalConfig(undefined),
        handleSubmit: () => {
          setRegisterModalConfig(undefined);
        }
      });
    }
  };

  return (
    <>
      <div className={styles.HeaderContainer}>
        <Space className={styles.HeaderKaizenJourney} size={16}>
          <img src={kaizenJourneyLogo} className={styles.LogoImage} alt="Kaizen Journey Logo" />
          <div className={styles.HeaderTitle}>Kaizen Journey</div>
        </Space>

        <div className={styles.HeaderSubtitle}>{intl.formatMessage({ id: 'home.header.subtitle' })}</div>
        <Space direction="vertical">
          <Button type="primary" onClick={onClick} text={intl.formatMessage({ id: 'home.header.button' })} />
          {intl.formatMessage({ id: 'common.or' }).toLowerCase()}
          <Button
            type="text"
            onClick={executeScroll}
            icon={<FontAwesomeIcon icon={faChevronDown} />}
            text={intl.formatMessage({ id: 'home.header.discoverMore' })}
          />
        </Space>
      </div>
      <div ref={divRef} className={styles.ContentDiv}>
        <HomeFeature />
        <HomeKaizenMeaning />
        <HomeMascot />
        <HomeQuote />
      </div>
      <div className={styles.EndingContainer}>
        <div className={styles.SectionEndingTitle}>{intl.formatMessage({ id: 'home.ending.title' })}</div>

        <Button type="primary" onClick={onClick}>
          {intl.formatMessage({ id: 'home.ending.button' })}
        </Button>
      </div>

      {registerModalConfig ? <RegisterModal {...registerModalConfig} /> : null}
    </>
  );
};

export default Home;
