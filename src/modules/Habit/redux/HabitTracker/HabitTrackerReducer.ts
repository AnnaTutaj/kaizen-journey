import { produce } from 'immer';
import { UserDispatchUnion } from '@common/redux/UserActions';
import { HabitTrackerDispatchUnion } from './HabitTrackerActions';
import { IHabitTrackerState } from './HabitTrackerInterface';
import { HabitTrackerTypes } from './HabitTrackerTypes';
import { UserTypes } from '@common/redux/UserType';

const initialState: IHabitTrackerState = {
  rangeLastDays: 14
};

const HabitTrackerReducer = (
  state = initialState,
  action: HabitTrackerDispatchUnion | UserDispatchUnion
): IHabitTrackerState =>
  produce(state, (draft) => {
    switch (action.type) {
      case UserTypes.USER_LOG_OUT: {
        draft.rangeLastDays = initialState.rangeLastDays;

        break;
      }

      case HabitTrackerTypes.HABIT_TRACKER_SET_RANGE_LAST_DAYS: {
        draft.rangeLastDays = action.payload.rangeLastDays;

        break;
      }
    }
  });

export default HabitTrackerReducer;
