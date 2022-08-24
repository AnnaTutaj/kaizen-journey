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
  DocumentData
} from 'firebase/firestore';
import { db } from '@common/util/firebase';
import HabitModel, { IHabitModel } from '@modules/Habit/models/HabitModel';
import { useAuth } from '@common/contexts/AuthContext';
import { HabitDateStatus } from '@common/constants/HabitDateStatus';
import { IHabitFormModelDTO } from '../models/HabitFormModel';
import { useCallback } from 'react';

const useHabitFetch = () => {
  const { userProfile } = useAuth();

  const getHabits = useCallback(
    async ({
      setLoading,
      isArchived,
      createdByUid,
      isPublic
    }: {
      setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
      isArchived?: boolean;
      createdByUid?: string;
      isPublic?: boolean;
    }) => {
      if (typeof setLoading === 'function') setLoading(true);

      const whereConditionsByAuthor = where('createdByUid', '==', createdByUid ? createdByUid : userProfile.uid);
      const whereConditions = [whereConditionsByAuthor];

      if (isArchived !== undefined) {
        whereConditions.push(where('isArchived', '==', isArchived));
      }

      if (isPublic !== undefined) {
        whereConditions.push(where('isPublic', '==', isPublic));
      }

      const q = query(collection(db, 'habits').withConverter(HabitModel.converter), ...whereConditions);

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
