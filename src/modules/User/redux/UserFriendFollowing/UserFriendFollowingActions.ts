import { Dispatch } from 'redux';
import { collection, query, getDocs, orderBy, limit, startAfter, getDoc, doc } from 'firebase/firestore';
import { db } from '@common/util/firebase';
import { ActionsUnion, createAction as createActionHelper } from '@common/helpers/ActionHelper';
import FriendBaseModel from '@modules/Friend/models/FriendBaseModel';
import { IFriendBaseModel, IFriendBaseModelDTO } from '@modules/Friend/models/FriendBaseModel';

import { UserFriendFollowingTypes } from './UserFriendFollowingTypes';

const loadAction =
  ({
    lastFetchedUserFriendFollowing,
    userProfileUid,
    reload
  }: {
    lastFetchedUserFriendFollowing?: IFriendBaseModel;
    userProfileUid: string;
    reload?: boolean;
  }) =>
  async (dispatch: Dispatch) => {
    try {
      if (reload) {
        dispatch(UserFriendFollowingDispatch.reload());
      }

      const limitCount: number = 10;

      const startAfterUserFriendFollowing = lastFetchedUserFriendFollowing
        ? await getDoc(doc(db, 'follows', userProfileUid, 'following', lastFetchedUserFriendFollowing.id))
        : null;

      const q = startAfterUserFriendFollowing
        ? query(
            collection(db, `follows/${userProfileUid}/following`).withConverter(FriendBaseModel.converter),
            orderBy('createdAt', 'desc'),
            startAfter(startAfterUserFriendFollowing),
            limit(limitCount)
          )
        : query(
            collection(db, `follows/${userProfileUid}/following`).withConverter(FriendBaseModel.converter),
            orderBy('createdAt', 'desc'),
            limit(limitCount)
          );

      const querySnap = await getDocs(q);

      if (querySnap.docs.length === 0) {
        dispatch(UserFriendFollowingDispatch.load([]));
      } else {
        const userFriendFollowings = querySnap.docs.map((i) => i.data());
        dispatch(UserFriendFollowingDispatch.load(userFriendFollowings));
      }
    } catch (e) {}
  };

const removeAction = (userFriendFollowingId: string) => async (dispatch: Dispatch) => {
  dispatch(UserFriendFollowingDispatch.remove(userFriendFollowingId));
};

export const UserFriendFollowingDispatch = {
  reload: () => createActionHelper(UserFriendFollowingTypes.USER_FRIEND_FOLLOWING_RELOAD),
  load: (data: IFriendBaseModelDTO[]) => createActionHelper(UserFriendFollowingTypes.USER_FRIEND_FOLLOWING_LOAD, { data }),
  remove: (id: string) => createActionHelper(UserFriendFollowingTypes.USER_FRIEND_FOLLOWING_ITEM_REMOVE, { id })
};

export type UserFriendFollowingDispatchUnion = ActionsUnion<typeof UserFriendFollowingDispatch>;

export default {
  loadAction,
  removeAction
};
