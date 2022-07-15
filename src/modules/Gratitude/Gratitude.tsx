import { Button, Space } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import _ from 'lodash';
import { useAuth } from '@common/contexts/AuthContext';
import GratitudeCreateModal from './components/GratitudeCreateModal';
import GratitudeMyList from './components/GratitudeMyList';
import styles from './Gratitude.module.less';
import { IGratitudeCreateModalProps } from '@modules/Gratitude/components/GratitudeCreateModal/GratitudeCreateModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faPlus } from '@fortawesome/free-solid-svg-icons';
import GratitudeMyListFilters from '@modules/Gratitude/components/GratitudeMyListFilters/GratitudeMyListFilters';
import cn from 'classnames';
import GratitudeMyListFiltersModel, {
  IGratitudeMyListFiltersModelDTO
} from '@modules/Gratitude/models/GratitudeMyListFiltersModel';
import GratitudeMyListActions from './redux/GratitudeMyList/GratitudeMyListActions';
import { IGratitudeMyListOwnState } from './redux/GratitudeMyList/GratitudeMyListInterface';

const Gratitude: React.FC = () => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const { userProfile } = useAuth();
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [gratitudeCreateModalConfig, setGratitudeCreateModalConfig] = useState<IGratitudeCreateModalProps>();

  const { isLoaded, filters } = useSelector(
    ({ gratitudeMyList }: IGratitudeMyListOwnState) => gratitudeMyList,
    shallowEqual
  );

  const resetList = useCallback(() => {
    if (userProfile) {
      const serializedFilters = GratitudeMyListFiltersModel.serialize(filters);

      GratitudeMyListActions.loadAction({ filters: serializedFilters, userProfileUid: userProfile.uid, reload: true })(
        dispatch
      );
    }
  }, [dispatch, filters, userProfile]);

  const refreshListAfterChangeFilters = useCallback(
    (newFilters: IGratitudeMyListFiltersModelDTO) => {
      if (userProfile) {
        GratitudeMyListActions.loadAction({ filters: newFilters, userProfileUid: userProfile.uid, reload: true })(
          dispatch
        );
      }
    },
    [dispatch, userProfile]
  );

  const handleCreateGratitude = () => {
    setGratitudeCreateModalConfig({
      handleCancel: () => setGratitudeCreateModalConfig(undefined),
      handleSubmit: async () => {
        setGratitudeCreateModalConfig(undefined);
        resetList();
      }
    });
  };

  //init
  useEffect(() => {
    if (!isLoaded) {
      resetList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={styles.Header}>
        <Button
          onClick={() => {
            setShowFilters((prevState) => !prevState);
          }}
        >
          <Space size={10}>
            <FontAwesomeIcon icon={faFilter} />
            {intl.formatMessage({ id: 'common.filters' })}
          </Space>
        </Button>

        <Button type="primary" onClick={() => handleCreateGratitude()}>
          <Space size={10}>
            <FontAwesomeIcon icon={faPlus} />
            {intl.formatMessage({ id: 'gratitude.create.button' })}
          </Space>
        </Button>
      </div>

      <div className={cn(styles.FiltersContainer, { [styles.FiltersContainerVisible]: showFilters })}>
        <GratitudeMyListFilters
          initialValues={filters}
          onFinish={(values) => {
            const serializedFilters = GratitudeMyListFiltersModel.serialize(values);
            const serializedCurrentFilters = GratitudeMyListFiltersModel.serialize(filters);

            if (!_.isEqual(serializedFilters, serializedCurrentFilters)) {
              GratitudeMyListActions.setFiltersAction(values)(dispatch);
              refreshListAfterChangeFilters(serializedFilters);
            }
          }}
        />
      </div>

      <GratitudeMyList />

      {gratitudeCreateModalConfig ? <GratitudeCreateModal {...gratitudeCreateModalConfig} /> : null}
    </>
  );
};

export default Gratitude;
