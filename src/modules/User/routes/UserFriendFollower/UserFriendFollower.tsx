import React, { useCallback, useEffect, useMemo } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useThunkDispatch } from '@common/redux/useThunkDispatch';
import UserFriendFollowerList from './components/UserFriendFollowerList';
import { IUserFriendFollowerOwnState } from '@modules/User/redux/UserFriendFollower/UserFriendFollowerInterface';
import UserFriendFollowerActions from '@modules/User/redux/UserFriendFollower/UserFriendFollowerActions';
import { DynamicModuleLoader } from 'redux-dynamic-modules';
import { useParams } from 'react-router-dom';
import UserFriendFollowerModule from '@modules/User/redux/UserFriendFollower/UserFriendFollowerModule';

const UserFriendFollower: React.FC = () => {
  const dispatch = useThunkDispatch();
  const params = useParams();
  const userId: string = useMemo(() => params.id || '', [params.id]);

  const { isLoaded } = useSelector(
    ({ userFriendFollower }: IUserFriendFollowerOwnState) => userFriendFollower,
    shallowEqual
  );

  const resetList = useCallback(() => {
    dispatch(UserFriendFollowerActions.loadAction({ userProfileUid: userId, reload: true }));
  }, [dispatch, userId]);

  //init
  useEffect(() => {
    if (!isLoaded) {
      resetList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <UserFriendFollowerList />;
};

const UserFriendFollowerLoader = (): React.ReactElement => {
  return (
    //@ts-ignore
    <DynamicModuleLoader modules={[UserFriendFollowerModule]}>
      <UserFriendFollower />
    </DynamicModuleLoader>
  );
};

export default UserFriendFollowerLoader;
