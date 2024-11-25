import FriendBaseModel, { IFriendBaseModel } from '@modules/Friend/models/FriendBaseModel';
import { useUserProfile } from '@common/contexts/UserProfile/UserProfileContext';
import { useCallback } from 'react';
import { IUserModel } from '@common/models/UserModel';
import FriendResource from '../api/FriendResource';

const useFriendFollowFetch = () => {
  const { userProfile } = useUserProfile();

  const getFollowingById = useCallback(
    async (userId: string, followingId: string): Promise<IFriendBaseModel | null> => {
      const docSnap = await FriendResource.fetchFollowingById(userId, followingId);
      if (docSnap.exists()) {
        return FriendBaseModel.build(docSnap.data());
      } else {
        return null;
      }
    },
    []
  );

  const followUser = useCallback(
    async (searchedUser: Pick<IUserModel, 'id' | 'username' | 'pictureURL'>): Promise<void> => {
      await FriendResource.followUser(searchedUser, userProfile);
    },
    [userProfile]
  );

  const deleteFollowing = useCallback(
    async (id: string): Promise<void> => {
      await FriendResource.deleteFollowing(id, userProfile.uid);
    },
    [userProfile]
  );

  const deleteFollower = useCallback(
    async (id: string): Promise<void> => {
      await FriendResource.deleteFollower(id, userProfile.uid);
    },
    [userProfile]
  );

  return {
    getFollowingById,
    followUser,
    deleteFollowing,
    deleteFollower
  };
};

export default useFriendFollowFetch;
