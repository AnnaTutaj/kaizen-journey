import PageLoading from '@common/components/PageLoading';
import Empty from '@common/components/Empty';
import React, { useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import GratitudeListScrolled from '@modules/Gratitude/components/GratitudeListScrolled/GratitudeListScrolled';
import { IGratitudeModel } from '@modules/Gratitude/models/GratitudeModel';
import { IGratitudeUpdateModalProps } from '@modules/Gratitude/components/GratitudeUpdateModal/GratitudeUpdateModal';
import GratitudeUpdateModal from '@modules/Gratitude/components/GratitudeUpdateModal/GratitudeUpdateModal';
import UserGratitudeListFiltersModel from '@modules/Gratitude/models/GratitudeListFiltersModel';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { IUserGratitudeListOwnState } from '@modules/User/redux/UserGratitudeList/UserGratitudeListInterface';
import UserGratitudeListActions from '@modules/User/redux/UserGratitudeList/UserGratitudeListActions';
import { useParams } from 'react-router-dom';

const UserGratitudeList: React.FC = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const params = useParams();
  const userId: string = useMemo(() => params.id || '', [params.id]);

  const { data, isLoaded, isLoadingMore, hasMore, filters } = useSelector(
    ({ userGratitudeList }: IUserGratitudeListOwnState) => userGratitudeList,
    shallowEqual
  );

  const [gratitudeUpdateModalConfig, setGratitudeUpdateModalConfig] = useState<IGratitudeUpdateModalProps>();

  const getLastFetchedGratitude = () => {
    return data && data.length && data[data.length - 1] ? data[data.length - 1] : undefined;
  };

  const getNextGratitudes = async () => {
    const lastFetchedGratitude = getLastFetchedGratitude();
    const serializedFilters = UserGratitudeListFiltersModel.serialize(filters);

    UserGratitudeListActions.loadAction({
      filters: serializedFilters,
      userProfileUid: userId,
      lastFetchedGratitude
    })(dispatch);
  };

  const removeGratitude = (id: string) => {
    UserGratitudeListActions.removeAction(id)(dispatch);
  };

  const handleUpdateSubmit = async (gratitude: IGratitudeModel) => {
    UserGratitudeListActions.updateAction(gratitude)(dispatch);
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

export default UserGratitudeList;
