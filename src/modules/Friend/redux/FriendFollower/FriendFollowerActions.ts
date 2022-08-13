import { Dispatch } from 'redux';
import { collection, query, getDocs, orderBy, limit, startAfter, getDoc, doc } from 'firebase/firestore';
import { db } from '@common/util/firebase';
import { ActionsUnion, createAction as createActionHelper } from '@common/helpers/ActionHelper';
import FriendBaseModel from '@modules/Friend/models/FriendBaseModel';
import { IFriendBaseModel, IFriendBaseModelDTO } from '@modules/Friend/models/FriendBaseModel';
import { FriendFollowerTypes } from './FriendFollowerTypes';

const loadAction =
  ({
    lastFetchedFriendFollower,
    userProfileUid,
    reload
  }: {
    lastFetchedFriendFollower?: IFriendBaseModel;
    userProfileUid: string;
    reload?: boolean;
  }) =>
  async (dispatch: Dispatch) => {
    try {
      if (reload) {
        dispatch(FriendFollowerDispatch.reload());
      }

      const limitCount: number = 10;

      const startAfterFriendFollower = lastFetchedFriendFollower
        ? await getDoc(doc(db, 'follows', userProfileUid, 'followers', lastFetchedFriendFollower.id))
        : null;

      const q = startAfterFriendFollower
        ? query(
            collection(db, `follows/${userProfileUid}/followers`).withConverter(FriendBaseModel.converter),
            orderBy('createdAt', 'desc'),
            startAfter(startAfterFriendFollower),
            limit(limitCount)
          )
        : query(
            collection(db, `follows/${userProfileUid}/followers`).withConverter(FriendBaseModel.converter),
            orderBy('createdAt', 'desc'),
            limit(limitCount)
          );

      const querySnap = await getDocs(q);

      if (querySnap.docs.length === 0) {
        dispatch(FriendFollowerDispatch.load([]));
      } else {
        const friendFollowers = querySnap.docs.map((i) => i.data());
        dispatch(FriendFollowerDispatch.load(friendFollowers));
      }
    } catch (e) {}
  };

const removeAction = (friendFollowerId: string) => async (dispatch: Dispatch) => {
  dispatch(FriendFollowerDispatch.remove(friendFollowerId));
};

export const FriendFollowerDispatch = {
  reload: () => createActionHelper(FriendFollowerTypes.FRIEND_FOLLOWER_RELOAD),
  load: (data: IFriendBaseModelDTO[]) => createActionHelper(FriendFollowerTypes.FRIEND_FOLLOWER_LOAD, { data }),
  remove: (id: string) => createActionHelper(FriendFollowerTypes.FRIEND_FOLLOWER_ITEM_REMOVE, { id })
};

export type FriendFollowerDispatchUnion = ActionsUnion<typeof FriendFollowerDispatch>;

export default {
  loadAction,
  removeAction
};
