import { IUserModel } from '@common/models/UserModel';
import { IFriendBaseModelDTO } from '../models/FriendBaseModel';
import { db } from '@common/util/firebase';
import {
  doc,
  DocumentSnapshot,
  QueryDocumentSnapshot,
  getDoc,
  collection,
  query,
  QueryConstraint,
  getDocs,
  writeBatch
} from 'firebase/firestore';
import FriendFormModel from '../models/FriendFormModel';
import { IUserProfile } from '@common/contexts/UserProfile/UserProfileContext';

const converter = {
  toFirestore: (data: IFriendBaseModelDTO) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => {
    return { id: snap.id, ...snap.data() } as IFriendBaseModelDTO;
  }
};

export const FriendResource = {
  fetchFollowingById: (userId: string, followingId: string): Promise<DocumentSnapshot<IFriendBaseModelDTO>> =>
    getDoc(doc(db, 'follows', userId, 'following', followingId).withConverter(converter)),
  fetchFollowerById: (userId: string, followerId: string): Promise<DocumentSnapshot<IFriendBaseModelDTO>> =>
    getDoc(doc(db, 'follows', userId, 'follower', followerId).withConverter(converter)),
  fetchFollowersCollection: (userId: string, queryParams: QueryConstraint[]) =>
    getDocs(query(collection(db, `follows/${userId}/followers`).withConverter(converter), ...queryParams)),
  fetchFollowingCollection: (userId: string, queryParams: QueryConstraint[]) =>
    getDocs(query(collection(db, `follows/${userId}/following`).withConverter(converter), ...queryParams)),
  followUser: async (searchedUser: Pick<IUserModel, 'id' | 'username' | 'pictureURL'>, userProfile: IUserProfile) => {
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
  deleteFollowing: async (id: string, userProfileUid: string) => {
    {
      const batch = writeBatch(db);

      const followingRef = doc(db, 'follows', userProfileUid, 'following', id);
      batch.delete(followingRef);

      const followerRef = doc(db, 'follows', id, 'followers', userProfileUid);
      batch.delete(followerRef);

      await batch.commit();
    }
  },
  deleteFollower: async (id: string, userProfileUid: string) => {
    const batch = writeBatch(db);

    const followingRef = doc(db, 'follows', id, 'following', userProfileUid);
    batch.delete(followingRef);

    const followerRef = doc(db, 'follows', userProfileUid, 'followers', id);
    batch.delete(followerRef);

    await batch.commit();
  }
};

export default FriendResource;
