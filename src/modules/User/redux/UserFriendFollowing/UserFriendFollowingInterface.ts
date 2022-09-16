import { IFriendBaseModel } from '@modules/Friend/models/FriendBaseModel';

export interface IUserFriendFollowingOwnState {
  userFriendFollowing: IUserFriendFollowingState;
}

export interface IUserFriendFollowingState {
  data: IFriendBaseModel[];
  isLoaded: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
}
