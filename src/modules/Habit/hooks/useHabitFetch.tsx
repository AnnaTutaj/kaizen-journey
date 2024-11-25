import { where, arrayRemove, arrayUnion, DocumentReference, DocumentData, limit } from 'firebase/firestore';
import HabitModel, { IHabitModel } from '@modules/Habit/models/HabitModel';
import { useUserProfile } from '@common/contexts/UserProfile/UserProfileContext';
import { HabitDateStatus } from '@common/constants/HabitDateStatus';
import { IHabitFormModelDTO } from '../models/HabitFormModel';
import { useCallback } from 'react';
import { IHabitListFiltersModelDTO } from '../models/HabitListFiltersModel';
import HabitResource from '../api/HabitResource';

const useHabitFetch = () => {
  const { userProfile } = useUserProfile();

  const getHabits = useCallback(
    async ({
      setLoading,
      createdByUid,
      filters,
      limitCount
    }: {
      setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
      createdByUid?: string;
      filters?: IHabitListFiltersModelDTO | undefined;
      limitCount?: number;
    }) => {
      if (typeof setLoading === 'function') setLoading(true);

      const conditionsByAuthor = where('createdByUid', '==', createdByUid ? createdByUid : userProfile.uid);
      const conditions = [conditionsByAuthor];

      if (filters?.color) {
        conditions.push(where('color', '==', filters.color));
      }

      if (filters?.isArchived !== undefined) {
        conditions.push(where('isArchived', '==', filters.isArchived));
      }

      if (filters?.isPublic !== undefined) {
        conditions.push(where('isPublic', '==', filters.isPublic));
      }

      if (limitCount && limitCount > 0) {
        conditions.push(limit(limitCount));
      }

      const querySnap = await HabitResource.fetchCollection([...conditions]);

      if (querySnap.docs.length === 0) {
        if (typeof setLoading === 'function') setLoading(false);
        return [];
      }

      const habits = querySnap.docs.map((i) => HabitModel.build(i.data()));
      if (typeof setLoading === 'function') setLoading(false);

      return habits;
    },
    [userProfile.uid]
  );

  const getHabitById = useCallback(async (id: string): Promise<IHabitModel | null> => {
    const docSnap = await HabitResource.fetchById(id);

    if (docSnap.exists()) {
      return HabitModel.build(docSnap.data());
    } else {
      return null;
    }
  }, []);

  const createHabit = useCallback(async (values: IHabitFormModelDTO): Promise<DocumentReference<DocumentData>> => {
    return await HabitResource.create(values);
  }, []);

  const updateHabit = useCallback(async (id: string, values: Partial<IHabitFormModelDTO>): Promise<void> => {
    return await HabitResource.update(id, values);
  }, []);

  const archiveHabit = useCallback(async (id: string): Promise<void> => {
    return await HabitResource.update(id, {
      isArchived: true
    });
  }, []);

  const restoreHabit = useCallback(async (id: string): Promise<void> => {
    return await HabitResource.update(id, {
      isArchived: false
    });
  }, []);

  const updateHabitDates = useCallback(
    async ({ habitId, dateStatus, dateKey }: { habitId: string; dateStatus: HabitDateStatus; dateKey: string }) => {
      switch (dateStatus) {
        case HabitDateStatus.checked:
          await HabitResource.update(habitId, {
            datesChecked: arrayRemove(dateKey),
            datesSkipped: arrayUnion(dateKey)
          });

          break;

        case HabitDateStatus.skipped:
          await HabitResource.update(habitId, {
            datesChecked: arrayRemove(dateKey),
            datesSkipped: arrayRemove(dateKey)
          });
          break;

        case HabitDateStatus.unchecked:
          await HabitResource.update(habitId, {
            datesChecked: arrayUnion(dateKey),
            datesSkipped: arrayRemove(dateKey)
          });
          break;
      }
    },
    []
  );

  return {
    getHabits,
    getHabitById,
    createHabit,
    updateHabit,
    archiveHabit,
    restoreHabit,
    updateHabitDates
  };
};

export default useHabitFetch;
