import { IHabitModel } from '@modules/Habit/models/HabitModel';
import { HabitDateStatus } from '@common/constants/HabitDateStatus';
import { faCheck, faPause, faTimes } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { useIntl } from 'react-intl';
import moment from 'moment';

const useHabitHelper = () => {
  const intl = useIntl();

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

  const getHoverInfoByDateStatus = (dateStatus: HabitDateStatus): { icon: IconDefinition; text: string } => {
    switch (dateStatus) {
      case HabitDateStatus.checked:
        return { icon: faPause, text: intl.formatMessage({ id: 'habit.pause' }) };

      case HabitDateStatus.skipped:
        return { icon: faTimes, text: intl.formatMessage({ id: 'habit.uncheck' }) };

      case HabitDateStatus.unchecked:
        return { icon: faCheck, text: intl.formatMessage({ id: 'habit.check' }) };
    }
  };

  const getMinMaxDates = (habit: IHabitModel): { maxDate: string; minDate: string } => {
    const allDates = [...habit.datesChecked, ...habit.datesSkipped];

    const moments = allDates.map((d) => moment(d));
    const maxDate = moment.max(moments).format('YYYY-MM-DD');
    const minDate = moment.min(moments).format('YYYY-MM-DD');

    return { maxDate, minDate };
  };

  return { getDateStatus, getIconByDateStatus, getHoverInfoByDateStatus, getMinMaxDates };
};

export default useHabitHelper;
