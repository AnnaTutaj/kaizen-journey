import { Dispatch } from 'redux';
import { collection, query, getDocs, orderBy, limit, startAfter, getDoc, doc } from 'firebase/firestore';
import { db } from '@common/util/firebase';
import { ActionsUnion, createAction as createActionHelper } from '@common/helpers/ActionHelper';
import FriendFollowingModel, {
  IFriendFollowingModel,
  IFriendFollowingModelDTO
} from '@modules/Friend/models/FriendFollowingModel';
import { FriendFollowingTypes } from './FriendFollowingTypes';

const loadAction =
  ({
    lastFetchedFriendFollowing,
    userProfileUid,
    reload
  }: {
    lastFetchedFriendFollowing?: IFriendFollowingModel;
    userProfileUid: string;
    reload?: boolean;
  }) =>
  async (dispatch: Dispatch) => {
    try {
      if (reload) {
        dispatch(FriendFollowingDispatch.reload());
      }

      const limitCount: number = 10;

      const startAfterFriendFollowing = lastFetchedFriendFollowing
        ? await getDoc(doc(db, 'follows', userProfileUid, 'following', lastFetchedFriendFollowing.id))
        : null;

      const q = startAfterFriendFollowing
        ? query(
            collection(db, `follows/${userProfileUid}/following`).withConverter(FriendFollowingModel.converter),
            orderBy('createdAt', 'desc'),
            startAfter(startAfterFriendFollowing),
            limit(limitCount)
          )
        : query(
            collection(db, `follows/${userProfileUid}/following`).withConverter(FriendFollowingModel.converter),
            orderBy('createdAt', 'desc'),
            limit(limitCount)
          );

      const querySnap = await getDocs(q);

      if (querySnap.docs.length === 0) {
        dispatch(FriendFollowingDispatch.load([]));
      } else {
        const friendFollowings = querySnap.docs.map((i) => i.data());
        dispatch(FriendFollowingDispatch.load(friendFollowings));
      }
    } catch (e) {}
  };

const removeAction = (friendFollowingId: string) => async (dispatch: Dispatch) => {
  dispatch(FriendFollowingDispatch.remove(friendFollowingId));
};

export const FriendFollowingDispatch = {
  reload: () => createActionHelper(FriendFollowingTypes.FRIEND_FOLLOWING_RELOAD),
  load: (data: IFriendFollowingModelDTO[]) => createActionHelper(FriendFollowingTypes.FRIEND_FOLLOWING_LOAD, { data }),
  remove: (id: string) => createActionHelper(FriendFollowingTypes.FRIEND_FOLLOWING_ITEM_REMOVE, { id })
};

export type FriendFollowingDispatchUnion = ActionsUnion<typeof FriendFollowingDispatch>;

export default {
  loadAction,
  removeAction
};
