import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import _ from 'lodash';
import UserGratitudeList from './components/UserGratitudeList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import UserGratitudeListFilters from '@modules/Gratitude/components/GratitudeListFilters/GratitudeListFilters';
import GratitudeListFiltersModel, {
  IGratitudeListFiltersModelDTO
} from '@modules/Gratitude/models/GratitudeListFiltersModel';
import UserGratitudeListActions from '../../redux/UserGratitudeList/UserGratitudeListActions';
import { IUserGratitudeListOwnState } from '../../redux/UserGratitudeList/UserGratitudeListInterface';
import Button from '@common/components/Button';
import { DynamicModuleLoader } from 'redux-dynamic-modules';
import UserGratitudeListModule from '@modules/User/redux/UserGratitudeList/UserGratitudeListModule';
import { useParams } from 'react-router-dom';
import { useUserProfile } from '@common/contexts/UserProfile/UserProfileContext';
import useUserGratitudeHelper from './hooks/useUserGratitudeHelper';
import { StyledHeaderContainer, StyledHeaderFilterContainer } from '@common/components/Header/styled';

const UserGratitude: React.FC = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const params = useParams();
  const { userProfile } = useUserProfile();
  const userId: string = useMemo(() => params.id || '', [params.id]);
  const { prepareFiltersByUser } = useUserGratitudeHelper();

  const [showFilters, setShowFilters] = useState<boolean>(false);

  const { isLoaded, filters } = useSelector(
    ({ userGratitudeList }: IUserGratitudeListOwnState) => userGratitudeList,
    shallowEqual
  );

  const resetList = useCallback(() => {
    const finalFilters = prepareFiltersByUser(filters, userId);
    const serializedFilters = GratitudeListFiltersModel.serialize(finalFilters);

    UserGratitudeListActions.loadAction({ filters: serializedFilters, userProfileUid: userId, reload: true })(dispatch);
  }, [dispatch, filters, userId, prepareFiltersByUser]);

  const refreshListAfterChangeFilters = useCallback(
    (newFilters: IGratitudeListFiltersModelDTO) => {
      const finalFilters = prepareFiltersByUser(newFilters, userId);
      UserGratitudeListActions.loadAction({ filters: finalFilters, userProfileUid: userId, reload: true })(dispatch);
    },
    [dispatch, userId, prepareFiltersByUser]
  );

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
      </StyledHeaderContainer>

      <StyledHeaderFilterContainer $showFilters={showFilters}>
        <UserGratitudeListFilters
          initialValues={filters}
          hideVisiblity={userId !== userProfile.uid}
          onFinish={(values) => {
            const finalFilters = prepareFiltersByUser(values, userId);
            const serializedFilters = GratitudeListFiltersModel.serialize(finalFilters);
            const serializedCurrentFilters = GratitudeListFiltersModel.serialize(filters);

            if (!_.isEqual(serializedFilters, serializedCurrentFilters)) {
              UserGratitudeListActions.setFiltersAction(values)(dispatch);
              refreshListAfterChangeFilters(serializedFilters);
            }
          }}
        />
      </StyledHeaderFilterContainer>

      <UserGratitudeList />
    </>
  );
};

const UserGratitudeLoader = (): React.ReactElement => {
  return (
    //@ts-ignore
    <DynamicModuleLoader modules={[UserGratitudeListModule]}>
      <UserGratitude />
    </DynamicModuleLoader>
  );
};

export default UserGratitudeLoader;
