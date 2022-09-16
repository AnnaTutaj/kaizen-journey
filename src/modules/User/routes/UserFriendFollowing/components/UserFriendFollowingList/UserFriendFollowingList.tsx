import PageLoading from '@common/components/PageLoading';
import Empty from '@common/components/Empty';
import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';
import FriendListScrolled from '@modules/Friend/components/FriendListScrolled';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { IUserFriendFollowingOwnState } from '@modules/User/redux/UserFriendFollowing/UserFriendFollowingInterface';
import { useAuth } from '@common/contexts/AuthContext';
import UserFriendFollowingListActions from '@modules/User/redux/UserFriendFollowing/UserFriendFollowingActions';
import { useParams } from 'react-router-dom';

const UserFriendFollowingList: React.FC = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const params = useParams();
  const { userProfile } = useAuth();
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

    UserFriendFollowingListActions.loadAction({
      userProfileUid: userId,
      lastFetchedUserFriendFollowing
    })(dispatch);
  };

  const removeFriendFollowing = (id: string) => {
    UserFriendFollowingListActions.removeAction(id)(dispatch);
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
