import React from 'react';
import { Menu } from 'antd';
import styles from './SiteMenu.module.less';
import { useIntl } from 'react-intl';
import { User as FirebaseUser } from 'firebase/auth';
import { Paths } from '@common/constants/Paths';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

export interface ISiteMenuProps {
  isMobile?: boolean;
  userAuth: FirebaseUser | null;
  openLoginModal: () => void;
  openRegisterModal: () => void;
  hideDrawer?: () => void;
}

const SiteMenu: React.FC<ISiteMenuProps> = ({ isMobile, userAuth, openLoginModal, openRegisterModal, hideDrawer }) => {
  const intl = useIntl();
  const navigate = useNavigate();

  const items = userAuth
    ? [
        {
          key: 'habit',
          label: intl.formatMessage({ id: 'header.habits' }),
          onClick: () => {
            navigate(Paths.Habit);
            if (hideDrawer) {
              hideDrawer();
            }
          }
        },
        {
          key: 'gratitude',
          label: intl.formatMessage({ id: 'header.gratitude' }),
          onClick: () => {
            navigate(Paths.Gratitude);
            if (hideDrawer) {
              hideDrawer();
            }
          }
        },
        {
          key: 'friend',
          label: intl.formatMessage({ id: 'header.friends' }),
          onClick: () => {
            navigate(Paths.Friend);
            if (hideDrawer) {
              hideDrawer();
            }
          }
        }
      ]
    : [
        {
          key: 'signIn',
          label: intl.formatMessage({ id: 'header.signIn' }),
          onClick: () => {
            openLoginModal();
            if (hideDrawer) {
              hideDrawer();
            }
          }
        },
        {
          key: 'register',
          label: intl.formatMessage({ id: 'header.register' }),
          onClick: () => {
            openRegisterModal();
            if (hideDrawer) {
              hideDrawer();
            }
          }
        }
      ];

  return (
    <Menu
      mode={isMobile ? 'vertical' : 'horizontal'}
      className={cn(styles.MenuContainer, { [styles.MenuContainerMobile]: isMobile })}
      items={items}
    />
  );
};

export default SiteMenu;
