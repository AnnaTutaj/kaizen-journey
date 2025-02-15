import React, { useCallback, useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useThunkDispatch } from '@common/redux/useThunkDispatch';
import { useIntl } from 'react-intl';
import { useUserProfile } from '@common/contexts/UserProfile/UserProfileContext';
import FriendFollowingList from './components/FriendFollowingList';
import FriendFollowingCreateModal from '@modules/Friend/components/FriendFollowingCreateModal';
import { IFriendFollowingCreateModalProps } from '@modules/Friend/components/FriendFollowingCreateModal/FriendFollowingCreateModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { IFriendFollowingOwnState } from '@modules/Friend/redux/FriendFollowing/FriendFollowingInterface';
import FriendFollowingActions from '@modules/Friend/redux/FriendFollowing/FriendFollowingActions';
import Button from '@common/components/Button';
import PageHeader from '@common/components/PageHeader';

const FriendFollowing: React.FC = () => {
  const intl = useIntl();
  const dispatch = useThunkDispatch();

  const { userProfile } = useUserProfile();
  const [friendFollowingCreateModalConfig, setFriendFollowingCreateModalConfig] =
    useState<IFriendFollowingCreateModalProps>();

  const { isLoaded } = useSelector(({ friendFollowing }: IFriendFollowingOwnState) => friendFollowing, shallowEqual);

  const resetList = useCallback(() => {
    dispatch(FriendFollowingActions.loadAction({ userProfileUid: userProfile.uid, reload: true }));
  }, [dispatch, userProfile]);

  const handleCreateFriendFollowing = () => {
    setFriendFollowingCreateModalConfig({
      handleCancel: () => setFriendFollowingCreateModalConfig(undefined),
      handleSubmit: async () => {
        setFriendFollowingCreateModalConfig(undefined);
        resetList();
      }
    });
  };

  //init
  useEffect(() => {
    if (!isLoaded) {
      resetList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <PageHeader smallMargin justifyContent="flex-end">
        <Button type="primary" onClick={() => handleCreateFriendFollowing()} icon={<FontAwesomeIcon icon={faPlus} />}>
          {intl.formatMessage({ id: 'friend.following.create.button' })}
        </Button>
      </PageHeader>
      <FriendFollowingList />
      {friendFollowingCreateModalConfig ? <FriendFollowingCreateModal {...friendFollowingCreateModalConfig} /> : null}
    </>
  );
};

export default FriendFollowing;
