import { IModule } from 'redux-dynamic-modules';
import { IUserFriendFollowerOwnState } from './UserFriendFollowerInterface';
import UserFriendFollowerReducer from './UserFriendFollowerReducer';

const UserFriendFollowerModule: IModule<IUserFriendFollowerOwnState> = {
  id: 'userFriendFollowerModule',
  reducerMap: {
    userFriendFollower: UserFriendFollowerReducer
  }
};

export default UserFriendFollowerModule;
