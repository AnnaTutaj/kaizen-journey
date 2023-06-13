import React, { useCallback, useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { useAuth } from '@common/contexts/AuthContext';
import FriendFollowingList from './components/FriendFollowingList';
import FriendFollowingCreateModal from '@modules/Friend/components/FriendFollowingCreateModal';
import { IFriendFollowingCreateModalProps } from '@modules/Friend/components/FriendFollowingCreateModal/FriendFollowingCreateModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { IFriendFollowingOwnState } from '@modules/Friend/redux/FriendFollowing/FriendFollowingInterface';
import FriendFollowingActions from '@modules/Friend/redux/FriendFollowing/FriendFollowingActions';
import Button from '@common/components/Button';
import { StyledHeaderContainer } from '@common/components/Header/styled';

const FriendFollowing: React.FC = () => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const { userProfile } = useAuth();
  const [friendFollowingCreateModalConfig, setFriendFollowingCreateModalConfig] =
    useState<IFriendFollowingCreateModalProps>();

  const { isLoaded } = useSelector(({ friendFollowing }: IFriendFollowingOwnState) => friendFollowing, shallowEqual);

  const resetList = useCallback(() => {
    FriendFollowingActions.loadAction({ userProfileUid: userProfile.uid, reload: true })(dispatch);
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
      <StyledHeaderContainer $smallMargin $justifyContent="flex-end">
        <Button
          type="primary"
          onClick={() => handleCreateFriendFollowing()}
          icon={<FontAwesomeIcon icon={faPlus} />}
          text={intl.formatMessage({ id: 'friend.following.create.button' })}
        />
      </StyledHeaderContainer>
      <FriendFollowingList />
      {friendFollowingCreateModalConfig ? <FriendFollowingCreateModal {...friendFollowingCreateModalConfig} /> : null}
    </>
  );
};

export default FriendFollowing;
