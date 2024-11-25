import { FriendResource } from './../../api/FriendResource';
import { Dispatch } from 'redux';
import { orderBy, limit, startAfter } from 'firebase/firestore';
import { ActionsUnion, createAction as createActionHelper } from '@common/helpers/ActionHelper';
import { IFriendBaseModel, IFriendBaseModelDTO } from '@modules/Friend/models/FriendBaseModel';

import { FriendFollowingTypes } from './FriendFollowingTypes';

const loadAction =
  ({
    lastFetchedFriendFollowing,
    userProfileUid,
    reload
  }: {
    lastFetchedFriendFollowing?: IFriendBaseModel;
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
        ? await FriendResource.fetchFollowingById(userProfileUid, lastFetchedFriendFollowing.id)
        : null;

      const querySnap = await FriendResource.fetchFollowingCollection(
        userProfileUid,
        startAfterFriendFollowing
          ? [orderBy('createdAt', 'desc'), startAfter(startAfterFriendFollowing), limit(limitCount)]
          : [orderBy('createdAt', 'desc'), limit(limitCount)]
      );

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
  load: (data: IFriendBaseModelDTO[]) => createActionHelper(FriendFollowingTypes.FRIEND_FOLLOWING_LOAD, { data }),
  remove: (id: string) => createActionHelper(FriendFollowingTypes.FRIEND_FOLLOWING_ITEM_REMOVE, { id })
};

export type FriendFollowingDispatchUnion = ActionsUnion<typeof FriendFollowingDispatch>;

export default {
  loadAction,
  removeAction
};
