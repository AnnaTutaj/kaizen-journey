import React from 'react';
import { Menu } from 'antd';
import styles from './SiteMenu.module.less';
import { useIntl } from 'react-intl';
import { User as FirebaseUser } from 'firebase/auth';
import { Paths } from '@common/constants/Paths';
import { useHistory } from 'react-router-dom';
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
  const history = useHistory();

  return (
    <Menu
      mode={isMobile ? 'vertical' : 'horizontal'}
      className={cn(styles.MenuContainer, { [styles.MenuContainerMobile]: isMobile })}
    >
      {userAuth ? (
        <>
          <Menu.Item
            key="dashboard"
            onClick={() => {
              history.push(Paths.Dashboard);
              if (hideDrawer) {
                hideDrawer();
              }
            }}
          >
            {intl.formatMessage({ id: 'header.dashboard' })}
          </Menu.Item>
          <Menu.Item
            key="habit"
            onClick={() => {
              history.push(Paths.Habit);
              if (hideDrawer) {
                hideDrawer();
              }
            }}
          >
            {intl.formatMessage({ id: 'header.habits' })}
          </Menu.Item>
          <Menu.Item
            key="gratitude"
            onClick={() => {
              history.push(Paths.Gratitude);
              if (hideDrawer) {
                hideDrawer();
              }
            }}
          >
            {intl.formatMessage({ id: 'header.gratitude' })}
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item
            key="signIn"
            onClick={() => {
              openLoginModal();
              if (hideDrawer) {
                hideDrawer();
              }
            }}
          >
            {intl.formatMessage({ id: 'header.signIn' })}
          </Menu.Item>
          <Menu.Item
            key="register"
            onClick={() => {
              openRegisterModal();
              if (hideDrawer) {
                hideDrawer();
              }
            }}
          >
            {intl.formatMessage({ id: 'header.register' })}
          </Menu.Item>
        </>
      )}
    </Menu>
  );
};

export default SiteMenu;
