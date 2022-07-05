import React from 'react';
import { useIntl } from 'react-intl';
import { Col, Row, Statistic } from 'antd';
import styles from './HabitStatistic.module.less';
import { IHabitModel } from '@modules/Habit/models/HabitModel';
import { IStreak } from '@common/helpers/StreakHelper';
import useHabitHelper from '@modules/Habit/hooks/useHabitHelper';

interface IProps {
  habit: IHabitModel;
}

const HabitStatistic: React.FC<IProps> = ({ habit }) => {
  const intl = useIntl();

  const renderStreakValues = (streak: IStreak) => {
    return (
      <>
        <div>
          {intl.formatMessage({ id: 'habit.statistic.check' })}: {streak.streakCount}
        </div>
        <div className={styles.SmallText}>
          {intl.formatMessage({ id: 'habit.statistic.skipped' })}: {streak.skippedCount}
        </div>

        {streak.dates.length ? (
          <div className={styles.SmallText}>
            {streak.dates[0]}
            <>{streak.dates.length > 1 ? <> → {streak.dates[streak.dates.length - 1]}</> : null}</>
          </div>
        ) : null}
      </>
    );
  };

  const { getMinMaxDates } = useHabitHelper();
  const { minDate, maxDate } = getMinMaxDates(habit);

  return (
    <>
      <Row gutter={[16, 16]} justify="center" className={styles.StatisticRow}>
        <Col span={12} md={6} xxl={4}>
          <Statistic
            title={intl.formatMessage({ id: 'habit.currentStreak' })}
            valueRender={() => renderStreakValues(habit.currentStreak)}
          />
        </Col>
        <Col span={12} md={6} xxl={4}>
          <Statistic
            title={intl.formatMessage({ id: 'habit.longestStreak' })}
            valueRender={() => renderStreakValues(habit.longestStreak)}
          />
        </Col>
        <Col span={12} md={6} xxl={4}>
          <Statistic
            title={intl.formatMessage({ id: 'habit.statistic.total' })}
            valueRender={() => (
              <>
                <div>
                  {intl.formatMessage({ id: 'habit.statistic.check' })}: {habit.datesChecked.length}
                </div>
                <div className={styles.SmallText}>
                  {intl.formatMessage({ id: 'habit.statistic.skipped' })}: {habit.datesSkipped.length}
                </div>
                {minDate && (habit.datesSkipped.length || habit.datesChecked.length) ? (
                  <div className={styles.SmallText}>
                    {minDate}
                    <>{minDate !== maxDate ? <> → {maxDate}</> : null}</>
                  </div>
                ) : null}
              </>
            )}
          />
        </Col>
      </Row>
    </>
  );
};

export default HabitStatistic;
