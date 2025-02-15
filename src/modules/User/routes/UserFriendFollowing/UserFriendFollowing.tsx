import React, { useCallback, useEffect, useMemo } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useThunkDispatch } from '@common/redux/useThunkDispatch';
import UserFriendFollowingList from './components/UserFriendFollowingList';
import { IUserFriendFollowingOwnState } from '@modules/User/redux/UserFriendFollowing/UserFriendFollowingInterface';
import UserFriendFollowingActions from '@modules/User/redux/UserFriendFollowing/UserFriendFollowingActions';
import { DynamicModuleLoader } from 'redux-dynamic-modules';
import UserFriendFollowingModule from '@modules/User/redux/UserFriendFollowing/UserFriendFollowingModule';
import { useParams } from 'react-router-dom';

const UserFriendFollowing: React.FC = () => {
  const dispatch = useThunkDispatch();
  const params = useParams();
  const userId: string = useMemo(() => params.id || '', [params.id]);

  const { isLoaded } = useSelector(
    ({ userFriendFollowing }: IUserFriendFollowingOwnState) => userFriendFollowing,
    shallowEqual
  );

  const resetList = useCallback(() => {
    dispatch(UserFriendFollowingActions.loadAction({ userProfileUid: userId, reload: true }));
  }, [dispatch, userId]);

  //init
  useEffect(() => {
    if (!isLoaded) {
      resetList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <UserFriendFollowingList />;
};

const UserFriendFollowingLoader = (): React.ReactElement => {
  return (
    //@ts-ignore
    <DynamicModuleLoader modules={[UserFriendFollowingModule]}>
      <UserFriendFollowing />
    </DynamicModuleLoader>
  );
};

export default UserFriendFollowingLoader;
