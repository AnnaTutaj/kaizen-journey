import { Dispatch } from 'redux';
import { orderBy, limit, startAfter } from 'firebase/firestore';
import { ActionsUnion, createAction as createActionHelper } from '@common/helpers/ActionHelper';
import { IFriendBaseModel, IFriendBaseModelDTO } from '@modules/Friend/models/FriendBaseModel';
import { UserFriendFollowingTypes } from './UserFriendFollowingTypes';
import FriendResource from '@modules/Friend/api/FriendResource';

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
        ? await FriendResource.fetchFollowingById(userProfileUid, lastFetchedUserFriendFollowing.id)
        : null;

      const querySnap = await FriendResource.fetchFollowingCollection(
        userProfileUid,
        startAfterUserFriendFollowing
          ? [orderBy('createdAt', 'desc'), startAfter(startAfterUserFriendFollowing), limit(limitCount)]
          : [orderBy('createdAt', 'desc'), limit(limitCount)]
      );

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
  load: (data: IFriendBaseModelDTO[]) =>
    createActionHelper(UserFriendFollowingTypes.USER_FRIEND_FOLLOWING_LOAD, { data }),
  remove: (id: string) => createActionHelper(UserFriendFollowingTypes.USER_FRIEND_FOLLOWING_ITEM_REMOVE, { id })
};

export type UserFriendFollowingDispatchUnion = ActionsUnion<typeof UserFriendFollowingDispatch>;

export default {
  loadAction,
  removeAction
};
