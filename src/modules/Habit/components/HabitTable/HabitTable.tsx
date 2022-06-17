import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { useCallback, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { useEffect } from 'react';
import moment from 'moment';
import styles from './HabitTable.module.less';
import cn from 'classnames';
import { IHabitModel } from '@modules/Habit/models/HabitModel';
import { HabitDateStatus } from '@common/constants/HabitDateStatus';
import useHabitHelper from '@modules/Habit/hooks/useHabitHelper';
import useHabitFetch from '@modules/Habit/hooks/useHabitFetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PageLoading from '@common/components/PageLoading';

interface IProps {
  habits: IHabitModel[];
  setHabits: React.Dispatch<React.SetStateAction<IHabitModel[]>>;
}

const HabitTable: React.FC<IProps> = ({ habits, setHabits }) => {
  const intl = useIntl();
  const [loading, setLoading] = useState<boolean>(false);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const { getDateStatus, getIconByDateStatus, getHoverInfoByDateStatus } = useHabitHelper();
  const { getHabitById, updateHabitDates } = useHabitFetch();

  const scrollTo = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'end'
      });
    }
  }, []);

  useEffect(() => {
    scrollTo();
  }, [scrollTo]);

  const refreshHabit = async (habit: IHabitModel) => {
    const updatedHabit = await getHabitById(habit.id);
    if (updatedHabit) {
      setHabits((prevState) => {
        return prevState.map((i) => (i.id === updatedHabit.id ? updatedHabit : i));
      });
    }
  };

  //todo: delete PageLoading and move loading to the clicked cell
  const handleClickDate = async (dateKey: string, habit: IHabitModel, dateStatus: HabitDateStatus) => {
    setLoading(true);
    await updateHabitDates({ habitId: habit.id, dateStatus, dateKey });
    await refreshHabit(habit);
    setLoading(false);
  };

  const columns = (): ColumnsType<IHabitModel> => {
    const dateCols: ColumnsType<IHabitModel> = [];

    const today = moment();
    //todo move daysCount to select: eg. last 14 days, last month, last two months, last three months. Default: 14 days
    for (let i = 0; i <= 14; i++) {
      const isToday = i === 0;
      const date = today.clone().subtract(i, 'days');
      const dateKey = date.format('YYYY-MM-DD');
      const monthShort = date.format('MMM');
      const monthDay = date.format('D');
      const weekDayShort = date.format('ddd');

      dateCols.push({
        title: () => {
          return (
            <div className={styles.DateHeaderContainer}>
              <div
                className={cn(styles.Date, { [styles.DateToday]: isToday })}
                ref={isToday ? scrollContainerRef : null}
              >
                <small className={styles.SmallText}>{monthShort}</small>
                <div className={styles.MonthDay}>{monthDay}</div>
                <small className={styles.SmallText}>{weekDayShort}</small>
              </div>
            </div>
          );
        },
        key: `date-${i}`,
        className: styles.DateCol,
        render: (value, record) => {
          const dateStatus = getDateStatus(record, dateKey);
          const { icon: hoverIcon, text: hoverText } = getHoverInfoByDateStatus(dateStatus);

          return (
            <div
              onClick={() => {
                handleClickDate(dateKey, record, dateStatus);
              }}
              className={cn(styles.DateSelectContainer, { [styles.Skipped]: dateStatus === HabitDateStatus.skipped })}
              style={{
                borderColor: record.colorLighten.value,
                backgroundColor: dateStatus === HabitDateStatus.checked ? record.color.value : 'unset'
              }}
            >
              <FontAwesomeIcon
                className={styles.DateHoverIcon}
                style={{
                  color: record.colorLighten.value
                }}
                icon={hoverIcon}
              />
              <small
                className={styles.DateHoverText}
                style={{
                  color: record.colorLighten.value
                }}
              >
                {hoverText}
              </small>
              {dateStatus === HabitDateStatus.skipped ? (
                <FontAwesomeIcon
                  className={styles.DateInfoIcon}
                  style={{
                    color: record.color.value
                  }}
                  icon={getIconByDateStatus(dateStatus)}
                />
              ) : null}
            </div>
          );
        }
      });
    }

    dateCols.reverse();

    return [
      {
        title: 'Name',
        className: styles.NameCol,
        dataIndex: 'name',
        key: 'name',
        fixed: true,
        render: (text) => (
          <>
            <div className={styles.HabitName}>{text}</div>
          </>
        )
      },
      ...dateCols,
      {
        title: () => <div className={styles.StreakHeader}>{intl.formatMessage({ id: 'habit.currentStreak' })}</div>,
        className: styles.StreakCol,
        key: 'currentStrike',
        fixed: 'right',
        render: (value, record) => <div>{record.currentStreak.streakCount}</div>
      },
      {
        title: () => <div className={styles.StreakHeader}>{intl.formatMessage({ id: 'habit.longestStreak' })}</div>,
        className: styles.StreakCol,
        key: 'longestStrike',
        fixed: 'right',
        render: (value, record) => <div>{record.longestStreak.streakCount}</div>
      },
      {
        title: () => <div className={styles.StreakHeader}>{intl.formatMessage({ id: 'habit.totalCount' })}</div>,
        className: styles.StreakCol,
        key: 'totalCount',
        fixed: 'right',
        render: (value, record) => <div>{record.datesChecked.length}</div>
      }
    ];
  };

  //todo empty list
  return (
    <>
      {loading ? <PageLoading /> : null}
      <Table
        bordered={true}
        columns={columns()}
        dataSource={habits}
        pagination={false}
        scroll={{ x: true }}
        rowKey="id"
        className={styles.HabitTable}
      />
    </>
  );
};

export default HabitTable;
