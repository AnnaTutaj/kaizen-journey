import PageLoading from '@common/components/PageLoading';
import Empty from '@common/components/Empty';
import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';
import FriendListScrolled from '@modules/Friend/components/FriendListScrolled';
import { shallowEqual, useSelector } from 'react-redux';
import { useThunkDispatch } from '@common/redux/useThunkDispatch';
import { IUserFriendFollowerOwnState } from '@modules/User/redux/UserFriendFollower/UserFriendFollowerInterface';
import { useUserProfile } from '@common/contexts/UserProfile/UserProfileContext';
import UserFriendFollowerListActions from '@modules/User/redux/UserFriendFollower/UserFriendFollowerActions';
import { useParams } from 'react-router-dom';

const UserFriendFollowerList: React.FC = () => {
  const intl = useIntl();
  const dispatch = useThunkDispatch();
  const params = useParams();
  const { userProfile } = useUserProfile();
  const userId: string = useMemo(() => params.id || '', [params.id]);

  const { data, isLoaded, isLoadingMore, hasMore } = useSelector(
    ({ userFriendFollower }: IUserFriendFollowerOwnState) => userFriendFollower,
    shallowEqual
  );

  const getLastFetchedUserFriendFollower = () => {
    return data && data.length && data[data.length - 1] ? data[data.length - 1] : undefined;
  };

  const getNextUserFriendFollowers = async () => {
    const lastFetchedUserFriendFollower = getLastFetchedUserFriendFollower();

    dispatch(
      UserFriendFollowerListActions.loadAction({
        userProfileUid: userId,
        lastFetchedUserFriendFollower
      })
    );
  };

  const removeFriendFollower = (id: string) => {
    dispatch(UserFriendFollowerListActions.removeAction(id));
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
          mode={userProfile.uid === userId ? 'follower' : 'viewUser'}
          loading={isLoadingMore}
          getNextFriends={getNextUserFriendFollowers}
          moreFriends={hasMore}
          removeFriendFollower={removeFriendFollower}
        />
      ) : (
        <Empty description={intl.formatMessage({ id: 'user.friend.follower.list.empty' })} />
      )}
    </>
  );
};

export default UserFriendFollowerList;
