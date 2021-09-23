import React from 'react';
import { Layout, Menu } from 'antd';
import styles from './Header.module.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRoute } from '@fortawesome/free-solid-svg-icons';
import { useIntl } from 'react-intl';

const Header: React.FC = () => {
    const intl = useIntl();

  return (
    <Layout.Header className={styles.Container}>
      <div className={styles.Logo}>
        <FontAwesomeIcon icon={faRoute} className={styles.LogoIcon} />
        <a href="http://www.google.com">Kaizen Journey</a>
      </div>
      <Menu mode="horizontal" defaultSelectedKeys={['1']} className={styles.MenuContainer}>
        <Menu.Item key="1">{intl.formatMessage({id: 'header.dashboard'})}</Menu.Item>
        <Menu.Item key="2">{intl.formatMessage({id: 'header.habits'})}</Menu.Item>
        <Menu.Item key="3">{intl.formatMessage({id: 'header.gratitude'})}</Menu.Item>
      </Menu>
    </Layout.Header>
  );
};

export default Header;
