import PageLoading from '@common/components/PageLoading';
import Empty from '@common/components/Empty';
import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';
import FriendListScrolled from '@modules/Friend/components/FriendListScrolled';
import { shallowEqual, useSelector } from 'react-redux';
import { useThunkDispatch } from '@common/redux/useThunkDispatch';
import { IUserFriendFollowingOwnState } from '@modules/User/redux/UserFriendFollowing/UserFriendFollowingInterface';
import { useUserProfile } from '@common/contexts/UserProfile/UserProfileContext';
import UserFriendFollowingListActions from '@modules/User/redux/UserFriendFollowing/UserFriendFollowingActions';
import { useParams } from 'react-router-dom';

const UserFriendFollowingList: React.FC = () => {
  const intl = useIntl();
  const dispatch = useThunkDispatch();
  const params = useParams();
  const { userProfile } = useUserProfile();
  const userId: string = useMemo(() => params.id || '', [params.id]);

  const { data, isLoaded, isLoadingMore, hasMore } = useSelector(
    ({ userFriendFollowing }: IUserFriendFollowingOwnState) => userFriendFollowing,
    shallowEqual
  );

  const getLastFetchedUserFriendFollowing = () => {
    return data && data.length && data[data.length - 1] ? data[data.length - 1] : undefined;
  };

  const getNextUserFriendFollowings = async () => {
    const lastFetchedUserFriendFollowing = getLastFetchedUserFriendFollowing();

    dispatch(
      UserFriendFollowingListActions.loadAction({
        userProfileUid: userId,
        lastFetchedUserFriendFollowing
      })
    );
  };

  const removeFriendFollowing = (id: string) => {
    dispatch(UserFriendFollowingListActions.removeAction(id));
  };

  if (!isLoaded) {
    return <PageLoading />;
  }

  return (
    <>
      {data && data.length ? (
        <FriendListScrolled
          headerText={intl.formatMessage({ id: 'friend.following.list.title' })}
          friends={data}
          mode={userProfile.uid === userId ? 'following' : 'viewUser'}
          loading={isLoadingMore}
          getNextFriends={getNextUserFriendFollowings}
          moreFriends={hasMore}
          removeFriendFollowing={removeFriendFollowing}
        />
      ) : (
        <Empty description={intl.formatMessage({ id: 'user.friend.following.list.empty' })} />
      )}
    </>
  );
};

export default UserFriendFollowingList;
