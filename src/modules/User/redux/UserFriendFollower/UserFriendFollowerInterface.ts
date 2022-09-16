import { IFriendBaseModel } from '@modules/Friend/models/FriendBaseModel';

export interface IUserFriendFollowerOwnState {
  userFriendFollower: IUserFriendFollowerState;
}

export interface IUserFriendFollowerState {
  data: IFriendBaseModel[];
  isLoaded: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
}
