import React, { useCallback, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useAuth } from '@common/contexts/AuthContext';
import FriendFollowerList from './components/FriendFollowerList';
import { IFriendFollowerOwnState } from '@modules/Friend/redux/FriendFollower/FriendFollowerInterface';
import FriendFollowerActions from '@modules/Friend/redux/FriendFollower/FriendFollowerActions';

const FriendFollower: React.FC = () => {
  const dispatch = useDispatch();

  const { userProfile } = useAuth();

  const { isLoaded } = useSelector(({ friendFollower }: IFriendFollowerOwnState) => friendFollower, shallowEqual);

  const resetList = useCallback(() => {
    if (userProfile) {
      FriendFollowerActions.loadAction({ userProfileUid: userProfile.uid, reload: true })(dispatch);
    }
  }, [dispatch, userProfile]);

  //init
  useEffect(() => {
    if (!isLoaded) {
      resetList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <FriendFollowerList />
    </>
  );
};

export default FriendFollower;
