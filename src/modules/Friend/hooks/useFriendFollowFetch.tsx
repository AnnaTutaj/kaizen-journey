import { doc, writeBatch } from 'firebase/firestore';
import { db } from '@common/util/firebase';
import FriendBaseModel, { IFriendBaseModel } from '@modules/Friend/models/FriendBaseModel';
import { useAuth } from '@common/contexts/AuthContext';
import { useCallback } from 'react';
import FriendFormModel from '../models/FriendFormModel';
import { IUserModel } from '@common/models/UserModel';

const useFriendFollowFetch = () => {
  const { userProfile } = useAuth();

  const getFollowingById = useCallback(
    async (userId: string, followingId: string): Promise<IFriendBaseModel | null> => {
      const docSnap = await FriendBaseModel.fetchFollowingById(userId, followingId);
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
      const batch = writeBatch(db);

      const finalFollowingValues = FriendFormModel.serializeToCreate({
        ...searchedUser
      });

      const finalFollowerValues = FriendFormModel.serializeToCreate({ ...userProfile });

      const followingRef = doc(db, 'follows', userProfile.uid, 'following', searchedUser.id);
      batch.set(followingRef, { ...finalFollowingValues });

      const followersRef = doc(db, 'follows', searchedUser.id, 'followers', userProfile.uid);
      batch.set(followersRef, { ...finalFollowerValues });
      await batch.commit();
    },
    [userProfile]
  );

  const deleteFollowing = useCallback(
    async (id: string): Promise<void> => {
      const batch = writeBatch(db);

      const followingRef = doc(db, 'follows', userProfile.uid, 'following', id);
      batch.delete(followingRef);

      const followerRef = doc(db, 'follows', id, 'followers', userProfile.uid);
      batch.delete(followerRef);

      await batch.commit();
    },
    [userProfile]
  );

  const deleteFollower = useCallback(
    async (id: string): Promise<void> => {
      const batch = writeBatch(db);

      const followingRef = doc(db, 'follows', id, 'following', userProfile.uid);
      batch.delete(followingRef);

      const followerRef = doc(db, 'follows', userProfile.uid, 'followers', id);
      batch.delete(followerRef);

      await batch.commit();
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
