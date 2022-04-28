import React, { useState } from 'react';
import { Layout, Menu, Switch } from 'antd';
import styles from './Header.module.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
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

const Header: React.FC = () => {
  const intl = useIntl();
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const { userAuth } = useAuth();
  const history = useHistory();
  const { darkMode, setDarkMode } = useTheme();

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

        <Menu
          mode="horizontal"
          className={styles.MenuContainer}
          overflowedIndicator={<FontAwesomeIcon icon={faBars} className={styles.OverflowIcon} />}
        >
          {userAuth ? (
            <>
              <Menu.Item
                key="1"
                onClick={() => {
                  history.push(Paths.Dashboard);
                }}
              >
                {intl.formatMessage({ id: 'header.dashboard' })}
              </Menu.Item>
              <Menu.Item
                key="2"
                onClick={() => {
                  history.push(Paths.Habit);
                }}
              >
                {intl.formatMessage({ id: 'header.habits' })}
              </Menu.Item>
              <Menu.Item
                key="3"
                onClick={() => {
                  history.push(Paths.Gratitude);
                }}
              >
                {intl.formatMessage({ id: 'header.gratitude' })}
              </Menu.Item>
            </>
          ) : (
            <>
              <Menu.Item key="4" onClick={openLoginModal}>
                {intl.formatMessage({ id: 'header.signIn' })}
              </Menu.Item>
              <Menu.Item key="5" onClick={openRegisterModal}>
                {intl.formatMessage({ id: 'header.register' })}
              </Menu.Item>
            </>
          )}
        </Menu>
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
    </>
  );
};

export default Header;
