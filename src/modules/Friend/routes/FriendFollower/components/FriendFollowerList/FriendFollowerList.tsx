import PageLoading from '@common/components/PageLoading';
import Empty from '@common/components/Empty';
import React from 'react';
import { useIntl } from 'react-intl';
import FriendListScrolled from '@modules/Friend/components/FriendListScrolled';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { IFriendFollowerOwnState } from '@modules/Friend/redux/FriendFollower/FriendFollowerInterface';
import { useUserProfile } from '@common/contexts/UserProfile/UserProfileContext';
import FriendFollowerListActions from '@modules/Friend/redux/FriendFollower/FriendFollowerActions';

const FriendFollowerList: React.FC = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { userProfile } = useUserProfile();

  const { data, isLoaded, isLoadingMore, hasMore } = useSelector(
    ({ friendFollower }: IFriendFollowerOwnState) => friendFollower,
    shallowEqual
  );

  const getLastFetchedFriendFollower = () => {
    return data && data.length && data[data.length - 1] ? data[data.length - 1] : undefined;
  };

  const getNextFriendFollowers = async () => {
    const lastFetchedFriendFollower = getLastFetchedFriendFollower();

    FriendFollowerListActions.loadAction({
      userProfileUid: userProfile.uid,
      lastFetchedFriendFollower
    })(dispatch);
  };

  const removeFriendFollower = (id: string) => {
    FriendFollowerListActions.removeAction(id)(dispatch);
  };

  if (!isLoaded) {
    return <PageLoading />;
  }

  return (
    <>
      {data && data.length ? (
        <FriendListScrolled
          headerText={intl.formatMessage({ id: 'friend.follower.list.title' })}
          friends={data}
          mode="follower"
          loading={isLoadingMore}
          getNextFriends={getNextFriendFollowers}
          moreFriends={hasMore}
          removeFriendFollower={removeFriendFollower}
        />
      ) : (
        <Empty description={intl.formatMessage({ id: 'friend.follower.list.empty' })} />
      )}
    </>
  );
};

export default FriendFollowerList;
