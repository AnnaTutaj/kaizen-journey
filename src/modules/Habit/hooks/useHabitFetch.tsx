import { collection, query, where, getDocs, doc, getDoc, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore';
import { db } from '@common/util/firebase';
import HabitModel, { IHabitModel } from '@modules/Habit/models/HabitModel';
import { useAuth } from '@common/contexts/AuthContext';
import { HabitDateStatus } from '@common/constants/HabitDateStatus';

const useHabitFetch = () => {
  const { userProfile } = useAuth();

  const getHabits = async ({
    setLoading,
    isArchived
  }: {
    setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
    isArchived: boolean;
  }) => {
    if (typeof setLoading === 'function') setLoading(true);

    const q = query(
      collection(db, 'habits').withConverter(HabitModel.converter),
      where('createdByUid', '==', userProfile?.uid),
      where('isArchived', '==', isArchived)
    );

    const querySnap = await getDocs(q);

    if (querySnap.docs.length === 0) {
      if (typeof setLoading === 'function') setLoading(false);
      return [];
    }

    const habits = querySnap.docs.map((i) => HabitModel.build(i.data()));
    if (typeof setLoading === 'function') setLoading(false);

    return habits;
  };

  const getHabitById = async (id: string): Promise<IHabitModel | null> => {
    const docRef = doc(db, 'habits', id).withConverter(HabitModel.converter);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return HabitModel.build(docSnap.data());
    } else {
      return null;
    }
  };

  const updateHabitDates = async ({
    habitId,
    dateStatus,
    dateKey
  }: {
    habitId: string;
    dateStatus: HabitDateStatus;
    dateKey: string;
  }) => {
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
  };

  return { getHabits, getHabitById, updateHabitDates };
};

export default useHabitFetch;
