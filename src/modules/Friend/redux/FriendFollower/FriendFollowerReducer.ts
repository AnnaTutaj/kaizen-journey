import { produce } from 'immer';
import _ from 'lodash';
import FriendBaseModel from '@modules/Friend/models/FriendBaseModel';
import { FriendFollowerDispatchUnion } from './FriendFollowerActions';
import { IFriendFollowerState } from './FriendFollowerInterface';
import { FriendFollowerTypes } from './FriendFollowerTypes';

const initialState: IFriendFollowerState = {
  data: [],
  isLoaded: false,
  isLoadingMore: false,
  hasMore: false
};

const FriendFollowerReducer = (state = initialState, action: FriendFollowerDispatchUnion): IFriendFollowerState =>
  produce(state, (draft) => {
    switch (action.type) {
      case FriendFollowerTypes.FRIEND_FOLLOWER_RELOAD: {
        draft.data = initialState.data;
        draft.isLoadingMore = initialState.isLoadingMore;
        draft.isLoaded = initialState.isLoaded;
        draft.hasMore = initialState.hasMore;

        break;
      }

      case FriendFollowerTypes.FRIEND_FOLLOWER_LOAD: {
        const nextFriendFollowers = action.payload.data.map((i) => FriendBaseModel.build(i));
        const array = _.uniqBy([...draft.data, ...nextFriendFollowers], 'id');
        const sortedArray = _.orderBy(array, [(item) => item.createdAt.seconds], ['desc']);
        draft.data = sortedArray;
        draft.isLoadingMore = false;
        draft.isLoaded = true;
        draft.hasMore = nextFriendFollowers && nextFriendFollowers.length > 1;

        break;
      }

      case FriendFollowerTypes.FRIEND_FOLLOWER_ITEM_REMOVE: {
        draft.data = _.remove(draft.data, (i) => i.id !== action.payload.id);

        break;
      }
    }
  });

export default FriendFollowerReducer;
