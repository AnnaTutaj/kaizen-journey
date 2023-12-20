import React, { useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { User as FirebaseUser } from 'firebase/auth';
import { Paths } from '@common/constants/Paths';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import useStyles from './useStyles';

export interface ISiteMenuProps {
  isMobile?: boolean;
  userAuth: FirebaseUser | null;
  openLoginModal: () => void;
  openRegisterModal: () => void;
  hideDrawer?: () => void;
}

const SiteMenu: React.FC<ISiteMenuProps> = ({ isMobile, userAuth, openLoginModal, openRegisterModal, hideDrawer }) => {
  const intl = useIntl();
  const { styles, cx } = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentKeys, setCurrentKeys] = useState<string[]>([]);

  useEffect(() => {
    const pathNameParts = location.pathname.split('/');
    setCurrentKeys([pathNameParts[1]]);
  }, [location.pathname]);

  const items = useMemo(() => {
    const commonItems = isMobile
      ? [
          {
            key: 'welcome',
            label: intl.formatMessage({ id: 'header.home' }),
            onClick: () => {
              navigate(Paths.Welcome);
              if (hideDrawer) {
                hideDrawer();
              }
            }
          }
        ]
      : [];

    const itemsByAuth = userAuth
      ? [
          {
            key: 'habits',
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
            key: 'friends',
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
            label: intl.formatMessage({ id: 'header.logIn' }),
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
    return [...commonItems, ...itemsByAuth];
  }, [hideDrawer, intl, isMobile, navigate, openLoginModal, openRegisterModal, userAuth]);

  return (
    <Menu
      className={cx(styles.menu, { [styles.mobileMenu]: isMobile })}
      mode={isMobile ? 'vertical' : 'horizontal'}
      items={items}
      disabledOverflow
      selectedKeys={currentKeys}
    />
  );
};

export default SiteMenu;
