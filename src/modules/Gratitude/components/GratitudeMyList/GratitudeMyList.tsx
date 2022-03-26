import PageLoading from '@common/components/PageLoading';
import { Empty } from 'antd';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import GratitudeListScrolled from '../GratitudeListScrolled';
import _ from 'lodash';
import { IGratitudeModel } from '@modules/Gratitude/models/GratitudeModel';
import useGratitudeListFetch from '@modules/Gratitude/hooks/useGratitudeListFetch';
interface IProps {
  newGratitude: IGratitudeModel | undefined;
}

const GratitudeMyList: React.FC<IProps> = ({ newGratitude }) => {
  const intl = useIntl();

  const [loadedGratitudes, setLoadedGratitudes] = useState<IGratitudeModel[]>([]);
  const [nextGratitudes, setNextGratitudes] = useState<IGratitudeModel[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);
  const [moreGratitudes, setMoreGratitudes] = useState<boolean>(false);

  const { getGratitudes } = useGratitudeListFetch({ setLoading, mode: 'myList' });

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
