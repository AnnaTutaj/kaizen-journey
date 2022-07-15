import { createStore, IModuleStore } from 'redux-dynamic-modules';
import { getThunkExtension } from 'redux-dynamic-modules-thunk';
import GratitudeMyListModule from '@modules/Gratitude/redux/GratitudeMyList/GratitudeMyListModule';
import HabitTrackerModule from '@modules/Habit/redux/HabitTracker/HabitTrackerModule';

export const moduleStore: IModuleStore<any> = createStore(
  {
    extensions: [getThunkExtension()]
  },
  GratitudeMyListModule,
  HabitTrackerModule
);

export default moduleStore;
