import { UserDispatchUnion } from './../../../../common/redux/UserActions';
import { produce } from 'immer';
import _ from 'lodash';
import GratitudeModel from '@modules/Gratitude/models/GratitudeModel';
import { GratitudeMyListDispatchUnion } from './GratitudeMyListActions';
import { IGratitudeMyListState } from './GratitudeMyListInterface';
import { GratitudeMyListTypes } from './GratitudeMyListTypes';
import { UserTypes } from '@common/redux/UserType';

const initialState: IGratitudeMyListState = {
  data: [],
  isLoaded: false,
  isLoadingMore: false,
  hasMore: false,
  filters: {}
};

const GratitudeMyListReducer = (
  state = initialState,
  action: GratitudeMyListDispatchUnion | UserDispatchUnion
): IGratitudeMyListState =>
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

      case GratitudeMyListTypes.GRATITUDE_MY_LIST_RELOAD: {
        draft.data = initialState.data;
        draft.isLoadingMore = initialState.isLoadingMore;
        draft.isLoaded = initialState.isLoaded;
        draft.hasMore = initialState.hasMore;

        break;
      }

      case GratitudeMyListTypes.GRATITUDE_MY_LIST_LOAD: {
        const nextGratitudes = action.payload.data.map((i) => GratitudeModel.build(i));
        const array = _.uniqBy([...draft.data, ...nextGratitudes], 'id');
        const sortedArray = _.orderBy(array, [(item) => item.date.seconds], ['desc']);
        draft.data = sortedArray;
        draft.isLoadingMore = false;
        draft.isLoaded = true;
        draft.hasMore = nextGratitudes && nextGratitudes.length > 1;

        break;
      }

      case GratitudeMyListTypes.GRATITUDE_MY_LIST_ITEM_REMOVE: {
        draft.data = _.remove(draft.data, (i) => i.id !== action.payload.id);

        break;
      }

      case GratitudeMyListTypes.GRATITUDE_MY_LIST_ITEM_UPDATE: {
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

      case GratitudeMyListTypes.GRATITUDE_MY_LIST_SET_FILTERS: {
        draft.filters = action.payload.filters;

        break;
      }
    }
  });

export default GratitudeMyListReducer;
