import React from 'react';
import { useIntl } from 'react-intl';
import { Col, Row, Space } from 'antd';
import styles from './HabitStatistic.module.less';
import { IHabitModel } from '@modules/Habit/models/HabitModel';
import { IStreak } from '@common/helpers/StreakHelper';
import useHabitHelper from '@modules/Habit/hooks/useHabitHelper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faCheck, faPause } from '@fortawesome/free-solid-svg-icons';

interface IProps {
  habit: IHabitModel;
}

const HabitStatistic: React.FC<IProps> = ({ habit }) => {
  const intl = useIntl();
  const { getMinMaxDates } = useHabitHelper();
  const { minDate, maxDate } = getMinMaxDates(habit);

  const renderStreakValues = (title: string, streak: IStreak) => {
    return (
      <Space size={8} direction="vertical">
        <div className={styles.Title}>{title}</div>
        <Space className={styles.Text}>
          <FontAwesomeIcon icon={faCheck} />
          <span>
            {intl.formatMessage({ id: 'habit.statistic.check' })}: {streak.streakCount}
          </span>
        </Space>
        <Space className={styles.Text}>
          <FontAwesomeIcon icon={faPause} />
          <span>
            {intl.formatMessage({ id: 'habit.statistic.skipped' })}: {streak.skippedCount}
          </span>
        </Space>
        {streak.dates.length ? (
          <Space className={styles.Text}>
            <FontAwesomeIcon icon={faCalendarDays} />
            <span>
              {streak.dates[0]}
              <>{streak.dates.length > 1 ? <> — {streak.dates[streak.dates.length - 1]}</> : null}</>
            </span>
          </Space>
        ) : null}
      </Space>
    );
  };

  const renderTotalValues = (
    <Space size={8} direction="vertical">
      <div className={styles.Title}>{intl.formatMessage({ id: 'habit.statistic.total' })}</div>

      <Space className={styles.Text}>
        <FontAwesomeIcon icon={faCheck} />
        <span>
          {intl.formatMessage({ id: 'habit.statistic.check' })}: {habit.datesChecked.length}
        </span>
      </Space>
      <Space className={styles.Text}>
        <FontAwesomeIcon icon={faPause} />
        <span>
          {intl.formatMessage({ id: 'habit.statistic.skipped' })}: {habit.datesSkipped.length}
        </span>
      </Space>

      {minDate && (habit.datesSkipped.length || habit.datesChecked.length) ? (
        <Space className={styles.Text}>
          <FontAwesomeIcon icon={faCalendarDays} />
          <span>
            {minDate}
            <>{minDate !== maxDate ? <> — {maxDate}</> : null}</>
          </span>
        </Space>
      ) : null}
    </Space>
  );

  return (
    <Row gutter={[16, 20]} justify="space-around" className={styles.StatisticRow}>
      <Col span={24} md={8} xxl={4}>
        {renderStreakValues(intl.formatMessage({ id: 'habit.currentStreak' }), habit.currentStreak)}
      </Col>
      <Col span={24} md={8} xxl={4}>
        {renderStreakValues(intl.formatMessage({ id: 'habit.longestStreak' }), habit.longestStreak)}
      </Col>
      <Col span={24} md={8} xxl={4}>
        {renderTotalValues}
      </Col>
    </Row>
  );
};

export default HabitStatistic;
