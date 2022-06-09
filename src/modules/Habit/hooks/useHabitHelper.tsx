import { IHabitModel } from '@modules/Habit/models/HabitModel';
import { HabitDateStatus } from '@common/constants/HabitDateStatus';
import { faCheck, faPause, faTimes } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';

const useHabitHelper = () => {
  const getDateStatus = (habit: IHabitModel, dateKey: string): HabitDateStatus => {
    if (habit.datesChecked.findIndex((i) => i === dateKey) > -1) {
      return HabitDateStatus.checked;
    }

    if (habit.datesSkipped.findIndex((i) => i === dateKey) > -1) {
      return HabitDateStatus.skipped;
    }

    return HabitDateStatus.unchecked;
  };

  const getIconByDateStatus = (dateStatus: HabitDateStatus): IconDefinition => {
    switch (dateStatus) {
      case HabitDateStatus.checked:
        return faCheck;

      case HabitDateStatus.skipped:
        return faPause;

      case HabitDateStatus.unchecked:
        return faTimes;
    }
  };

  const getIconHoverByDateStatus = (dateStatus: HabitDateStatus): IconDefinition => {
    switch (dateStatus) {
      case HabitDateStatus.checked:
        return faPause;

      case HabitDateStatus.skipped:
        return faTimes;

      case HabitDateStatus.unchecked:
        return faCheck;
    }
  };

  return { getDateStatus, getIconByDateStatus, getIconHoverByDateStatus };
};

export default useHabitHelper;
