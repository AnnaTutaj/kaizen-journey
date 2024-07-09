import { Language } from '@common/constants/Language';
import { CategoryColorType } from '@common/containers/App/ColorPalette';
import { createContext, Dispatch, SetStateAction, useContext } from 'react';

export interface IUserTheme {
  colorPrimary?: string;
  colorSecondary?: string;
  colorCategoryDefault?: string;
  colorCategoryDefaultHover?: string;
}

export interface IUserCategory {
  color: CategoryColorType;
  name: string;
  isSelected: boolean;
}

export interface IUserProfile {
  uid: string;
  createdAt: {
    nanoseconds: number;
    seconds: number;
  };
  pictureURL: string;
  username: string;
  language: Language | undefined;
  tags: string[];
  categories: IUserCategory[];
  theme: IUserTheme;
}

export const initUserProfile = {
  uid: '',
  createdAt: {
    nanoseconds: 0,
    seconds: 0
  },
  pictureURL: '',
  username: '',
  language: Language.en,
  tags: [],
  categories: [],
  theme: {}
};

export const UserProfileContext = createContext<{
  userProfile: IUserProfile;
  setUserProfile: Dispatch<SetStateAction<IUserProfile>>;
}>({
  userProfile: { ...initUserProfile },
  setUserProfile: () => {}
}) as React.Context<{
  userProfile: IUserProfile;
  setUserProfile: Dispatch<SetStateAction<IUserProfile>>;
}>;

export const useUserProfile = () => useContext(UserProfileContext);
