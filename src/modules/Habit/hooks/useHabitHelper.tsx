import { IHabitModel } from '@modules/Habit/models/HabitModel';
import { HabitDateStatus } from '@common/constants/HabitDateStatus';
import { faCheck, faPause, faTimes } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { useIntl } from 'react-intl';
import dayjs from 'dayjs';
import { useCallback } from 'react';

const useHabitHelper = () => {
  const intl = useIntl();

  const getDateStatus = useCallback((habit: IHabitModel, dateKey: string): HabitDateStatus => {
    if (habit.datesChecked.findIndex((i) => i === dateKey) > -1) {
      return HabitDateStatus.checked;
    }

    if (habit.datesSkipped.findIndex((i) => i === dateKey) > -1) {
      return HabitDateStatus.skipped;
    }

    return HabitDateStatus.unchecked;
  }, []);

  const getIconByDateStatus = useCallback((dateStatus: HabitDateStatus): IconDefinition => {
    switch (dateStatus) {
      case HabitDateStatus.checked:
        return faCheck;

      case HabitDateStatus.skipped:
        return faPause;

      case HabitDateStatus.unchecked:
        return faTimes;
    }
  }, []);

  const getHoverInfoByDateStatus = useCallback(
    (dateStatus: HabitDateStatus): { icon: IconDefinition; text: string } => {
      switch (dateStatus) {
        case HabitDateStatus.checked:
          return { icon: faPause, text: intl.formatMessage({ id: 'habit.pause' }) };

        case HabitDateStatus.skipped:
          return { icon: faTimes, text: intl.formatMessage({ id: 'habit.uncheck' }) };

        case HabitDateStatus.unchecked:
          return { icon: faCheck, text: intl.formatMessage({ id: 'habit.check' }) };
      }
    },
    [intl]
  );

  const getMinMaxDates = useCallback((habit: IHabitModel): { maxDate: string; minDate: string } => {
    const allDates = [...habit.datesChecked, ...habit.datesSkipped];

    if (!allDates.length) {
      return { maxDate: '', minDate: '' };
    }

    const moments = allDates.map((d) => dayjs(d));
    const maxDate = dayjs.max(moments)?.format('YYYY-MM-DD') || '';
    const minDate = dayjs.min(moments)?.format('YYYY-MM-DD') || '';

    return { maxDate, minDate };
  }, []);

  return { getDateStatus, getIconByDateStatus, getHoverInfoByDateStatus, getMinMaxDates };
};

export default useHabitHelper;
