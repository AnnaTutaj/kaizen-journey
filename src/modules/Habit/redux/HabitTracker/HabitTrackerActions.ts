import { Dispatch } from 'redux';
import { ActionsUnion, createAction as createActionHelper } from '@common/helpers/ActionHelper';
import { HabitTrackerTypes } from './HabitTrackerTypes';
import { RangeLastDaysType } from '@common/constants/RangeLastDaysType';

const setRangeLastDaysAction = (rangeLastDays: RangeLastDaysType) => (dispatch: Dispatch) => {
  dispatch(HabitTrackerDispatch.setRangeLastDays(rangeLastDays));
};

export const HabitTrackerDispatch = {
  setRangeLastDays: (rangeLastDays: RangeLastDaysType) =>
    createActionHelper(HabitTrackerTypes.HABIT_TRACKER_SET_RANGE_LAST_DAYS, { rangeLastDays })
};

export type HabitTrackerDispatchUnion = ActionsUnion<typeof HabitTrackerDispatch>;

export default {
  setRangeLastDaysAction
};
