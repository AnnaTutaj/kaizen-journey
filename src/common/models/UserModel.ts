import { Language } from '@common/constants/Language';
import { IUserCategory, IUserTheme } from '@common/contexts/UserProfile/UserProfileContext';

export interface IUserModel {
  id: string;
  createdAt: {
    nanoseconds: number;
    seconds: number;
  };
  pictureURL: string;
  username: string;
  language: Language | undefined;
  tags: string[];
}

export interface IUserModelDTO {
  id: string;
  createdAt: {
    nanoseconds: number;
    seconds: number;
  };
  pictureURL: string;
  username: string;
  language: Language | undefined;
  tags: string[];
  categories: IUserCategory[];
  theme?: IUserTheme;
}

class UserModel implements IUserModel {
  constructor(
    public id: string,
    public createdAt: {
      nanoseconds: number;
      seconds: number;
    },
    public pictureURL: string,
    public username: string,
    public language: Language | undefined,
    public tags: string[],
    public categories: IUserCategory[]
  ) {}

  static build(dto: IUserModelDTO): IUserModel {
    return new UserModel(
      dto.id,
      dto.createdAt,
      dto.pictureURL || '',
      dto.username,
      dto.language,
      dto.tags,
      dto.categories
    );
  }
}

export default UserModel;
