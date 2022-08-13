import { db } from '@common/util/firebase';
import { doc, DocumentSnapshot, QueryDocumentSnapshot, getDoc } from 'firebase/firestore';

export interface IFriendBaseModel {
  id: string;
  createdAt: {
    nanoseconds: number;
    seconds: number;
  };
  pictureURL: string;
  username: string;
}

export interface IFriendBaseModelDTO {
  id: string;
  createdAt: {
    nanoseconds: number;
    seconds: number;
  };
  pictureURL: string;
  username: string;
}

class FriendBaseModel implements IFriendBaseModel {
  constructor(
    public id: string,
    public createdAt: {
      nanoseconds: number;
      seconds: number;
    },
    public pictureURL: string,
    public username: string
  ) {}

  static build(dto: IFriendBaseModelDTO): IFriendBaseModel {
    return new FriendBaseModel(dto.id, dto.createdAt, dto.pictureURL, dto.username);
  }

  static converter = {
    toFirestore: (data: IFriendBaseModelDTO) => data,
    fromFirestore: (snap: QueryDocumentSnapshot) => {
      return { id: snap.id, ...snap.data() } as IFriendBaseModelDTO;
    }
  };

  static fetchFollowingById = async (
    userId: string,
    followingId: string
  ): Promise<DocumentSnapshot<IFriendBaseModelDTO>> =>
    getDoc(doc(db, 'follows', userId, 'following', followingId).withConverter(FriendBaseModel.converter));

  static fetchFollowerById = async (
    userId: string,
    followerId: string
  ): Promise<DocumentSnapshot<IFriendBaseModelDTO>> =>
    getDoc(doc(db, 'follows', userId, 'follower', followerId).withConverter(FriendBaseModel.converter));
}

export default FriendBaseModel;
