import { IModule } from 'redux-dynamic-modules';
import { IHabitTrackerOwnState } from './HabitTrackerInterface';
import HabitTrackerReducer from './HabitTrackerReducer';

const HabitTrackerModule: IModule<IHabitTrackerOwnState> = {
  id: 'habitTrackerModule',
  reducerMap: {
    habitTracker: HabitTrackerReducer
  }
};

export default HabitTrackerModule;
