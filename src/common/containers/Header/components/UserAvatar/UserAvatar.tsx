import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useAuth } from '@common/contexts/AuthContext';
import SettingsModal from '../SettingsModal';
import { ISettingsModalProps } from '../SettingsModal/SettingsModal';
import Dropdown from '@common/components/Dropdown';
import { DropdownMenuItemProps } from '@common/components/Dropdown/Dropdown';
import { faBrush, faCog, faDownload, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';
import { faUser as dummyUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { generatePath, useNavigate } from 'react-router-dom';
import { Paths } from '@common/constants/Paths';
import ExportGratitudeModal, { IExportGratitudeModalalProps } from '../ExportGratitudeModal/ExportGratitudeModal';
import ExportHabitModal, { IExportHabitModalalProps } from '../ExportHabitModal/ExportHabitModal';
import { useUserProfile } from '@common/contexts/UserProfile/UserProfileContext';
import { createStyles } from 'antd-style';
import { Avatar } from 'antd';

const useStyles = createStyles(({ css }) => ({
  avatar: css`
    cursor: pointer;
  `
}));

const UserAvatar: React.FC = () => {
  const intl = useIntl();
  const { styles } = useStyles();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { userProfile } = useUserProfile();
  const [settingsModalConfig, setSettingsModalConfig] = useState<ISettingsModalProps>();
  const [exportGratitudeModalConfig, setExportGratitudeModalConfig] = useState<IExportGratitudeModalalProps>();
  const [exportHabitModalConfig, setExportHabitModalConfig] = useState<IExportHabitModalalProps>();

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
          key: 'customizeTheme',
          item: {
            text: intl.formatMessage({ id: 'header.customizeTheme' }),
            icon: faBrush
          },
          onClick: () => {
            navigate(Paths.CustomizeTheme);
          }
        },
        {
          key: 'export',
          item: {
            text: intl.formatMessage({ id: 'header.export' }),
            icon: faDownload
          },
          items: [
            {
              key: 'exportHabits',
              item: {
                text: intl.formatMessage({ id: 'header.habits' })
              },
              onClick: () => {
                setExportHabitModalConfig({
                  handleSubmit: () => {
                    setExportHabitModalConfig(undefined);
                  },
                  handleCancel: () => setExportHabitModalConfig(undefined)
                });
              }
            },
            {
              key: 'exportGratitudes',
              item: {
                text: intl.formatMessage({ id: 'header.gratitude' })
              },
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
        <Avatar
          className={styles.avatar}
          size={40}
          icon={<FontAwesomeIcon icon={dummyUser} />}
          src={userProfile.pictureURL ? userProfile.pictureURL : undefined}
        />
      </Dropdown>

      {settingsModalConfig ? <SettingsModal {...settingsModalConfig} /> : null}
      {exportGratitudeModalConfig ? <ExportGratitudeModal {...exportGratitudeModalConfig} /> : null}
      {exportHabitModalConfig ? <ExportHabitModal {...exportHabitModalConfig} /> : null}
    </>
  );
};

export default UserAvatar;
