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
import {
  SectionEndingTitle,
  StyledContentContainer,
  StyledEndingContainer,
  StyledHeaderContainer,
  StyledHeaderKaizenJourneySpace,
  StyledHeaderSubtitle,
  StyledHeaderTitle,
  StyledLogoImage
} from './styled';
import AuthModal, { IAuthModalProps, Mode } from '@common/containers/Header/components/AuthModal/AuthModal';

const Home: React.FC = () => {
  const intl = useIntl();
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
      <StyledHeaderContainer>
        <StyledHeaderKaizenJourneySpace size={16}>
          <StyledLogoImage src={kaizenJourneyLogo} alt="Kaizen Journey Logo" />
          <StyledHeaderTitle>Kaizen Journey</StyledHeaderTitle>
        </StyledHeaderKaizenJourneySpace>

        <StyledHeaderSubtitle>{intl.formatMessage({ id: 'home.header.subtitle' })}</StyledHeaderSubtitle>
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
      </StyledHeaderContainer>
      <StyledContentContainer ref={divRef}>
        <HomeFeature />
        <HomeKaizenMeaning onClick={onClick} />
        <HomeMascot />
        <HomeQuote />
      </StyledContentContainer>
      <StyledEndingContainer>
        <SectionEndingTitle>{intl.formatMessage({ id: 'home.ending.title' })}</SectionEndingTitle>

        <Button type="primary" onClick={onClick}>
          {intl.formatMessage({ id: 'home.ending.button' })}
        </Button>
      </StyledEndingContainer>

      {authModalConfig ? <AuthModal {...authModalConfig} /> : null}
    </>
  );
};

export default Home;
