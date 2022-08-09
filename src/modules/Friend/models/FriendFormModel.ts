import { IUserModel } from '@common/models/UserModel';
import { FieldValue, serverTimestamp } from 'firebase/firestore';

export interface IFriendFormModel {
  id: string;
}

export interface IFriendCreateFormModelDTO {
  username: string;
  pictureURL: string;
  createdAt: FieldValue;
}

class FriendFormModel {
  static serializeToCreate({
    username,
    pictureURL
  }: Pick<IUserModel, 'username' | 'pictureURL'>): IFriendCreateFormModelDTO {
    return {
      username,
      pictureURL: pictureURL || '',
      createdAt: serverTimestamp()
    };
  }
}

export default FriendFormModel;
