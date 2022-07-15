import { IGratitudeMyListFiltersModel } from './../../models/GratitudeMyListFiltersModel';
import { IGratitudeModel } from './../../models/GratitudeModel';

export interface IGratitudeMyListOwnState {
  gratitudeMyList: IGratitudeMyListState;
}

export interface IGratitudeMyListState {
  data: IGratitudeModel[];
  isLoaded: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
  filters: Partial<IGratitudeMyListFiltersModel>;
}
