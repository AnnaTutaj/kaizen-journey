import { produce } from 'immer';
import _ from 'lodash';
import FriendBaseModel from '@modules/Friend/models/FriendBaseModel';
import { UserFriendFollowerDispatchUnion } from './UserFriendFollowerActions';
import { IUserFriendFollowerState } from './UserFriendFollowerInterface';
import { UserFriendFollowerTypes } from './UserFriendFollowerTypes';

const initialState: IUserFriendFollowerState = {
  data: [],
  isLoaded: false,
  isLoadingMore: false,
  hasMore: false
};

const UserFriendFollowerReducer = (state = initialState, action: UserFriendFollowerDispatchUnion): IUserFriendFollowerState =>
  produce(state, (draft) => {
    switch (action.type) {
      case UserFriendFollowerTypes.USER_FRIEND_FOLLOWER_RELOAD: {
        draft.data = initialState.data;
        draft.isLoadingMore = initialState.isLoadingMore;
        draft.isLoaded = initialState.isLoaded;
        draft.hasMore = initialState.hasMore;

        break;
      }

      case UserFriendFollowerTypes.USER_FRIEND_FOLLOWER_LOAD: {
        const nextUserFriendFollowers = action.payload.data.map((i) => FriendBaseModel.build(i));
        const array = _.uniqBy([...draft.data, ...nextUserFriendFollowers], 'id');
        const sortedArray = _.orderBy(array, [(item) => item.createdAt.seconds], ['desc']);
        draft.data = sortedArray;
        draft.isLoadingMore = false;
        draft.isLoaded = true;
        draft.hasMore = nextUserFriendFollowers && nextUserFriendFollowers.length > 1;

        break;
      }

      case UserFriendFollowerTypes.USER_FRIEND_FOLLOWER_ITEM_REMOVE: {
        draft.data = _.remove(draft.data, (i) => i.id !== action.payload.id);

        break;
      }
    }
  });

export default UserFriendFollowerReducer;
