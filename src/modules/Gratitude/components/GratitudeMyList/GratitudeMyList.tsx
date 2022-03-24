import PageLoading from '@common/components/PageLoading';
import { Empty } from 'antd';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import GratitudeListScrolled from '../GratitudeListScrolled';
import { collection, query, where, getDocs, orderBy, limit, startAfter, getDoc, doc } from 'firebase/firestore';
import { db } from '@common/util/firebase';
import { useAuth } from '@common/contexts/AuthContext';
import _ from 'lodash';
import GratitudeModel, { IGratitudeModel } from '@modules/Gratitude/models/GratitudeModel';
interface IProps {
  newGratitude: IGratitudeModel | undefined;
}

const GratitudeMyList: React.FC<IProps> = ({ newGratitude }) => {
  const intl = useIntl();
  const { userProfile } = useAuth();

  const [loadedGratitudes, setLoadedGratitudes] = useState<IGratitudeModel[]>([]);
  const [nextGratitudes, setNextGratitudes] = useState<IGratitudeModel[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);
  const [moreGratitudes, setMoreGratitudes] = useState<boolean>(false);

  const getGratitudes = async (lastFetchedGratitude?: IGratitudeModel) => {
    setLoading(true);

    const startAfterGratitude = lastFetchedGratitude
      ? await getDoc(doc(db, 'gratitude', lastFetchedGratitude.id))
      : null;

    const limitCount: number = 20;
    const q = startAfterGratitude
      ? query(
          collection(db, 'gratitude').withConverter(GratitudeModel.converter),
          where('createdByUid', '==', userProfile?.uid),
          orderBy('date', 'desc'),
          startAfter(startAfterGratitude),
          limit(limitCount)
        )
      : query(
          collection(db, 'gratitude').withConverter(GratitudeModel.converter),
          where('createdByUid', '==', userProfile?.uid),
          orderBy('date', 'desc'),
          limit(limitCount)
        );

    const querySnap = await getDocs(q);

    if (querySnap.docs.length === 0) {
      setLoading(false);
      return [];
    }

    const gratitudes = querySnap.docs.map((i) => GratitudeModel.build(i.data()));

    setLoading(false);

    return gratitudes;
  };

  //init - runs only once
  useEffect(() => {
    async function fetchGratitudes() {
      const gratitudes = await getGratitudes();
      setNextGratitudes(gratitudes);
      const hasMore = gratitudes && gratitudes.length > 1;
      setMoreGratitudes(hasMore);
      setLoadingInitial(false);
    }

    fetchGratitudes();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setLoadedGratitudes((value) => {
      const array = _.uniqBy([...value, ...nextGratitudes], 'id');
      const sortedArray = _.orderBy(array, [(item) => item.date.seconds], ['desc']);
      return sortedArray;
    });
  }, [nextGratitudes]);

  useEffect(() => {
    if (newGratitude) {
      setLoadedGratitudes((value) => {
        const array = _.uniqBy([...value, newGratitude], 'id');
        const sortedArray = _.orderBy(array, [(item) => item.date.seconds], ['desc']);
        return sortedArray;
      });
    }
  }, [newGratitude]);

  const getNextGratitudes = async () => {
    const lastFetchedGratitude =
      nextGratitudes && nextGratitudes.length && nextGratitudes[nextGratitudes.length - 1]
        ? nextGratitudes[nextGratitudes.length - 1]
        : undefined;

    const gratitudes = await getGratitudes(lastFetchedGratitude);
    setNextGratitudes(gratitudes);

    if (gratitudes && gratitudes.length <= 1) {
      setMoreGratitudes(false);
    }
  };

  if (loadingInitial) {
    return <PageLoading />;
  }

  return (
    <>
      {loadedGratitudes && loadedGratitudes.length ? (
        <GratitudeListScrolled
          headerText={intl.formatMessage({ id: 'gratitude.my.list.title' })}
          gratitudes={loadedGratitudes}
          loading={loading}
          getNextGratitudes={getNextGratitudes}
          moreGratitudes={moreGratitudes}
        />
      ) : (
        <Empty description={intl.formatMessage({ id: 'gratitude.my.list.empty' })} />
      )}
    </>
  );
};

export default GratitudeMyList;
