import { Avatar } from 'antd';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import styles from './UserAvatar.module.less';
import { useAuth } from '@common/contexts/AuthContext';
import SettingsModal from '../SettingsModal';
import { ISettingsModalProps } from '../SettingsModal/SettingsModal';
import Dropdown from '@common/components/Dropdown';
import { DropdownMenuItemProps } from '@common/components/Dropdown/Dropdown';
import { faCog, faDownload, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';
import { faUser as dummyUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { generatePath, useNavigate } from 'react-router-dom';
import { Paths } from '@common/constants/Paths';
import ExportGratitudeModal, { IExportGratitudeModalalProps } from '../ExportGratitudeModal/ExportGratitudeModal';

const UserAvatar: React.FC = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const { logout, userProfile } = useAuth();
  const [settingsModalConfig, setSettingsModalConfig] = useState<ISettingsModalProps>();
  const [exportGratitudeModalConfig, setExportGratitudeModalConfig] = useState<IExportGratitudeModalalProps>();

  const menuItems: DropdownMenuItemProps = [
    {
      key: 'userProfileGroup',
      title: userProfile.username || '',
      items: [
        {
          key: 'myProfile',
          item: {
            text: intl.formatMessage({ id: 'header.myProfile' }),
            icon: faUser
          },
          onClick: () => {
            navigate(generatePath(Paths.UserView, { id: userProfile.uid }));
          }
        },
        {
          key: 'settings',
          item: {
            text: intl.formatMessage({ id: 'header.settings' }),
            icon: faCog
          },
          onClick: () => {
            setSettingsModalConfig({
              handleCancel: () => setSettingsModalConfig(undefined)
            });
          }
        },
        {
          key: 'export',
          item: {
            text: intl.formatMessage({ id: 'header.export' }),
            icon: faDownload
          },
          children: [
            {
              key: 'exportHabits',
              label: intl.formatMessage({ id: 'header.habits' })
            },
            {
              key: 'exportGratitudes',
              label: intl.formatMessage({ id: 'header.gratitude' }),
              onClick: () => {
                setExportGratitudeModalConfig({
                  handleSubmit: () => {
                    setExportGratitudeModalConfig(undefined);
                  },
                  handleCancel: () => setExportGratitudeModalConfig(undefined)
                });
              }
            }
          ]
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
        {userProfile.pictureURL ? (
          <Avatar
            className={styles.Avatar}
            size={40}
            icon={<FontAwesomeIcon icon={dummyUser} />}
            src={userProfile.pictureURL}
          />
        ) : (
          <Avatar className={styles.Avatar} size={40} icon={<FontAwesomeIcon icon={dummyUser} />} />
        )}
      </Dropdown>

      {settingsModalConfig ? <SettingsModal {...settingsModalConfig} /> : null}
      {exportGratitudeModalConfig ? <ExportGratitudeModal {...exportGratitudeModalConfig} /> : null}
    </>
  );
};

export default UserAvatar;
