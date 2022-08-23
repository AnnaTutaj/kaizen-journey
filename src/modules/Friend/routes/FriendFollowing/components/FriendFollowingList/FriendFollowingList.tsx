import PageLoading from '@common/components/PageLoading';
import Empty from '@common/components/Empty';
import React from 'react';
import { useIntl } from 'react-intl';
import FriendListScrolled from '@modules/Friend/components/FriendListScrolled';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { IFriendFollowingOwnState } from '@modules/Friend/redux/FriendFollowing/FriendFollowingInterface';
import { useAuth } from '@common/contexts/AuthContext';
import FriendFollowingListActions from '@modules/Friend/redux/FriendFollowing/FriendFollowingActions';

const FriendFollowingList: React.FC = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { userProfile } = useAuth();

  const { data, isLoaded, isLoadingMore, hasMore } = useSelector(
    ({ friendFollowing }: IFriendFollowingOwnState) => friendFollowing,
    shallowEqual
  );

  const getLastFetchedFriendFollowing = () => {
    return data && data.length && data[data.length - 1] ? data[data.length - 1] : undefined;
  };

  const getNextFriendFollowings = async () => {
    const lastFetchedFriendFollowing = getLastFetchedFriendFollowing();

    FriendFollowingListActions.loadAction({
      userProfileUid: userProfile.uid,
      lastFetchedFriendFollowing
    })(dispatch);
  };

  const removeFriendFollowing = (id: string) => {
    FriendFollowingListActions.removeAction(id)(dispatch);
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
          mode="following"
          loading={isLoadingMore}
          getNextFriends={getNextFriendFollowings}
          moreFriends={hasMore}
          removeFriendFollowing={removeFriendFollowing}
        />
      ) : (
        <Empty description={intl.formatMessage({ id: 'friend.following.list.empty' })} />
      )}
    </>
  );
};

export default FriendFollowingList;
