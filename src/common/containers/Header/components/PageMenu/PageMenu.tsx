import React from 'react';
import { Menu } from 'antd';
import styles from './PageMenu.module.less';
import { useIntl } from 'react-intl';
import { User as FirebaseUser } from 'firebase/auth';

import { Paths } from '@common/constants/Paths';
import { useHistory } from 'react-router-dom';
import cn from 'classnames';

export interface IPageMenuProps {
  userAuth: FirebaseUser | null;
  openLoginModal: () => void;
  openRegisterModal: () => void;
  isMobile?: boolean;
  hideDrawer?: () => void;
}

const PageMenu: React.FC<IPageMenuProps> = ({ userAuth, openLoginModal, openRegisterModal, isMobile, hideDrawer }) => {
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
            key="1"
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
            key="2"
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
            key="3"
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
            key="4"
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
            key="5"
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

export default PageMenu;
