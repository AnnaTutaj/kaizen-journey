import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import styles from './Header.module.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRoute } from '@fortawesome/free-solid-svg-icons';
import { useIntl } from 'react-intl';
import RegisterModal from './components/RegisterModal';

const Header: React.FC = () => {
  const intl = useIntl();
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);

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

  return (
    <>
      <Layout.Header className={styles.Container}>
        <div className={styles.Logo}>
          <FontAwesomeIcon icon={faRoute} className={styles.LogoIcon} />
          <a href="http://www.google.com">Kaizen Journey</a>
        </div>
        <Menu mode="horizontal" defaultSelectedKeys={['1']} className={styles.MenuContainer}>
          <Menu.Item key="1">{intl.formatMessage({ id: 'header.dashboard' })}</Menu.Item>
          <Menu.Item key="2">{intl.formatMessage({ id: 'header.habits' })}</Menu.Item>
          <Menu.Item key="3">{intl.formatMessage({ id: 'header.gratitude' })}</Menu.Item>
          <Menu.Item key="4">{intl.formatMessage({ id: 'header.signIn' })}</Menu.Item>
          <Menu.Item key="5" onClick={openRegisterModal}>
            {intl.formatMessage({ id: 'header.register' })}
          </Menu.Item>
        </Menu>
      </Layout.Header>
      <RegisterModal
        isModalVisible={isRegisterModalVisible}
        handleCancel={handleRegisterCancel}
        handleSubmit={handleRegsiterSubmit}
      />
    </>
  );
};

export default Header;
