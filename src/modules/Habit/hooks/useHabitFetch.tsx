import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  arrayRemove,
  arrayUnion,
  deleteDoc,
  addDoc,
  DocumentReference,
  DocumentData,
  limit
} from 'firebase/firestore';
import { db } from '@common/util/firebase';
import HabitModel, { IHabitModel } from '@modules/Habit/models/HabitModel';
import { useUserProfile } from '@common/contexts/UserProfile/UserProfileContext';
import { HabitDateStatus } from '@common/constants/HabitDateStatus';
import { IHabitFormModelDTO } from '../models/HabitFormModel';
import { useCallback } from 'react';
import { IHabitListFiltersModelDTO } from '../models/HabitListFiltersModel';

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

      const q = query(collection(db, 'habits').withConverter(HabitModel.converter), ...conditions);

      const querySnap = await getDocs(q);

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
    const docRef = doc(db, 'habits', id).withConverter(HabitModel.converter);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return HabitModel.build(docSnap.data());
    } else {
      return null;
    }
  }, []);

  const createHabit = useCallback(async (values: IHabitFormModelDTO): Promise<DocumentReference<DocumentData>> => {
    return await addDoc(collection(db, 'habits'), values);
  }, []);

  const deleteHabit = useCallback(async (id: string): Promise<void> => {
    await deleteDoc(doc(db, 'habits', id));
  }, []);

  const updateHabit = useCallback(async (id: string, values: Partial<IHabitFormModelDTO>): Promise<void> => {
    await updateDoc(doc(db, 'habits', id), values);
  }, []);

  const archiveHabit = useCallback(async (id: string): Promise<void> => {
    await updateDoc(doc(db, 'habits', id), {
      isArchived: true
    });
  }, []);

  const restoreHabit = useCallback(async (id: string): Promise<void> => {
    await updateDoc(doc(db, 'habits', id), {
      isArchived: false
    });
  }, []);

  const updateHabitDates = useCallback(
    async ({ habitId, dateStatus, dateKey }: { habitId: string; dateStatus: HabitDateStatus; dateKey: string }) => {
      switch (dateStatus) {
        case HabitDateStatus.checked:
          await updateDoc(doc(db, 'habits', habitId), {
            datesChecked: arrayRemove(dateKey),
            datesSkipped: arrayUnion(dateKey)
          });
          break;

        case HabitDateStatus.skipped:
          await updateDoc(doc(db, 'habits', habitId), {
            datesChecked: arrayRemove(dateKey),
            datesSkipped: arrayRemove(dateKey)
          });
          break;

        case HabitDateStatus.unchecked:
          await updateDoc(doc(db, 'habits', habitId), {
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
    deleteHabit,
    updateHabit,
    archiveHabit,
    restoreHabit,
    updateHabitDates
  };
};

export default useHabitFetch;
