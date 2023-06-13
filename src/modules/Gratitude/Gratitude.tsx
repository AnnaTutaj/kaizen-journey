import React, { useCallback, useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import _ from 'lodash';
import { useAuth } from '@common/contexts/AuthContext';
import GratitudeCreateModal from './components/GratitudeCreateModal';
import GratitudeMyList from './components/GratitudeMyList';
import { IGratitudeCreateModalProps } from '@modules/Gratitude/components/GratitudeCreateModal/GratitudeCreateModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faPlus } from '@fortawesome/free-solid-svg-icons';
import GratitudeListFilters from '@modules/Gratitude/components/GratitudeListFilters/GratitudeListFilters';
import GratitudeListFiltersModel, {
  IGratitudeListFiltersModelDTO
} from '@modules/Gratitude/models/GratitudeListFiltersModel';
import GratitudeMyListActions from './redux/GratitudeMyList/GratitudeMyListActions';
import { IGratitudeMyListOwnState } from './redux/GratitudeMyList/GratitudeMyListInterface';
import Button from '@common/components/Button';
import { StyledHeaderContainer, StyledHeaderFilterContainer } from '@common/components/Header/styled';

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
    const serializedFilters = GratitudeListFiltersModel.serialize(filters);

    GratitudeMyListActions.loadAction({ filters: serializedFilters, userProfileUid: userProfile.uid, reload: true })(
      dispatch
    );
  }, [dispatch, filters, userProfile]);

  const refreshListAfterChangeFilters = useCallback(
    (newFilters: IGratitudeListFiltersModelDTO) => {
      GratitudeMyListActions.loadAction({ filters: newFilters, userProfileUid: userProfile.uid, reload: true })(
        dispatch
      );
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
      <StyledHeaderContainer>
        <Button
          onClick={() => {
            setShowFilters((prevState) => !prevState);
          }}
          icon={<FontAwesomeIcon icon={faFilter} />}
          text={intl.formatMessage({ id: 'common.filters' })}
        />

        <Button
          type="primary"
          onClick={() => handleCreateGratitude()}
          icon={<FontAwesomeIcon icon={faPlus} />}
          text={intl.formatMessage({ id: 'gratitude.create.button' })}
        />
      </StyledHeaderContainer>

      <StyledHeaderFilterContainer $showFilters={showFilters}>
        <GratitudeListFilters
          initialValues={filters}
          onFinish={(values) => {
            const serializedFilters = GratitudeListFiltersModel.serialize(values);
            const serializedCurrentFilters = GratitudeListFiltersModel.serialize(filters);

            if (!_.isEqual(serializedFilters, serializedCurrentFilters)) {
              GratitudeMyListActions.setFiltersAction(values)(dispatch);
              refreshListAfterChangeFilters(serializedFilters);
            }
          }}
        />
      </StyledHeaderFilterContainer>

      <GratitudeMyList />

      {gratitudeCreateModalConfig ? <GratitudeCreateModal {...gratitudeCreateModalConfig} /> : null}
    </>
  );
};

export default Gratitude;
