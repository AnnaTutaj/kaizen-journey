import { UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu } from 'antd';
import React from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { useIntl } from 'react-intl';
import styles from './UserAvatar.module.less';
import { useAuth } from '@common/contexts/AuthContext';

interface IProps {
  user: FirebaseUser | null;
}

const onClick = () => {};

const UserAvatar: React.FC<IProps> = ({ user }) => {
  const intl = useIntl();
  const { logout } = useAuth();

  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="1" onClick={() => logout()}>
        {intl.formatMessage({ id: 'header.logout' })}
      </Menu.Item>
      <Menu.Item key="2">{intl.formatMessage({ id: 'header.settings' })}</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Avatar className={styles.Avatar} size={32} icon={<UserOutlined />} />
    </Dropdown>
  );
};

export default UserAvatar;
