import { createStore, IModuleStore } from 'redux-dynamic-modules';
import { getThunkExtension } from 'redux-dynamic-modules-thunk';
import GratitudeMyListModule from '@modules/Gratitude/redux/GratitudeMyList/GratitudeMyListModule';

export const moduleStore: IModuleStore<any> = createStore(
  {
    extensions: [getThunkExtension()]
  },
  GratitudeMyListModule
);

export default moduleStore;
