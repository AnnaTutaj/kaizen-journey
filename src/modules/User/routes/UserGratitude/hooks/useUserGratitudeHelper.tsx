import { useAuth } from '@common/contexts/AuthContext';
import { IGratitudeListFiltersModel } from '@modules/Gratitude/models/GratitudeListFiltersModel';
import { useCallback } from 'react';

const useUserGratitudeHelper = () => {
  const { userProfile } = useAuth();

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
