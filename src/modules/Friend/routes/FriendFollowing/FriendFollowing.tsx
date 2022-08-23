import { Button, Space } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { useAuth } from '@common/contexts/AuthContext';
import FriendFollowingList from './components/FriendFollowingList';
import styles from './FriendFollowing.module.less';
import FriendFollowingCreateModal from '@modules/Friend/components/FriendFollowingCreateModal';
import { IFriendFollowingCreateModalProps } from '@modules/Friend/components/FriendFollowingCreateModal/FriendFollowingCreateModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { IFriendFollowingOwnState } from '@modules/Friend/redux/FriendFollowing/FriendFollowingInterface';
import FriendFollowingActions from '@modules/Friend/redux/FriendFollowing/FriendFollowingActions';

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
      <div className={styles.Header}>
        <Button type="primary" onClick={() => handleCreateFriendFollowing()}>
          <Space size={10}>
            <FontAwesomeIcon icon={faPlus} />
            {intl.formatMessage({ id: 'friend.following.create.button' })}
          </Space>
        </Button>
      </div>
      <FriendFollowingList />
      {friendFollowingCreateModalConfig ? <FriendFollowingCreateModal {...friendFollowingCreateModalConfig} /> : null}
    </>
  );
};

export default FriendFollowing;
