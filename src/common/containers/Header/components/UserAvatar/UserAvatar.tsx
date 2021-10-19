import { UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu } from 'antd';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import styles from './UserAvatar.module.less';
import { useAuth } from '@common/contexts/AuthContext';
import SettingsModal from '../SettingsModal';

const UserAvatar: React.FC = () => {
  const intl = useIntl();
  const { logout, userProfile } = useAuth();
  const [isSettingsrModalVisible, setIsSettingsModalVisible] = useState(false);

  const showSettingsModal = () => {
    setIsSettingsModalVisible(true);
  };

  const openSettingsModal = () => {
    showSettingsModal();
  };

  const handleSettingsCancel = () => {
    setIsSettingsModalVisible(false);
  };

  const handleSettingsSubmit = () => {
    setIsSettingsModalVisible(false);
  };

  const menu = (
    <Menu>
      <Menu.ItemGroup title={userProfile?.username}>
        <Menu.Item key="1" onClick={() => logout()}>
          {intl.formatMessage({ id: 'header.logout' })}
        </Menu.Item>
        <Menu.Item key="2" onClick={openSettingsModal}>
          {intl.formatMessage({ id: 'header.settings' })}
        </Menu.Item>
      </Menu.ItemGroup>
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={menu} trigger={['click']}>
        <Avatar className={styles.Avatar} size={32} icon={<UserOutlined />} src={userProfile?.pictureURL} />
      </Dropdown>
      <SettingsModal
        isModalVisible={isSettingsrModalVisible}
        handleCancel={handleSettingsCancel}
        handleSubmit={handleSettingsSubmit}
      />
    </>
  );
};

export default UserAvatar;
