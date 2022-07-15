import { RangeLastDaysType } from '@common/constants/RangeLastDaysType';

export interface IHabitTrackerOwnState {
  habitTracker: IHabitTrackerState;
}

export interface IHabitTrackerState {
  rangeLastDays: RangeLastDaysType;
}
