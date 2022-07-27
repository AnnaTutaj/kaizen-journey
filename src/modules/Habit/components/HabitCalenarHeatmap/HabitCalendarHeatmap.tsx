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
  year: string;
}

interface ICalendarHeatMapValue {
  date: string;
  dateStatus: HabitDateStatus;
}

const HabitCalendarHeatmap: React.FC<IProps> = ({ habit, year }) => {
  const intl = useIntl();
  const { getDateStatus } = useHabitHelper();

  const selectedYear = moment(year).format('YYYY-MM-DD');
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

  const colorByStatus = (value: ICalendarHeatMapValue) => {
    if (!value || value.dateStatus === HabitDateStatus.unchecked) {
      return 'color-empty';
    }

    if (value.dateStatus === HabitDateStatus.skipped) {
      return `color-lighten-${habit.colorLighten.name}`;
    }

    return `color-${habit.color.name}`;
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
            key={index}
            title={intl.formatMessage(
              { id: `habit.calendarHeatmap.dateTooltip.${value.dateStatus}` },
              { date: `${moment(value.date).format('ll [(]ddd[)]')}` }
            )}
          >
            {element}
          </Tooltip>
        );
      }}
      classForValue={(value: ICalendarHeatMapValue) => {
        let classCell = '';
        classCell = colorByStatus(value);
        if (value.date === moment().format('YYYY-MM-DD')) {
          classCell = `${classCell} mark-today`;
        }

        return classCell;
      }}
    />
  );
};

export default HabitCalendarHeatmap;
