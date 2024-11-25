import { where, orderBy, limit } from 'firebase/firestore';
import GratitudeModel from '@modules/Gratitude/models/GratitudeModel';
import { useUserProfile } from '@common/contexts/UserProfile/UserProfileContext';
import { IGratitudeListFiltersModelDTO } from '../models/GratitudeListFiltersModel';
import { useCallback } from 'react';
import GratitudeResource from '../api/GratitudeResource';

interface IProps {
  mode: 'myList' | 'public';
  filters?: IGratitudeListFiltersModelDTO | undefined;
  limitCount?: number;
}

const useGratitudeListFetch = () => {
  const { userProfile } = useUserProfile();

  const limitFetch = useCallback(({ mode, limitCount }: Pick<IProps, 'mode' | 'limitCount'>): number => {
    if (limitCount) {
      return limitCount;
    }

    if (limitCount === 0) {
      return 0;
    }

    return mode === 'myList' ? 10 : 5;
  }, []);

  const getGratitudes = async ({ mode, filters, limitCount }: IProps) => {
    const whereConditionByMode =
      mode === 'myList' ? where('createdByUid', '==', userProfile.uid) : where('isPublic', '==', true);

    const conditions = [whereConditionByMode];
    if (filters?.color) {
      conditions.push(where('color', '==', filters.color));
    }

    if (filters?.tags) {
      conditions.push(where('tags', 'array-contains-any', filters.tags));
    }

    if (filters?.isPublic !== undefined) {
      conditions.push(where('isPublic', '==', filters.isPublic));
    }

    const _limit = limitFetch({ mode, limitCount });
    if (_limit > 0) {
      conditions.push(limit(_limit));
    }

    if (filters?.dateFrom !== undefined) {
      conditions.push(where('date', '>=', filters.dateFrom));
    }

    if (filters?.dateTo !== undefined) {
      conditions.push(where('date', '<=', filters.dateTo));
    }

    const querySnap = await GratitudeResource.fetchCollection([...conditions, orderBy('date', 'desc')]);

    if (querySnap.docs.length === 0) {
      return [];
    }

    const gratitudes = querySnap.docs.map((i) => GratitudeModel.build(i.data()));
    return gratitudes;
  };

  return { getGratitudes };
};

export default useGratitudeListFetch;
