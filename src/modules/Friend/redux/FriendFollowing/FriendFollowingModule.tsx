import { IModule } from 'redux-dynamic-modules';
import { IFriendFollowingOwnState } from './FriendFollowingInterface';
import FriendFollowingReducer from './FriendFollowingReducer';

const FriendFollowingModule: IModule<IFriendFollowingOwnState> = {
  id: 'friendFollowingModule',
  reducerMap: {
    friendFollowing: FriendFollowingReducer
  }
};

export default FriendFollowingModule;
