import { IFriendBaseModel } from '@modules/Friend/models/FriendBaseModel';

export interface IFriendFollowingOwnState {
  friendFollowing: IFriendFollowingState;
}

export interface IFriendFollowingState {
  data: IFriendBaseModel[];
  isLoaded: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
}
