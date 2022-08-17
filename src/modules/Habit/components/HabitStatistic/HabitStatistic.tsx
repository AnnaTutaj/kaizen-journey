import React from 'react';
import { useIntl } from 'react-intl';
import { Space, Table, Tooltip } from 'antd';
import styles from './HabitStatistic.module.less';
import { IHabitModel } from '@modules/Habit/models/HabitModel';
import useHabitHelper from '@modules/Habit/hooks/useHabitHelper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong, faCalendarDays, faCheck, faPause } from '@fortawesome/free-solid-svg-icons';
import { ColumnsType } from 'antd/lib/table';

interface IProps {
  habit: IHabitModel;
}
interface IStatistic {
  type: 'currentStreak' | 'longestStreak' | 'total';
  checks: number;
  skipped: number;
  minDate: string;
  maxDate: string;
}

const HabitStatistic: React.FC<IProps> = ({ habit }) => {
  const intl = useIntl();
  const { getMinMaxDates } = useHabitHelper();
  const { minDate, maxDate } = getMinMaxDates(habit);

  const columns = (): ColumnsType<IStatistic> => {
    const cols: ColumnsType<IStatistic> = [
      {
        dataIndex: 'type',
        render: (value) => <span>{intl.formatMessage({ id: `habit.${value}` })}</span>
      },
      {
        title: () => (
          <Tooltip title={intl.formatMessage({ id: 'habit.statistic.check' })}>
            <FontAwesomeIcon icon={faCheck} />
          </Tooltip>
        ),
        dataIndex: 'checks',
        align: 'right'
      },
      {
        title: () => (
          <Tooltip title={intl.formatMessage({ id: 'habit.statistic.skipped' })}>
            <FontAwesomeIcon icon={faPause} />
          </Tooltip>
        ),
        dataIndex: 'skipped',
        align: 'right'
      },
      {
        title: () => (
          <Tooltip title={intl.formatMessage({ id: 'habit.statistic.date' })}>
            <FontAwesomeIcon icon={faCalendarDays} />
          </Tooltip>
        ),
        render: (record: IStatistic) => (
          <>
            {record.minDate ? (
              <Space size={8} wrap={true}>
                <span className={styles.Date}>{record.minDate}</span>
                {record.minDate !== record.maxDate ? (
                  <>
                    <FontAwesomeIcon icon={faArrowRightLong} />
                    <span className={styles.Date}>{record.maxDate}</span>
                  </>
                ) : null}
              </Space>
            ) : null}
          </>
        )
      }
    ];

    return cols;
  };

  return (
    <Table<IStatistic>
      bordered={true}
      columns={columns()}
      dataSource={[
        {
          type: 'currentStreak',
          checks: habit.currentStreak.streakCount,
          skipped: habit.currentStreak.skippedCount,
          minDate: habit.currentStreak.dates[0],
          maxDate: habit.currentStreak.dates[habit.currentStreak.dates.length - 1]
        },
        {
          type: 'longestStreak',
          checks: habit.longestStreak.streakCount,
          skipped: habit.longestStreak.skippedCount,
          minDate: habit.longestStreak.dates[0],
          maxDate: habit.longestStreak.dates[habit.longestStreak.dates.length - 1]
        },
        {
          type: 'total',
          checks: habit.datesChecked.length,
          skipped: habit.datesSkipped.length,
          minDate: minDate,
          maxDate: maxDate
        }
      ]}
      pagination={false}
    />
  );
};

export default HabitStatistic;
