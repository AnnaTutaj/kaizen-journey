import { Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import kaizenJourneyLogo from '@assets/kaizen_journey_logo.svg';
import LayoutActions from '@common/redux/modules/Layout/LayoutActions';
import { useDispatch } from 'react-redux';
import { useUserProfile } from '@common/contexts/UserProfile/UserProfileContext';
import { useNavigate } from 'react-router-dom';
import { Paths } from '@common/constants/Paths';
import Button from '@common/components/Button';
import HomeFeature from './components/HomeFeature/HomeFeature';
import HomeKaizenMeaning from './components/HomeKaizenMeaning/HomeKaizenMeaning';
import HomeQuote from './components/HomeQuote/HomeQuote';
import HomeMascot from './components/HomeMascot/HomeMascot';
import AuthModal, { IAuthModalProps, Mode } from '@common/containers/Header/components/AuthModal/AuthModal';
import useStyles from './useStyles';

const Home: React.FC = () => {
  const intl = useIntl();
  const { styles } = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [authModalConfig, setAuthModalConfig] = useState<IAuthModalProps>();
  const divRef = useRef<HTMLDivElement>(null);

  const { userProfile } = useUserProfile();

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
      setAuthModalConfig({
        initMode: Mode.register,
        handleCancel: () => setAuthModalConfig(undefined)
      });
    }
  };

  return (
    <>
      <div className={styles.headerContainer}>
        <Space className={styles.headerKaizenJourneySpace} size={16}>
          <img className={styles.logoImage} src={kaizenJourneyLogo} alt="Kaizen Journey Logo" />
          <div className={styles.headerTitle}>Kaizen Journey</div>
        </Space>

        <div className={styles.headerSubtitle}>{intl.formatMessage({ id: 'home.header.subtitle' })}</div>
        <Space direction="vertical">
          <Button type="primary" onClick={onClick}>
            {intl.formatMessage({ id: 'home.header.button' })}
          </Button>
          {intl.formatMessage({ id: 'common.or' }).toLowerCase()}
          <Button type="text" onClick={executeScroll} icon={<FontAwesomeIcon icon={faChevronDown} />}>
            {intl.formatMessage({ id: 'home.header.discoverMore' })}
          </Button>
        </Space>
      </div>
      <div className={styles.contentContainer} ref={divRef}>
        <HomeFeature />
        <HomeKaizenMeaning onClick={onClick} />
        <HomeMascot />
        <HomeQuote />
      </div>
      <div className={styles.endingContainer}>
        <div className={styles.endingTitle}>{intl.formatMessage({ id: 'home.ending.title' })}</div>

        <Button type="primary" onClick={onClick}>
          {intl.formatMessage({ id: 'home.ending.button' })}
        </Button>
      </div>

      {authModalConfig ? <AuthModal {...authModalConfig} /> : null}
    </>
  );
};

export default Home;
