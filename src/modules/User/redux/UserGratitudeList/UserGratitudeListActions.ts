import { Dispatch } from 'redux';
import { where, orderBy, limit, startAfter } from 'firebase/firestore';
import { ActionsUnion, createAction as createActionHelper } from '@common/helpers/ActionHelper';
import {
  IGratitudeListFiltersModel,
  IGratitudeListFiltersModelDTO
} from '@modules/Gratitude/models/GratitudeListFiltersModel';
import GratitudeModel, { IGratitudeModel, IGratitudeModelDTO } from '@modules/Gratitude/models/GratitudeModel';
import { UserGratitudeListTypes } from './UserGratitudeListTypes';
import GratitudeResource from '@modules/Gratitude/api/GratitudeResource';

const loadAction =
  ({
    lastFetchedGratitude,
    filters,
    userProfileUid,
    reload
  }: {
    lastFetchedGratitude?: IGratitudeModel;
    filters: IGratitudeListFiltersModelDTO | undefined;
    userProfileUid: string;
    reload?: boolean;
  }) =>
  async (dispatch: Dispatch) => {
    try {
      if (reload) {
        dispatch(UserGratitudeListDispatch.reload());
      }

      const limitCount: number = 10;

      const startAfterGratitude = lastFetchedGratitude
        ? await GratitudeResource.fetchById(lastFetchedGratitude.id)
        : null;

      const whereConditionByMode = where('createdByUid', '==', userProfileUid);
      const whereConditions = [whereConditionByMode];
      if (filters?.color) {
        whereConditions.push(where('color', '==', filters.color));
      }

      if (filters?.tags) {
        whereConditions.push(where('tags', 'array-contains-any', filters.tags));
      }

      if (filters?.isPublic !== undefined) {
        whereConditions.push(where('isPublic', '==', filters.isPublic));
      }

      const querySnap = await GratitudeResource.fetchCollection(
        startAfterGratitude
          ? [...whereConditions, orderBy('date', 'desc'), startAfter(startAfterGratitude), limit(limitCount)]
          : [...whereConditions, orderBy('date', 'desc'), limit(limitCount)]
      );

      if (querySnap.docs.length === 0) {
        dispatch(UserGratitudeListDispatch.load([]));
      } else {
        const gratitudes = querySnap.docs.map((i) => i.data());
        dispatch(UserGratitudeListDispatch.load(gratitudes));
      }
    } catch (e) {}
  };

const removeAction = (gratitudeId: string) => async (dispatch: Dispatch) => {
  dispatch(UserGratitudeListDispatch.remove(gratitudeId));
};

const updateAction = (gratitude: IGratitudeModel) => async (dispatch: Dispatch) => {
  const gratitudeSnap = await GratitudeResource.fetchById(gratitude.id);
  if (gratitudeSnap.exists()) {
    const updatedGratitude = GratitudeModel.build(gratitudeSnap.data());
    dispatch(UserGratitudeListDispatch.update(gratitude, updatedGratitude));
  }
};

const setFiltersAction = (filters: Partial<IGratitudeListFiltersModel>) => (dispatch: Dispatch) => {
  dispatch(UserGratitudeListDispatch.setFilters(filters));
};

export const UserGratitudeListDispatch = {
  reload: () => createActionHelper(UserGratitudeListTypes.USER_GRATITUDE_LIST_RELOAD),
  load: (data: IGratitudeModelDTO[]) => createActionHelper(UserGratitudeListTypes.USER_GRATITUDE_LIST_LOAD, { data }),
  remove: (id: string) => createActionHelper(UserGratitudeListTypes.USER_GRATITUDE_LIST_ITEM_REMOVE, { id }),
  update: (gratitude: IGratitudeModel, updatedGratitude: IGratitudeModel) =>
    createActionHelper(UserGratitudeListTypes.USER_GRATITUDE_LIST_ITEM_UPDATE, { gratitude, updatedGratitude }),
  setFilters: (filters: Partial<IGratitudeListFiltersModel>) =>
    createActionHelper(UserGratitudeListTypes.USER_GRATITUDE_LIST_SET_FILTERS, { filters })
};

export type UserGratitudeListDispatchUnion = ActionsUnion<typeof UserGratitudeListDispatch>;

export default {
  loadAction,
  setFiltersAction,
  removeAction,
  updateAction
};
