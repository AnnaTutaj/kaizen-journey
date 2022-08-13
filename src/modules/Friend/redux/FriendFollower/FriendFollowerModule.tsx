import { IModule } from 'redux-dynamic-modules';
import { IFriendFollowerOwnState } from './FriendFollowerInterface';
import FriendFollowerReducer from './FriendFollowerReducer';

const FriendFollowerModule: IModule<IFriendFollowerOwnState> = {
  id: 'friendFollowerModule',
  reducerMap: {
    friendFollower: FriendFollowerReducer
  }
};

export default FriendFollowerModule;
