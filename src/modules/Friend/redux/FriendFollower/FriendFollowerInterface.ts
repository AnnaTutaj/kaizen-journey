import { IFriendBaseModel } from '@modules/Friend/models/FriendBaseModel';

export interface IFriendFollowerOwnState {
  friendFollower: IFriendFollowerState;
}

export interface IFriendFollowerState {
  data: IFriendBaseModel[];
  isLoaded: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
}
