import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import styles from './Header.module.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faRoute } from '@fortawesome/free-solid-svg-icons';
import { useIntl } from 'react-intl';
import RegisterModal from './components/RegisterModal';
import LoginModal from './components/LoginModal';
import UserAvatar from './components/UserAvatar';
import { useAuth } from '@common/contexts/AuthContext';
import { useHistory } from 'react-router';
import { Paths } from '@common/constants/Paths';

const Header: React.FC = () => {
  const intl = useIntl();
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const { userAuth } = useAuth();
  const history = useHistory();

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
          className={styles.Logo}
          onClick={() => {
            history.push(Paths.Home);
          }}
        >
          <FontAwesomeIcon icon={faRoute} className={styles.LogoIcon} />
          <span>Kaizen Journey</span>
        </div>
        {userAuth ? (
          <div className={styles.Avatar}>
            <UserAvatar />
          </div>
        ) : null}
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
