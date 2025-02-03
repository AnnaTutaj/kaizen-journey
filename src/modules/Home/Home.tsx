import { Col, Grid, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import imageMascotWelcome from '@assets/mascot_welcome.svg';
import LayoutActions from '@common/redux/modules/Layout/LayoutActions';
import { useThunkDispatch } from '@common/redux/useThunkDispatch';
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

const { useBreakpoint } = Grid;

const Home: React.FC = () => {
  const intl = useIntl();
  const screens = useBreakpoint();

  const { styles } = useStyles();
  const dispatch = useThunkDispatch();
  const navigate = useNavigate();

  const [authModalConfig, setAuthModalConfig] = useState<IAuthModalProps>();
  const { userProfile } = useUserProfile();

  useEffect(() => {
    dispatch(LayoutActions.setHidePaddingAction(true));

    return () => {
      dispatch(LayoutActions.setHidePaddingAction(false));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <div className={styles.headerWapper}>
        <Row gutter={[16, 0]} justify="space-between" align="middle" className={styles.headerContainer}>
          <Col span={24} md={{ span: 12, order: 2 }}>
            <img className={styles.mascotImage} src={imageMascotWelcome} alt="Kaizen Journey Logo" />
          </Col>
          <Col span={24} md={{ span: 12, order: 1 }}>
            <div className={styles.headerTitle}>{intl.formatMessage({ id: 'home.header.title' })}</div>
            <div className={styles.headerSubtitle}>{intl.formatMessage({ id: 'home.header.subtitle' })}</div>
            <Button type="primary" onClick={onClick} block={screens?.xs}>
              {intl.formatMessage({ id: 'home.header.button' })}
            </Button>
          </Col>
        </Row>
      </div>
      <div className={styles.contentContainer}>
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
