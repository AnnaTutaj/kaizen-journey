import React from 'react';
import { useIntl } from 'react-intl';
import dayjs from 'dayjs';
import CalendarHeatmap from 'react-calendar-heatmap';
import { Space, Tooltip } from 'antd';
import { IHabitModel } from '@modules/Habit/models/HabitModel';
import { HabitDateStatus } from '@common/constants/HabitDateStatus';
import useHabitHelper from '@modules/Habit/hooks/useHabitHelper';
import useStyles from './useStyles';

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
  const { styles } = useStyles({ habitColor: habit.color });
  const { getDateStatus } = useHabitHelper();

  const selectedYear = dayjs(year).format('YYYY-MM-DD');
  const startDate = dayjs(selectedYear).startOf('year').subtract(1, 'day').format('YYYY-MM-DD');
  const endDate = dayjs(selectedYear).endOf('year').format('YYYY-MM-DD');

  const prepareValues = (): ICalendarHeatMapValue[] => {
    const values: ICalendarHeatMapValue[] = [];

    let startDateMoment = dayjs(startDate);
    const endDateMoment = dayjs(endDate);

    while (startDateMoment.isSameOrBefore(endDateMoment)) {
      const dateStatus = getDateStatus(habit, startDateMoment.format('YYYY-MM-DD'));

      values.push({
        date: startDateMoment.format('YYYY-MM-DD'),
        dateStatus: dateStatus
      });
      startDateMoment = startDateMoment.add(1, 'days');
    }

    return values;
  };

  const colorByStatus = (value: ICalendarHeatMapValue) => {
    if (!value || value.dateStatus === HabitDateStatus.unchecked) {
      return 'color-empty';
    }

    if (value.dateStatus === HabitDateStatus.skipped) {
      return 'color-skipped';
    }

    return `color-${habit.color}`;
  };

  return (
    <div className={styles.container}>
      <CalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        showWeekdayLabels={true}
        gutterSize={2}
        monthLabels={dayjs.monthsShort()}
        weekdayLabels={dayjs.weekdaysShort()}
        values={prepareValues()}
        transformDayElement={(element: any, value: ICalendarHeatMapValue, index: number) => {
          return (
            <Tooltip
              key={index}
              title={intl.formatMessage(
                { id: `habit.calendarHeatmap.dateTooltip.${value.dateStatus}` },
                { date: `${dayjs(value.date).format('ll [(]ddd[)]')}` }
              )}
            >
              {element}
            </Tooltip>
          );
        }}
        classForValue={(value: ICalendarHeatMapValue) => {
          let classCell = '';
          classCell = colorByStatus(value);
          if (value.date === dayjs().format('YYYY-MM-DD')) {
            classCell = `${classCell} mark-today`;
          }

          return classCell;
        }}
      />
      <div className={styles.legendContainer}>
        <Space size={20}>
          <Space>
            <div className={styles.legendColor} />
            {intl.formatMessage({ id: 'habit.calendarHeatmap.legend.marked' })}
          </Space>
          <Space>
            <div className={styles.legendColorSkipped} />
            {intl.formatMessage({ id: 'habit.calendarHeatmap.legend.skipped' })}
          </Space>
          <Space>
            <div className={styles.legendColorToday} />
            {intl.formatMessage({ id: 'habit.calendarHeatmap.legend.today' })}
          </Space>
        </Space>
      </div>
    </div>
  );
};

export default HabitCalendarHeatmap;
