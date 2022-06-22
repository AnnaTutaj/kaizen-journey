import React from 'react';
import moment from 'moment';
import CalendarHeatmap from 'react-calendar-heatmap';
import { Tooltip } from 'antd';
import 'react-calendar-heatmap/dist/styles.css';
import './habit-calendar-heatmap.css';
import { IHabitModel } from '@modules/Habit/models/HabitModel';

interface IProps {
  habit: IHabitModel;
}

interface ICalendarHeatMapValue {
  date: string;
  count: number;
}

const HabitCalendarHeatmap: React.FC<IProps> = ({ habit }) => {
  //todo: Add year select. E.g. start range: current year, end range: current year - 100 years
  const selectedYear = moment().format('YYYY-MM-DD');
  const startDate = moment(selectedYear).startOf('year').subtract(1, 'day').format('YYYY-MM-DD');
  const endDate = moment(selectedYear).endOf('year').format('YYYY-MM-DD');

  const prepareValues = (): ICalendarHeatMapValue[] => {
    const values: ICalendarHeatMapValue[] = [];

    const startDateMoment = moment(startDate);
    const endDateMoment = moment(endDate);

    while (startDateMoment.isSameOrBefore(endDateMoment)) {
      values.push({
        date: startDateMoment.format('YYYY-MM-DD'),
        count: habit.datesChecked.indexOf(startDateMoment.format('YYYY-MM-DD')) >= 0 ? 1 : 0
      });
      startDateMoment.add(1, 'days');
    }

    return values;
  };

  //todo: show paused days aswell (with lighter color) + set text in tooltip "Wykonano w dniu ...", "Zapauzowano w dniu...", "Nie wykonano w dniu..."
  return (
    <CalendarHeatmap
      startDate={startDate}
      endDate={endDate}
      showWeekdayLabels={true}
      gutterSize={2}
      monthLabels={moment.monthsShort()}
      weekdayLabels={moment.weekdaysShort()}
      values={prepareValues()}
      transformDayElement={(element: any, value: ICalendarHeatMapValue | null, index: number) => {
        return <Tooltip title={value?.date}>{element}</Tooltip>;
      }}
      classForValue={(value) => {
        if (!value || value.count === 0) {
          return 'color-empty';
        }

        return `color-${habit.color.name}`;
      }}
    />
  );
};

export default HabitCalendarHeatmap;
