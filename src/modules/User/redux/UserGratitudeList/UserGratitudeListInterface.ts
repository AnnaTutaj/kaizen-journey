import { IGratitudeListFiltersModel } from '@modules/Gratitude/models/GratitudeListFiltersModel';
import { IGratitudeModel } from '@modules/Gratitude/models/GratitudeModel';

export interface IUserGratitudeListOwnState {
  userGratitudeList: IUserGratitudeListState;
}

export interface IUserGratitudeListState {
  data: IGratitudeModel[];
  isLoaded: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
  filters: Partial<IGratitudeListFiltersModel>;
}
