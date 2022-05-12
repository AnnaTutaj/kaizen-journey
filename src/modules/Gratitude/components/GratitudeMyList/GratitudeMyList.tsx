import PageLoading from '@common/components/PageLoading';
import { Empty } from 'antd';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import GratitudeListScrolled from '../GratitudeListScrolled';
import _ from 'lodash';
import GratitudeModel, { IGratitudeModel } from '@modules/Gratitude/models/GratitudeModel';
import useGratitudeListFetch from '@modules/Gratitude/hooks/useGratitudeListFetch';
import { IGratitudeUpdateModalProps } from '@modules/Gratitude/components/GratitudeUpdateModal/GratitudeUpdateModal';
import GratitudeUpdateModal from '@modules/Gratitude/components/GratitudeUpdateModal/GratitudeUpdateModal';
import { IGratitudeMyListFiltersModelDTO } from '@modules/Gratitude/models/GratitudeMyListFiltersModel';

interface IProps {
  newGratitude: IGratitudeModel | undefined;
  filters: IGratitudeMyListFiltersModelDTO | undefined;
}

const GratitudeMyList: React.FC<IProps> = ({ newGratitude, filters }) => {
  const intl = useIntl();

  const [loadedGratitudes, setLoadedGratitudes] = useState<IGratitudeModel[]>([]);
  const [nextGratitudes, setNextGratitudes] = useState<IGratitudeModel[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingReload, setLoadingReload] = useState<boolean>(false); //set after add gratitude or set filter -
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);
  const [moreGratitudes, setMoreGratitudes] = useState<boolean>(false);

  const [gratitudeUpdateModalConfig, setGratitudeUpdateModalConfig] = useState<IGratitudeUpdateModalProps>();

  const { getGratitudes } = useGratitudeListFetch({ setLoading, mode: 'myList', filters });

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
    async function fetchGratitudes() {
      setLoadingReload(true);
      const gratitudes = await getGratitudes();
      setLoadedGratitudes([]);
      setNextGratitudes(gratitudes);
      const hasMore = gratitudes && gratitudes.length > 1;
      setMoreGratitudes(hasMore);
      setLoadingReload(false);
    }

    fetchGratitudes();
    // eslint-disable-next-line
  }, [filters, newGratitude]);

  useEffect(() => {
    setLoadedGratitudes((value) => {
      const array = _.uniqBy([...value, ...nextGratitudes], 'id');
      const sortedArray = _.orderBy(array, [(item) => item.date.seconds], ['desc']);
      return sortedArray;
    });
  }, [nextGratitudes]);

  const getLastFetchedGratitude = () => {
    return loadedGratitudes && loadedGratitudes.length && loadedGratitudes[loadedGratitudes.length - 1]
      ? loadedGratitudes[loadedGratitudes.length - 1]
      : undefined;
  };

  const getNextGratitudes = async () => {
    const lastFetchedGratitude = getLastFetchedGratitude();

    const gratitudes = await getGratitudes(lastFetchedGratitude);
    setNextGratitudes(gratitudes);

    if (gratitudes && gratitudes.length <= 1) {
      setMoreGratitudes(false);
    }
  };

  const removeGratitude = (id: string) => {
    setLoadedGratitudes((prevState) => _.remove(prevState, (i) => i.id !== id));
  };

  const handleUpdateSubmit = async (gratitude: IGratitudeModel) => {
    const gratitudeSnap = await GratitudeModel.fetchById(gratitude.id);

    if (gratitudeSnap.exists()) {
      const updatedGratitude = GratitudeModel.build(gratitudeSnap.data());

      setLoadedGratitudes((prevItems) => {
        const array = prevItems.map((prevGratitude) =>
          prevGratitude.id === updatedGratitude.id ? updatedGratitude : prevGratitude
        );

        // if date changes, it cannot be added as the last fetched (cuz gaps risk)
        if (
          array[array.length - 1].id === updatedGratitude.id &&
          gratitude.date.seconds !== updatedGratitude.date.seconds
        ) {
          array.pop();
        }

        const sortedArray = _.orderBy(array, [(item) => item.date.seconds], ['desc']);
        return sortedArray;
      });
    }
  };

  const updateGratitude = (item: IGratitudeModel) => {
    setGratitudeUpdateModalConfig({
      handleCancel: () => setGratitudeUpdateModalConfig(undefined),
      handleSubmit: () => {
        setGratitudeUpdateModalConfig(undefined);
        handleUpdateSubmit(item);
      },
      gratitude: item
    });
  };

  if (loadingInitial) {
    return <PageLoading />;
  }

  return (
    <>
      {loadingReload ? <PageLoading /> : null}
      {loadedGratitudes && loadedGratitudes.length ? (
        <GratitudeListScrolled
          headerText={intl.formatMessage({ id: 'gratitude.my.list.title' })}
          gratitudes={loadedGratitudes}
          loading={loading}
          getNextGratitudes={getNextGratitudes}
          moreGratitudes={moreGratitudes}
          removeGratitude={removeGratitude}
          updateGratitude={updateGratitude}
        />
      ) : (
        <Empty description={intl.formatMessage({ id: 'gratitude.my.list.empty' })} />
      )}

      {gratitudeUpdateModalConfig ? <GratitudeUpdateModal {...gratitudeUpdateModalConfig} /> : null}
    </>
  );
};

export default GratitudeMyList;
