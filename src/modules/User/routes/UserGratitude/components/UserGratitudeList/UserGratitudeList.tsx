import PageLoading from '@common/components/PageLoading';
import Empty from '@common/components/Empty';
import React, { useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import GratitudeListScrolled from '@modules/Gratitude/components/GratitudeListScrolled/GratitudeListScrolled';
import { IGratitudeModel } from '@modules/Gratitude/models/GratitudeModel';
import { IGratitudeUpdateModalProps } from '@modules/Gratitude/components/GratitudeUpdateModal/GratitudeUpdateModal';
import GratitudeUpdateModal from '@modules/Gratitude/components/GratitudeUpdateModal/GratitudeUpdateModal';
import GratitudeListFiltersModel from '@modules/Gratitude/models/GratitudeListFiltersModel';
import { shallowEqual, useSelector } from 'react-redux';
import { useThunkDispatch } from '@common/redux/useThunkDispatch';
import { IUserGratitudeListOwnState } from '@modules/User/redux/UserGratitudeList/UserGratitudeListInterface';
import UserGratitudeListActions from '@modules/User/redux/UserGratitudeList/UserGratitudeListActions';
import { useParams } from 'react-router-dom';
import useUserGratitudeHelper from '../../hooks/useUserGratitudeHelper';

const UserGratitudeList: React.FC = () => {
  const intl = useIntl();
  const dispatch = useThunkDispatch();
  const params = useParams();
  const userId: string = useMemo(() => params.id || '', [params.id]);
  const { prepareFiltersByUser } = useUserGratitudeHelper();

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
    const finalFilters = prepareFiltersByUser(filters, userId);
    const serializedFilters = GratitudeListFiltersModel.serialize(finalFilters);

    dispatch(
      UserGratitudeListActions.loadAction({
        filters: serializedFilters,
        userProfileUid: userId,
        lastFetchedGratitude
      })
    );
  };

  const removeGratitude = (id: string) => {
    dispatch(UserGratitudeListActions.removeAction(id));
  };

  const handleUpdateSubmit = async (gratitude: IGratitudeModel) => {
    dispatch(UserGratitudeListActions.updateAction(gratitude));
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
        <Empty description={intl.formatMessage({ id: 'user.gratitude.empty' })} />
      )}

      {gratitudeUpdateModalConfig ? <GratitudeUpdateModal {...gratitudeUpdateModalConfig} /> : null}
    </>
  );
};

export default UserGratitudeList;
