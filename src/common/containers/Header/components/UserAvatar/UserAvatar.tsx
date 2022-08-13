import { Avatar } from 'antd';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import styles from './UserAvatar.module.less';
import { useAuth } from '@common/contexts/AuthContext';
import SettingsModal from '../SettingsModal';
import Dropdown from '@common/components/Dropdown';
import { DropdownMenuItemProps } from '@common/components/Dropdown/Dropdown';
import { faCog, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

  const menuItems: DropdownMenuItemProps = [
    {
      key: 'userProfileGroup',
      title: userProfile?.username || '',
      items: [
        {
          key: 'settings',
          item: {
            text: intl.formatMessage({ id: 'header.settings' }),
            icon: faCog
          },
          onClick: () => {
            openSettingsModal();
          }
        },
        {
          key: 'logout',
          item: {
            text: intl.formatMessage({ id: 'header.logout' }),
            icon: faSignOut
          },
          onClick: () => {
            logout();
          }
        }
      ]
    }
  ];

  return (
    <>
      <Dropdown menuItems={menuItems}>
        <Avatar
          className={styles.Avatar}
          size={40}
          icon={<FontAwesomeIcon icon={faUser} />}
          src={userProfile?.pictureURL}
        />
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
