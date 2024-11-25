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
}

export default FriendBaseModel;
