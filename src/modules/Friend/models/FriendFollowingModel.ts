import { QueryDocumentSnapshot } from '@firebase/firestore';
import { db } from '@common/util/firebase';
import { doc, getDoc } from 'firebase/firestore';

export interface IFriendFollowingModel {
  id: string;
  createdAt: {
    nanoseconds: number;
    seconds: number;
  };
  pictureURL: string;
  username: string;
}

export interface IFriendFollowingModelDTO {
  id: string;
  createdAt: {
    nanoseconds: number;
    seconds: number;
  };
  pictureURL: string;
  username: string;
}

class FriendFollowingModel implements IFriendFollowingModel {
  constructor(
    public id: string,
    public createdAt: {
      nanoseconds: number;
      seconds: number;
    },
    public pictureURL: string,
    public username: string
  ) {}

  static build(dto: IFriendFollowingModelDTO): IFriendFollowingModel {
    return new FriendFollowingModel(dto.id, dto.createdAt, dto.pictureURL, dto.username);
  }

  static converter = {
    toFirestore: (data: IFriendFollowingModelDTO) => data,
    fromFirestore: (snap: QueryDocumentSnapshot) => {
      return { id: snap.id, ...snap.data() } as IFriendFollowingModelDTO;
    }
  };

  static fetchById = (userId: string, followingId: string) =>
    getDoc(doc(db, 'follows', userId, 'following', followingId).withConverter(FriendFollowingModel.converter));
}

export default FriendFollowingModel;
