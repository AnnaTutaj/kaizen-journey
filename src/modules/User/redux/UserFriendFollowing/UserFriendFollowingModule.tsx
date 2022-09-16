import { IModule } from 'redux-dynamic-modules';
import { IUserFriendFollowingOwnState } from './UserFriendFollowingInterface';
import UserFriendFollowingReducer from './UserFriendFollowingReducer';

const UserFriendFollowingModule: IModule<IUserFriendFollowingOwnState> = {
  id: 'userFriendFollowingModule',
  reducerMap: {
    userFriendFollowing: UserFriendFollowingReducer
  }
};

export default UserFriendFollowingModule;
