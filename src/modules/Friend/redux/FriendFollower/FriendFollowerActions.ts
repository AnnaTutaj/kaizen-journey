import { FriendResource } from './../../api/FriendResource';
import { Dispatch } from 'redux';
import { orderBy, limit, startAfter } from 'firebase/firestore';
import { ActionsUnion, createAction as createActionHelper } from '@common/helpers/ActionHelper';
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
        ? await FriendResource.fetchFollowerById(userProfileUid, lastFetchedFriendFollower.id)
        : null;

      const querySnap = await FriendResource.fetchFollowersCollection(
        userProfileUid,
        startAfterFriendFollower
          ? [orderBy('createdAt', 'desc'), startAfter(startAfterFriendFollower), limit(limitCount)]
          : [orderBy('createdAt', 'desc'), limit(limitCount)]
      );

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
