import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { useCallback, useRef } from 'react';
import { useIntl } from 'react-intl';
import { useEffect } from 'react';
import moment, { Moment } from 'moment';
import styles from './HabitTable.module.less';
import cn from 'classnames';

const HabitTable: React.FC = () => {
  const intl = useIntl();

  interface DataType {
    key: string;
    name: string;
    description: string;
    createdByUid: string;
    datesChecked: string[];
  }

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollTo = useCallback(() => {
    if (scrollContainerRef.current) {
      console.log(scrollContainerRef.current.scrollWidth);
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

  //todo: add/remove value from array in Firebase + refresh view + loading
  const handleClickDate = (date: Moment) => {
    console.log(date.format('YYYY-MM-DD'));
  };

  const columns = (): ColumnsType<DataType> => {
    const dateCols: ColumnsType<DataType> = [];

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
          const isChecked = record.datesChecked.findIndex((i) => i === dateKey) > -1;

          return <div onClick={() => handleClickDate(date)} className={cn({ [styles.Checked]: isChecked })}></div>;
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
      //todo: calculate
      {
        title: () => <div className={styles.StreakHeader}>{intl.formatMessage({ id: 'habit.currentStreak' })}</div>,
        className: styles.StreakCol,
        key: 'currentStrike',
        fixed: 'right',
        render: (value, record) => <div>42</div>
      },
      {
        title: () => <div className={styles.StreakHeader}>{intl.formatMessage({ id: 'habit.longestStreak' })}</div>,
        className: styles.StreakCol,
        key: 'longestStrike',
        fixed: 'right',
        render: (value, record) => <div>42</div>
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

  //todo: remove when testing on dummy data would be finished
  const data: DataType[] = [
    {
      key: '1',
      name: 'Sprzątanie min 15 min',
      description: 'min 15 min',
      createdByUid: '',
      datesChecked: ['2022-06-07', '2022-06-08']
    },
    {
      key: '2',
      name: 'Lorem ipsum dolor sit amet',
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscin',
      createdByUid: '',
      datesChecked: ['2022-06-06', '2022-06-05']
    }
  ];

  return <Table bordered={true} columns={columns()} dataSource={data} pagination={false} scroll={{ x: true }} />;
};

export default HabitTable;
