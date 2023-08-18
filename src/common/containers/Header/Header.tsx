import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { Grid, Switch } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import UserAvatar from './components/UserAvatar';
import { useAuth } from '@common/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Paths } from '@common/constants/Paths';
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import kaizenJourneyLogo from '@assets/kaizen_journey_logo.svg';
import SiteMenu from './components/SiteMenu';
import { ITranslationConfig } from '@common/lang/config/types';
import LayoutActions from '@common/redux/modules/Layout/LayoutActions';
import { ILayoutOwnState } from '@common/redux/modules/Layout/LayoutInterface';
import { DarkModeContext } from '@common/contexts/DarkMode/DarkModeContext';
import Select, { Option } from '@common/components/Select/Select';
import {
  StyledAvatarContainer,
  StyledDarkModeSwitchContainer,
  StyledHamburgerMenuIcon,
  StyledHamburgerMenuIconContainer,
  StyledLayoutHeader,
  StyledLogoContainer,
  StyledLogoImage,
  StyledMenuDrawer,
  StyledMenuDrawerCloseIcon,
  StyledMenuDrawerCloseIconContainer
} from './styled';
import AuthModal, { IAuthModalProps, Mode } from './components/AuthModal/AuthModal';
import { Language } from '@common/constants/Language';

const { useBreakpoint } = Grid;

const Header: React.FC = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const siteLanguage = useSelector(({ layout }: ILayoutOwnState) => layout.siteLanguage);
  const [authModalConfig, setAuthModalConfig] = useState<IAuthModalProps>();

  const { userAuth } = useAuth();
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const openRegisterModal = () => {
    setAuthModalConfig({
      initMode: Mode.register,
      handleCancel: () => setAuthModalConfig(undefined)
    });
  };

  const openLoginModal = () => {
    setAuthModalConfig({
      initMode: Mode.login,
      handleCancel: () => setAuthModalConfig(undefined)
    });
  };

  return (
    <>
      <StyledLayoutHeader>
        <StyledLogoContainer
          onClick={() => {
            navigate(Paths.Welcome);
          }}
        >
          <StyledLogoImage src={kaizenJourneyLogo} alt="Kaizen Journey Logo" />
        </StyledLogoContainer>

        {isMobile ? (
          <StyledHamburgerMenuIconContainer onClick={() => setIsMenuOpen(true)}>
            <StyledHamburgerMenuIcon icon={faBars} />
          </StyledHamburgerMenuIconContainer>
        ) : null}

        {userAuth ? (
          <StyledAvatarContainer>
            <UserAvatar />
          </StyledAvatarContainer>
        ) : null}

        {!userAuth ? (
          <StyledAvatarContainer>
            <Select<ITranslationConfig['locale']>
              style={{ width: 65 }}
              dropdownMatchSelectWidth={120}
              defaultValue={siteLanguage}
              optionLabelProp="label"
              size="middle"
              placement="bottomRight"
              onChange={(value) => LayoutActions.setSiteLanguageAction(value)(dispatch)}
            >
              <Option value={Language.pl} label={Language.pl.toUpperCase()}>
                {intl.formatMessage({ id: 'common.language.polish' })}
              </Option>
              <Option value={Language.en} label={Language.en.toUpperCase()}>
                {intl.formatMessage({ id: 'common.language.english' })}
              </Option>
            </Select>
          </StyledAvatarContainer>
        ) : null}

        <StyledDarkModeSwitchContainer>
          <Switch
            checkedChildren={<FontAwesomeIcon icon={faMoon} />}
            unCheckedChildren={<FontAwesomeIcon icon={faSun} />}
            checked={darkMode}
            onChange={setDarkMode}
          />
        </StyledDarkModeSwitchContainer>

        {!isMobile ? (
          <SiteMenu userAuth={userAuth} openLoginModal={openLoginModal} openRegisterModal={openRegisterModal} />
        ) : null}
      </StyledLayoutHeader>

      <StyledMenuDrawer placement="right" closable={false} open={isMenuOpen} width="100vw">
        <StyledMenuDrawerCloseIconContainer onClick={() => setIsMenuOpen(false)}>
          <StyledMenuDrawerCloseIcon icon={faTimes} />
        </StyledMenuDrawerCloseIconContainer>
        <SiteMenu
          userAuth={userAuth}
          openLoginModal={openLoginModal}
          openRegisterModal={openRegisterModal}
          isMobile
          hideDrawer={() => setIsMenuOpen(false)}
        />
      </StyledMenuDrawer>

      {authModalConfig ? <AuthModal {...authModalConfig} /> : null}
    </>
  );
};

export default Header;
