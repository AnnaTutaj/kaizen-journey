import { memo, useState } from 'react';
import { IUserProfile, UserProfileContext, initUserProfile } from './UserProfileContext';

const UserProfileProvider = ({ children }: any) => {
  const [userProfile, setUserProfile] = useState<IUserProfile>(initUserProfile);

  return <UserProfileContext.Provider value={{ userProfile, setUserProfile }}>{children}</UserProfileContext.Provider>;
};

export default memo(UserProfileProvider) as typeof UserProfileProvider;
