import { doc, getDoc, writeBatch } from 'firebase/firestore';
import { db } from '@common/util/firebase';
import FriendFollowingModel, { IFriendFollowingModel } from '@modules/Friend/models/FriendFollowingModel';
import { useAuth } from '@common/contexts/AuthContext';
import { useCallback } from 'react';
import FriendFormModel from '../models/FriendFormModel';
import { ISearchedUser } from '../components/FriendFollowingCreateModal/FriendFollowingCreateModal';

const useFriendFollowFetch = () => {
  const { userProfile } = useAuth();

  const getFollowingById = useCallback(
    async (userId: string, followingId: string): Promise<IFriendFollowingModel | null> => {
      const docRef = doc(db, 'follows', userId, 'following', followingId).withConverter(FriendFollowingModel.converter);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return FriendFollowingModel.build(docSnap.data());
      } else {
        return null;
      }
    },
    []
  );

  const followUser = useCallback(
    async (searchedUser: ISearchedUser): Promise<void> => {
      if (!userProfile) {
        return;
      }

      const batch = writeBatch(db);

      const finalFollowingValues = FriendFormModel.serializeToCreate({
        ...searchedUser
      });

      //todo przeniesc to wspolnego modelu
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
      if (!userProfile) {
        return;
      }

      const batch = writeBatch(db);

      const followingRef = doc(db, 'follows', userProfile.uid, 'following', id);
      batch.delete(followingRef);

      const followerRef = doc(db, 'follows', id, 'followers', userProfile.uid);
      batch.delete(followerRef);

      await batch.commit();
    },
    [userProfile]
  );

  return {
    getFollowingById,
    followUser,
    deleteFollowing
  };
};

export default useFriendFollowFetch;
