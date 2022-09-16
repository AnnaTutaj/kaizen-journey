import { produce } from 'immer';
import _ from 'lodash';
import FriendBaseModel from '@modules/Friend/models/FriendBaseModel';
import { UserFriendFollowingDispatchUnion } from './UserFriendFollowingActions';
import { IUserFriendFollowingState } from './UserFriendFollowingInterface';
import { UserFriendFollowingTypes } from './UserFriendFollowingTypes';

const initialState: IUserFriendFollowingState = {
  data: [],
  isLoaded: false,
  isLoadingMore: false,
  hasMore: false
};

const UserFriendFollowingReducer = (state = initialState, action: UserFriendFollowingDispatchUnion): IUserFriendFollowingState =>
  produce(state, (draft) => {
    switch (action.type) {
      case UserFriendFollowingTypes.USER_FRIEND_FOLLOWING_RELOAD: {
        draft.data = initialState.data;
        draft.isLoadingMore = initialState.isLoadingMore;
        draft.isLoaded = initialState.isLoaded;
        draft.hasMore = initialState.hasMore;

        break;
      }

      case UserFriendFollowingTypes.USER_FRIEND_FOLLOWING_LOAD: {
        const nextUserFriendFollowings = action.payload.data.map((i) => FriendBaseModel.build(i));
        const array = _.uniqBy([...draft.data, ...nextUserFriendFollowings], 'id');
        const sortedArray = _.orderBy(array, [(item) => item.createdAt.seconds], ['desc']);
        draft.data = sortedArray;
        draft.isLoadingMore = false;
        draft.isLoaded = true;
        draft.hasMore = nextUserFriendFollowings && nextUserFriendFollowings.length > 1;

        break;
      }

      case UserFriendFollowingTypes.USER_FRIEND_FOLLOWING_ITEM_REMOVE: {
        draft.data = _.remove(draft.data, (i) => i.id !== action.payload.id);

        break;
      }
    }
  });

export default UserFriendFollowingReducer;
