import { IFriendFollowingModel } from './../../models/FriendFollowingModel';

export interface IFriendFollowingOwnState {
  friendFollowing: IFriendFollowingState;
}

export interface IFriendFollowingState {
  data: IFriendFollowingModel[];
  isLoaded: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
}
