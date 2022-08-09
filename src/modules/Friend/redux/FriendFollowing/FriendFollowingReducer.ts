import { produce } from 'immer';
import _ from 'lodash';
import FriendFollowingModel from '@modules/Friend/models/FriendFollowingModel';
import { FriendFollowingDispatchUnion } from './FriendFollowingActions';
import { IFriendFollowingState } from './FriendFollowingInterface';
import { FriendFollowingTypes } from './FriendFollowingTypes';

const initialState: IFriendFollowingState = {
  data: [],
  isLoaded: false,
  isLoadingMore: false,
  hasMore: false
};

const FriendFollowingReducer = (state = initialState, action: FriendFollowingDispatchUnion): IFriendFollowingState =>
  produce(state, (draft) => {
    switch (action.type) {
      case FriendFollowingTypes.FRIEND_FOLLOWING_RELOAD: {
        draft.data = initialState.data;
        draft.isLoadingMore = initialState.isLoadingMore;
        draft.isLoaded = initialState.isLoaded;
        draft.hasMore = initialState.hasMore;

        break;
      }

      case FriendFollowingTypes.FRIEND_FOLLOWING_LOAD: {
        const nextFriendFollowings = action.payload.data.map((i) => FriendFollowingModel.build(i));
        const array = _.uniqBy([...draft.data, ...nextFriendFollowings], 'id');
        const sortedArray = _.orderBy(array, [(item) => item.createdAt.seconds], ['desc']);
        draft.data = sortedArray;
        draft.isLoadingMore = false;
        draft.isLoaded = true;
        draft.hasMore = nextFriendFollowings && nextFriendFollowings.length > 1;

        break;
      }

      case FriendFollowingTypes.FRIEND_FOLLOWING_ITEM_REMOVE: {
        draft.data = _.remove(draft.data, (i) => i.id !== action.payload.id);

        break;
      }
    }
  });

export default FriendFollowingReducer;
