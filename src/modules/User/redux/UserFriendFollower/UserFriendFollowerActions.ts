import { Dispatch } from 'redux';
import { orderBy, limit, startAfter } from 'firebase/firestore';
import { ActionsUnion, createAction as createActionHelper } from '@common/helpers/ActionHelper';
import { IFriendBaseModel, IFriendBaseModelDTO } from '@modules/Friend/models/FriendBaseModel';
import { UserFriendFollowerTypes } from './UserFriendFollowerTypes';
import FriendResource from '@modules/Friend/api/FriendResource';

const loadAction =
  ({
    lastFetchedUserFriendFollower,
    userProfileUid,
    reload
  }: {
    lastFetchedUserFriendFollower?: IFriendBaseModel;
    userProfileUid: string;
    reload?: boolean;
  }) =>
  async (dispatch: Dispatch) => {
    try {
      if (reload) {
        dispatch(UserFriendFollowerDispatch.reload());
      }

      const limitCount: number = 10;

      const startAfterUserFriendFollower = lastFetchedUserFriendFollower
        ? await FriendResource.fetchFollowerById(userProfileUid, lastFetchedUserFriendFollower.id)
        : null;

      const querySnap = await FriendResource.fetchFollowersCollection(
        userProfileUid,
        startAfterUserFriendFollower
          ? [orderBy('createdAt', 'desc'), startAfter(startAfterUserFriendFollower), limit(limitCount)]
          : [orderBy('createdAt', 'desc'), limit(limitCount)]
      );

      if (querySnap.docs.length === 0) {
        dispatch(UserFriendFollowerDispatch.load([]));
      } else {
        const userFriendFollowers = querySnap.docs.map((i) => i.data());
        dispatch(UserFriendFollowerDispatch.load(userFriendFollowers));
      }
    } catch (e) {}
  };

const removeAction = (userFriendFollowerId: string) => async (dispatch: Dispatch) => {
  dispatch(UserFriendFollowerDispatch.remove(userFriendFollowerId));
};

export const UserFriendFollowerDispatch = {
  reload: () => createActionHelper(UserFriendFollowerTypes.USER_FRIEND_FOLLOWER_RELOAD),
  load: (data: IFriendBaseModelDTO[]) =>
    createActionHelper(UserFriendFollowerTypes.USER_FRIEND_FOLLOWER_LOAD, { data }),
  remove: (id: string) => createActionHelper(UserFriendFollowerTypes.USER_FRIEND_FOLLOWER_ITEM_REMOVE, { id })
};

export type UserFriendFollowerDispatchUnion = ActionsUnion<typeof UserFriendFollowerDispatch>;

export default {
  loadAction,
  removeAction
};
