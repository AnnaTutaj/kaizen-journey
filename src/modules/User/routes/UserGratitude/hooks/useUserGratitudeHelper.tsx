import { useUserProfile } from '@common/contexts/UserProfile/UserProfileContext';
import { IGratitudeListFiltersModel } from '@modules/Gratitude/models/GratitudeListFiltersModel';
import { useCallback } from 'react';

const useUserGratitudeHelper = () => {
  const { userProfile } = useUserProfile();

  const prepareFiltersByUser = useCallback(
    (filters: Partial<IGratitudeListFiltersModel>, userId: string) => {
      let finalFilters = { ...filters };
      if (userId !== userProfile.uid) {
        finalFilters.isPublic = true;
      }
      return finalFilters;
    },
    [userProfile.uid]
  );

  return { prepareFiltersByUser };
};

export default useUserGratitudeHelper;
