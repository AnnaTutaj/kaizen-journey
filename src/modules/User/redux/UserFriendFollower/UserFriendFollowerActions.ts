import { Dispatch } from 'redux';
import { collection, query, getDocs, orderBy, limit, startAfter, getDoc, doc } from 'firebase/firestore';
import { db } from '@common/util/firebase';
import { ActionsUnion, createAction as createActionHelper } from '@common/helpers/ActionHelper';
import FriendBaseModel from '@modules/Friend/models/FriendBaseModel';
import { IFriendBaseModel, IFriendBaseModelDTO } from '@modules/Friend/models/FriendBaseModel';
import { UserFriendFollowerTypes } from './UserFriendFollowerTypes';

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
        ? await getDoc(doc(db, 'follows', userProfileUid, 'followers', lastFetchedUserFriendFollower.id))
        : null;

      const q = startAfterUserFriendFollower
        ? query(
            collection(db, `follows/${userProfileUid}/followers`).withConverter(FriendBaseModel.converter),
            orderBy('createdAt', 'desc'),
            startAfter(startAfterUserFriendFollower),
            limit(limitCount)
          )
        : query(
            collection(db, `follows/${userProfileUid}/followers`).withConverter(FriendBaseModel.converter),
            orderBy('createdAt', 'desc'),
            limit(limitCount)
          );

      const querySnap = await getDocs(q);

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
  load: (data: IFriendBaseModelDTO[]) => createActionHelper(UserFriendFollowerTypes.USER_FRIEND_FOLLOWER_LOAD, { data }),
  remove: (id: string) => createActionHelper(UserFriendFollowerTypes.USER_FRIEND_FOLLOWER_ITEM_REMOVE, { id })
};

export type UserFriendFollowerDispatchUnion = ActionsUnion<typeof UserFriendFollowerDispatch>;

export default {
  loadAction,
  removeAction
};
