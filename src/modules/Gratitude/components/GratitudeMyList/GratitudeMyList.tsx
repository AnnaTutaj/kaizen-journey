import PageLoading from '@common/components/PageLoading';
import Empty from '@common/components/Empty';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import GratitudeListScrolled from '../GratitudeListScrolled';
import { IGratitudeModel } from '@modules/Gratitude/models/GratitudeModel';
import { IGratitudeUpdateModalProps } from '@modules/Gratitude/components/GratitudeUpdateModal/GratitudeUpdateModal';
import GratitudeUpdateModal from '@modules/Gratitude/components/GratitudeUpdateModal/GratitudeUpdateModal';
import GratitudeListFiltersModel from '@modules/Gratitude/models/GratitudeListFiltersModel';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { IGratitudeMyListOwnState } from '@modules/Gratitude/redux/GratitudeMyList/GratitudeMyListInterface';
import { useUserProfile } from '@common/contexts/UserProfile/UserProfileContext';
import GratitudeMyListActions from '@modules/Gratitude/redux/GratitudeMyList/GratitudeMyListActions';

const GratitudeMyList: React.FC = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { userProfile } = useUserProfile();

  const { data, isLoaded, isLoadingMore, hasMore, filters } = useSelector(
    ({ gratitudeMyList }: IGratitudeMyListOwnState) => gratitudeMyList,
    shallowEqual
  );

  const [gratitudeUpdateModalConfig, setGratitudeUpdateModalConfig] = useState<IGratitudeUpdateModalProps>();

  const getLastFetchedGratitude = () => {
    return data && data.length && data[data.length - 1] ? data[data.length - 1] : undefined;
  };

  const getNextGratitudes = async () => {
    const lastFetchedGratitude = getLastFetchedGratitude();
    const serializedFilters = GratitudeListFiltersModel.serialize(filters);

    GratitudeMyListActions.loadAction({
      filters: serializedFilters,
      userProfileUid: userProfile.uid,
      lastFetchedGratitude
    })(dispatch);
  };

  const removeGratitude = (id: string) => {
    GratitudeMyListActions.removeAction(id)(dispatch);
  };

  const handleUpdateSubmit = async (gratitude: IGratitudeModel) => {
    GratitudeMyListActions.updateAction(gratitude)(dispatch);
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

  if (!isLoaded) {
    return <PageLoading />;
  }

  return (
    <>
      {data && data.length ? (
        <GratitudeListScrolled
          headerText={intl.formatMessage({ id: 'gratitude.my.list.title' })}
          gratitudes={data}
          loading={isLoadingMore}
          getNextGratitudes={getNextGratitudes}
          moreGratitudes={hasMore}
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
