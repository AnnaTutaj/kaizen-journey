import PageLoading from '@common/components/PageLoading';
import Empty from '@common/components/Empty';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import GratitudeListScrolled from '../GratitudeListScrolled';
import { IGratitudeModel } from '@modules/Gratitude/models/GratitudeModel';
import { IGratitudeUpdateModalProps } from '@modules/Gratitude/components/GratitudeUpdateModal/GratitudeUpdateModal';
import GratitudeUpdateModal from '@modules/Gratitude/components/GratitudeUpdateModal/GratitudeUpdateModal';
import { shallowEqual, useSelector } from 'react-redux';
import { useThunkDispatch } from '@common/redux/useThunkDispatch';
import { IGratitudeMyListOwnState } from '@modules/Gratitude/redux/GratitudeMyList/GratitudeMyListInterface';
import { useUserProfile } from '@common/contexts/UserProfile/UserProfileContext';
import GratitudeMyListActions from '@modules/Gratitude/redux/GratitudeMyList/GratitudeMyListActions';

const GratitudeMyList: React.FC = () => {
  const intl = useIntl();
  const dispatch = useThunkDispatch();
  const { userProfile } = useUserProfile();

  const { data, isLoaded, isLoadingMore, hasMore } = useSelector(
    ({ gratitudeMyList }: IGratitudeMyListOwnState) => gratitudeMyList,
    shallowEqual
  );

  const [gratitudeUpdateModalConfig, setGratitudeUpdateModalConfig] = useState<IGratitudeUpdateModalProps>();

  const getLastFetchedGratitude = () => {
    return data && data.length && data[data.length - 1] ? data[data.length - 1] : undefined;
  };

  const getNextGratitudes = async () => {
    const lastFetchedGratitude = getLastFetchedGratitude();

    dispatch(
      GratitudeMyListActions.loadAction({
        userProfileUid: userProfile.uid,
        lastFetchedGratitude
      })
    );
  };

  const removeGratitude = (id: string) => {
    dispatch(GratitudeMyListActions.removeAction(id));
  };

  const handleUpdateSubmit = async (gratitude: IGratitudeModel) => {
    dispatch(GratitudeMyListActions.updateAction(gratitude));
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
