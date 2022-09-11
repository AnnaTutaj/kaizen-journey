import { UserDispatchUnion } from '@common/redux/UserActions';
import { produce } from 'immer';
import _ from 'lodash';
import GratitudeModel from '@modules/Gratitude/models/GratitudeModel';
import { UserGratitudeListDispatchUnion } from './UserGratitudeListActions';
import { IUserGratitudeListState } from './UserGratitudeListInterface';
import { UserGratitudeListTypes } from './UserGratitudeListTypes';
import { UserTypes } from '@common/redux/UserType';

const initialState: IUserGratitudeListState = {
  data: [],
  isLoaded: false,
  isLoadingMore: false,
  hasMore: false,
  filters: {}
};

const UserGratitudeListReducer = (
  state = initialState,
  action: UserGratitudeListDispatchUnion | UserDispatchUnion
): IUserGratitudeListState =>
  produce(state, (draft) => {
    switch (action.type) {
      case UserTypes.USER_LOG_OUT: {
        draft.data = initialState.data;
        draft.isLoadingMore = initialState.isLoadingMore;
        draft.isLoaded = initialState.isLoaded;
        draft.hasMore = initialState.hasMore;
        draft.filters = initialState.filters;

        break;
      }

      case UserGratitudeListTypes.USER_GRATITUDE_LIST_RELOAD: {
        draft.data = initialState.data;
        draft.isLoadingMore = initialState.isLoadingMore;
        draft.isLoaded = initialState.isLoaded;
        draft.hasMore = initialState.hasMore;

        break;
      }

      case UserGratitudeListTypes.USER_GRATITUDE_LIST_LOAD: {
        const nextGratitudes = action.payload.data.map((i) => GratitudeModel.build(i));
        const array = _.uniqBy([...draft.data, ...nextGratitudes], 'id');
        const sortedArray = _.orderBy(array, [(item) => item.date.seconds], ['desc']);
        draft.data = sortedArray;
        draft.isLoadingMore = false;
        draft.isLoaded = true;
        draft.hasMore = nextGratitudes && nextGratitudes.length > 1;

        break;
      }

      case UserGratitudeListTypes.USER_GRATITUDE_LIST_ITEM_REMOVE: {
        draft.data = _.remove(draft.data, (i) => i.id !== action.payload.id);

        break;
      }

      case UserGratitudeListTypes.USER_GRATITUDE_LIST_ITEM_UPDATE: {
        const array = draft.data.map((prevGratitude) =>
          prevGratitude.id === action.payload.updatedGratitude.id ? action.payload.updatedGratitude : prevGratitude
        );

        // if date changes, it cannot be added as the last fetched (cuz gaps risk)
        if (
          array[array.length - 1].id === action.payload.updatedGratitude.id &&
          action.payload.gratitude.date.seconds !== action.payload.updatedGratitude.date.seconds
        ) {
          array.pop();
          draft.hasMore = true;
        }

        const sortedArray = _.orderBy(array, [(item) => item.date.seconds], ['desc']);
        draft.data = [...sortedArray];

        break;
      }

      case UserGratitudeListTypes.USER_GRATITUDE_LIST_SET_FILTERS: {
        draft.filters = action.payload.filters;

        break;
      }
    }
  });

export default UserGratitudeListReducer;
