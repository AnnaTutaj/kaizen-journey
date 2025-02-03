import React, { useCallback, useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useThunkDispatch } from '@common/redux/useThunkDispatch';
import { useUserProfile } from '@common/contexts/UserProfile/UserProfileContext';
import FriendFollowerList from './components/FriendFollowerList';
import { IFriendFollowerOwnState } from '@modules/Friend/redux/FriendFollower/FriendFollowerInterface';
import FriendFollowerActions from '@modules/Friend/redux/FriendFollower/FriendFollowerActions';

const FriendFollower: React.FC = () => {
  const dispatch = useThunkDispatch();

  const { userProfile } = useUserProfile();

  const { isLoaded } = useSelector(({ friendFollower }: IFriendFollowerOwnState) => friendFollower, shallowEqual);

  const resetList = useCallback(() => {
    dispatch(FriendFollowerActions.loadAction({ userProfileUid: userProfile.uid, reload: true }));
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
