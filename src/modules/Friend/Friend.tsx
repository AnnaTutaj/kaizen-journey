import React, { useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import Menu from '@common/components/Menu';
import { Paths } from '@common/constants/Paths';
import { DynamicModuleLoader } from 'redux-dynamic-modules';
import FriendFollowingModule from './redux/FriendFollowing/FriendFollowingModule';
import FriendFollowerModule from './redux/FriendFollower/FriendFollowerModule';

const Friend: React.FC = () => {
  const intl = useIntl();
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const items: { key: string; label: React.ReactElement }[] = useMemo(
    () => [
      {
        key: Paths.FriendFollowing,
        label: <Link to={Paths.FriendFollowing}>{intl.formatMessage({ id: 'friend.menu.following' })}</Link>
      },
      {
        key: Paths.FriendFollowers,
        label: <Link to={Paths.FriendFollowers}>{intl.formatMessage({ id: 'friend.menu.followers' })}</Link>
      }
    ],
    [intl]
  );

  useEffect(() => {
    const findItem = items.find((i) => i.key === location.pathname);
    if (findItem) {
      setSelectedKeys([findItem.key]);
    }
  }, [location.pathname, items]);

  return (
    <>
      <Menu selectedKeys={selectedKeys} items={items} />

      <Outlet />
    </>
  );
};

const FriendModuleLoader = (): React.ReactElement => {
  return (
    //@ts-ignore
    <DynamicModuleLoader modules={[FriendFollowingModule, FriendFollowerModule]}>
      <Friend />
    </DynamicModuleLoader>
  );
};

export default FriendModuleLoader;
