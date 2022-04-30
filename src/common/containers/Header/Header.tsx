import React, { useState } from 'react';
import { Button, Drawer, Grid, Layout, Menu, Switch } from 'antd';
import styles from './Header.module.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useIntl } from 'react-intl';
import RegisterModal from './components/RegisterModal';
import LoginModal from './components/LoginModal';
import UserAvatar from './components/UserAvatar';
import { useAuth } from '@common/contexts/AuthContext';
import { useHistory } from 'react-router';
import { Paths } from '@common/constants/Paths';
import { useTheme } from '@themes/use-theme';
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import kaizenJourneyLogo from '@assets/kaizen_journey_logo.svg';
import PageMenu from './components/PageMenu';

const { useBreakpoint } = Grid;

const Header: React.FC = () => {
  const intl = useIntl();
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const { userAuth } = useAuth();
  const history = useHistory();
  const { darkMode, setDarkMode } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const showRegisterModal = () => {
    setIsRegisterModalVisible(true);
  };

  const openRegisterModal = () => {
    showRegisterModal();
  };

  const handleRegisterCancel = () => {
    setIsRegisterModalVisible(false);
  };

  const handleRegsiterSubmit = () => {
    setIsRegisterModalVisible(false);
  };

  const showLoginModal = () => {
    setIsLoginModalVisible(true);
  };

  const openLoginModal = () => {
    showLoginModal();
  };

  const handleLoginCancel = () => {
    setIsLoginModalVisible(false);
  };

  const handleLoginSubmit = () => {
    setIsLoginModalVisible(false);
  };

  return (
    <>
      <Layout.Header className={styles.Container}>
        <div
          className={styles.LogoContainer}
          onClick={() => {
            history.push(Paths.Home);
          }}
        >
          <img src={kaizenJourneyLogo} className={styles.LogoImage} alt="Kaizen Journey Logo" />
        </div>

        {isMobile ? (
          <div className={styles.HamburgerMenuIconContainer} onClick={() => setIsMenuOpen(true)}>
            <FontAwesomeIcon className={styles.HamburgerMenuIcon} icon={faBars} />
          </div>
        ) : null}

        {userAuth ? (
          <div className={styles.Avatar}>
            <UserAvatar />
          </div>
        ) : null}

        <div className={styles.DarkModeSwitchContainer}>
          <Switch
            checkedChildren={<FontAwesomeIcon icon={faMoon} />}
            unCheckedChildren={<FontAwesomeIcon icon={faSun} />}
            checked={darkMode}
            onChange={setDarkMode}
          />
        </div>

        {!isMobile ? (
          <PageMenu userAuth={userAuth} openLoginModal={openLoginModal} openRegisterModal={openRegisterModal} />
        ) : null}
      </Layout.Header>
      <RegisterModal
        isModalVisible={isRegisterModalVisible}
        handleCancel={handleRegisterCancel}
        handleSubmit={handleRegsiterSubmit}
      />
      <LoginModal
        isModalVisible={isLoginModalVisible}
        handleCancel={handleLoginCancel}
        handleSubmit={handleLoginSubmit}
      />

      <Drawer placement="right" closable={false} visible={isMenuOpen} width="100vw" className={styles.MenuDrawer}>
        <div className={styles.MenuDrawerCloseIconContainer} onClick={() => setIsMenuOpen(false)}>
          <FontAwesomeIcon className={styles.MenuDrawerCloseIcon} icon={faTimes} />
        </div>
        <PageMenu
          userAuth={userAuth}
          openLoginModal={openLoginModal}
          openRegisterModal={openRegisterModal}
          isMobile
          hideDrawer={() => setIsMenuOpen(false)}
        />
      </Drawer>
    </>
  );
};

export default Header;
