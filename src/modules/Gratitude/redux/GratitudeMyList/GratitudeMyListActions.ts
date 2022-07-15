import { IGratitudeMyListFiltersModel } from './../../models/GratitudeMyListFiltersModel';
import { Dispatch } from 'redux';
import { collection, query, where, getDocs, orderBy, limit, startAfter, getDoc, doc } from 'firebase/firestore';
import { db } from '@common/util/firebase';
import { ActionsUnion, createAction as createActionHelper } from '@common/helpers/ActionHelper';
import { IGratitudeMyListFiltersModelDTO } from '@modules/Gratitude/models/GratitudeMyListFiltersModel';
import GratitudeModel, { IGratitudeModel, IGratitudeModelDTO } from '@modules/Gratitude/models/GratitudeModel';
import { GratitudeMyListTypes } from './GratitudeMyListTypes';

const loadAction =
  ({
    lastFetchedGratitude,
    filters,
    userProfileUid,
    reload
  }: {
    lastFetchedGratitude?: IGratitudeModel;
    filters: IGratitudeMyListFiltersModelDTO | undefined;
    userProfileUid: string;
    reload?: boolean;
  }) =>
  async (dispatch: Dispatch) => {
    try {
      if (reload) {
        dispatch(GratitudeMyListDispatch.reload());
      }

      const limitCount: number = 10;

      const startAfterGratitude = lastFetchedGratitude
        ? await getDoc(doc(db, 'gratitude', lastFetchedGratitude.id))
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

      const q = startAfterGratitude
        ? query(
            collection(db, 'gratitude').withConverter(GratitudeModel.converter),
            ...whereConditions,
            orderBy('date', 'desc'),
            startAfter(startAfterGratitude),
            limit(limitCount)
          )
        : query(
            collection(db, 'gratitude').withConverter(GratitudeModel.converter),
            ...whereConditions,
            orderBy('date', 'desc'),
            limit(limitCount)
          );

      const querySnap = await getDocs(q);

      if (querySnap.docs.length === 0) {
        dispatch(GratitudeMyListDispatch.load([]));
      } else {
        const gratitudes = querySnap.docs.map((i) => i.data());
        dispatch(GratitudeMyListDispatch.load(gratitudes));
      }
    } catch (e) {}
  };

const removeAction = (gratitudeId: string) => async (dispatch: Dispatch) => {
  dispatch(GratitudeMyListDispatch.remove(gratitudeId));
};

const updateAction = (gratitude: IGratitudeModel) => async (dispatch: Dispatch) => {
  const gratitudeSnap = await GratitudeModel.fetchById(gratitude.id);
  if (gratitudeSnap.exists()) {
    const updatedGratitude = GratitudeModel.build(gratitudeSnap.data());
    dispatch(GratitudeMyListDispatch.update(gratitude, updatedGratitude));
  }
};

const setFiltersAction = (filters: Partial<IGratitudeMyListFiltersModel>) => (dispatch: Dispatch) => {
  dispatch(GratitudeMyListDispatch.setFilters(filters));
};

export const GratitudeMyListDispatch = {
  reload: () => createActionHelper(GratitudeMyListTypes.GRATITUDE_MY_LIST_RELOAD),
  load: (data: IGratitudeModelDTO[]) => createActionHelper(GratitudeMyListTypes.GRATITUDE_MY_LIST_LOAD, { data }),
  remove: (id: string) => createActionHelper(GratitudeMyListTypes.GRATITUDE_MY_LIST_ITEM_REMOVE, { id }),
  update: (gratitude: IGratitudeModel, updatedGratitude: IGratitudeModel) =>
    createActionHelper(GratitudeMyListTypes.GRATITUDE_MY_LIST_ITEM_UPDATE, { gratitude, updatedGratitude }),
  setFilters: (filters: Partial<IGratitudeMyListFiltersModel>) =>
    createActionHelper(GratitudeMyListTypes.GRATITUDE_MY_LIST_SET_FILTERS, { filters })
};

export type GratitudeMyListDispatchUnion = ActionsUnion<typeof GratitudeMyListDispatch>;

export default {
  loadAction,
  removeAction,
  updateAction,
  setFiltersAction
};
