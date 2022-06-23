import React from 'react';
import { useIntl } from 'react-intl';
import moment from 'moment';
import CalendarHeatmap from 'react-calendar-heatmap';
import { Tooltip } from 'antd';
import 'react-calendar-heatmap/dist/styles.css';
import './habit-calendar-heatmap.less';
import { IHabitModel } from '@modules/Habit/models/HabitModel';
import { HabitDateStatus } from '@common/constants/HabitDateStatus';
import useHabitHelper from '@modules/Habit/hooks/useHabitHelper';

interface IProps {
  habit: IHabitModel;
}

interface ICalendarHeatMapValue {
  date: string;
  dateStatus: HabitDateStatus;
}

const HabitCalendarHeatmap: React.FC<IProps> = ({ habit }) => {
  const intl = useIntl();
  const { getDateStatus } = useHabitHelper();

  //todo: Add year select. E.g. start range: current year, end range: current year - 100 years
  const selectedYear = moment().format('YYYY-MM-DD');
  const startDate = moment(selectedYear).startOf('year').subtract(1, 'day').format('YYYY-MM-DD');
  const endDate = moment(selectedYear).endOf('year').format('YYYY-MM-DD');

  const prepareValues = (): ICalendarHeatMapValue[] => {
    const values: ICalendarHeatMapValue[] = [];

    const startDateMoment = moment(startDate);
    const endDateMoment = moment(endDate);

    while (startDateMoment.isSameOrBefore(endDateMoment)) {
      const dateStatus = getDateStatus(habit, startDateMoment.format('YYYY-MM-DD'));

      values.push({
        date: startDateMoment.format('YYYY-MM-DD'),
        dateStatus: dateStatus
      });

      startDateMoment.add(1, 'days');
    }

    return values;
  };

  return (
    <CalendarHeatmap
      startDate={startDate}
      endDate={endDate}
      showWeekdayLabels={true}
      gutterSize={2}
      monthLabels={moment.monthsShort()}
      weekdayLabels={moment.weekdaysShort()}
      values={prepareValues()}
      transformDayElement={(element: any, value: ICalendarHeatMapValue, index: number) => {
        return (
          <Tooltip
            title={intl.formatMessage(
              { id: `habit.calendarHeatmap.dateTooltip.${value.dateStatus}` },
              { date: moment(value.date).format('ll') }
            )}
          >
            {element}
          </Tooltip>
        );
      }}
      classForValue={(value: ICalendarHeatMapValue) => {
        if (!value || value.dateStatus === HabitDateStatus.unchecked) {
          return 'color-empty';
        }

        if (value.dateStatus === HabitDateStatus.skipped) {
          return `color-lighten-${habit.colorLighten.name}`;
        }

        return `color-${habit.color.name}`;
      }}
    />
  );
};

export default HabitCalendarHeatmap;
