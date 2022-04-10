import { collection, query, where, getDocs, orderBy, limit, startAfter, getDoc, doc } from 'firebase/firestore';
import { db } from '@common/util/firebase';
import GratitudeModel, { IGratitudeModel } from '@modules/Gratitude/models/GratitudeModel';
import { useAuth } from '@common/contexts/AuthContext';

interface IProps {
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  mode: 'myList' | 'public';
}

const useGratitudeListFetch = ({ setLoading, mode }: IProps) => {
  const { userProfile } = useAuth();

  const getGratitudes = async (lastFetchedGratitude?: IGratitudeModel) => {
    if (typeof setLoading === 'function') setLoading(true);

    const startAfterGratitude = lastFetchedGratitude
      ? await getDoc(doc(db, 'gratitude', lastFetchedGratitude.id))
      : null;

    const limitCount: number = mode === 'myList' ? 10 : 5;

    const whereCondition =
      mode === 'myList' ? where('createdByUid', '==', userProfile?.uid) : where('isPublic', '==', true);

    const q = startAfterGratitude
      ? query(
          collection(db, 'gratitude').withConverter(GratitudeModel.converter),
          whereCondition,
          orderBy('date', 'desc'),
          startAfter(startAfterGratitude),
          limit(limitCount)
        )
      : query(
          collection(db, 'gratitude').withConverter(GratitudeModel.converter),
          whereCondition,
          orderBy('date', 'desc'),
          limit(limitCount)
        );

    const querySnap = await getDocs(q);

    if (querySnap.docs.length === 0) {
      if (typeof setLoading === 'function') setLoading(false);
      return [];
    }

    const gratitudes = querySnap.docs.map((i) => GratitudeModel.build(i.data()));
    if (typeof setLoading === 'function') setLoading(false);

    return gratitudes;
  };

  return { getGratitudes };
};

export default useGratitudeListFetch;
