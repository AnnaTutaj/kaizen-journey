import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { Grid, Layout, Switch } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
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
import { ThemeContext } from '@common/contexts/Theme/ThemeContext';
import Select, { Option } from '@common/components/Select/Select';
import AuthModal, { IAuthModalProps, Mode } from './components/AuthModal/AuthModal';
import { Language } from '@common/constants/Language';
import MascotWelcomeImage from './components/MascotWelcomeImage/MascotWelcomeImage';
import useStyles from './useStyles';
import Drawer from '@common/components/Drawer/Drawer';
import { useThunkDispatch } from '@common/redux/useThunkDispatch';

const { useBreakpoint } = Grid;

const Header: React.FC = () => {
  const intl = useIntl();
  const { styles } = useStyles();
  const dispatch = useThunkDispatch();
  const navigate = useNavigate();

  const siteLanguage = useSelector(({ layout }: ILayoutOwnState) => layout.siteLanguage);
  const [authModalConfig, setAuthModalConfig] = useState<IAuthModalProps>();

  const { userAuth } = useAuth();
  const { darkMode, setDarkMode } = useContext(ThemeContext);
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
      <Layout.Header className={styles.layoutHeader}>
        <div
          className={styles.logoContainer}
          onClick={() => {
            navigate(Paths.Welcome);
          }}
        >
          <img className={styles.logoImage} src={kaizenJourneyLogo} alt="Kaizen Journey Logo" />
        </div>

        {isMobile ? (
          <div className={styles.hamburgerMenuIconContainer} onClick={() => setIsMenuOpen(true)}>
            <FontAwesomeIcon className={styles.hamburgerMenuIcon} icon={faBars} />
          </div>
        ) : null}

        {userAuth ? (
          <div className={styles.avatarContainer}>
            <UserAvatar />
          </div>
        ) : null}

        {!userAuth ? (
          <div className={styles.avatarContainer}>
            <Select<ITranslationConfig['locale']>
              style={{ width: 65 }}
              popupMatchSelectWidth={120}
              defaultValue={siteLanguage}
              optionLabelProp="label"
              size="middle"
              placement="bottomRight"
              onChange={(value) => dispatch(LayoutActions.setSiteLanguageAction(value))}
            >
              <Option value={Language.pl} label={Language.pl.toUpperCase()}>
                {intl.formatMessage({ id: 'common.language.polish' })}
              </Option>
              <Option value={Language.en} label={Language.en.toUpperCase()}>
                {intl.formatMessage({ id: 'common.language.english' })}
              </Option>
            </Select>
          </div>
        ) : null}

        <div className={styles.darkModeSwitchContainer}>
          <Switch
            checkedChildren={<FontAwesomeIcon icon={faMoon} />}
            unCheckedChildren={<FontAwesomeIcon icon={faSun} />}
            checked={darkMode}
            onChange={setDarkMode}
          />
        </div>

        {!isMobile ? (
          <SiteMenu userAuth={userAuth} openLoginModal={openLoginModal} openRegisterModal={openRegisterModal} />
        ) : null}
      </Layout.Header>

      <Drawer
        className={styles.menuDrawer}
        open={isMenuOpen}
        width="80vw"
        close={() => setIsMenuOpen(false)}
        header={
          <div
            onClick={() => {
              setIsMenuOpen(false);
              navigate(Paths.Welcome);
            }}
            style={{ cursor: 'pointer' }}
          >
            <MascotWelcomeImage height={100} />
          </div>
        }
      >
        <SiteMenu
          userAuth={userAuth}
          openLoginModal={openLoginModal}
          openRegisterModal={openRegisterModal}
          isMobile
          hideDrawer={() => setIsMenuOpen(false)}
        />
      </Drawer>

      {authModalConfig ? <AuthModal {...authModalConfig} /> : null}
    </>
  );
};

export default Header;
