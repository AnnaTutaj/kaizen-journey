import { IModule } from 'redux-dynamic-modules';
import { IGratitudeMyListOwnState } from './GratitudeMyListInterface';
import GratitudeMyListReducer from './GratitudeMyListReducer';

const GratitudeMyListModule: IModule<IGratitudeMyListOwnState> = {
  id: 'gratitudeMyListModule',
  reducerMap: {
    gratitudeMyList: GratitudeMyListReducer
  }
};

export default GratitudeMyListModule;
