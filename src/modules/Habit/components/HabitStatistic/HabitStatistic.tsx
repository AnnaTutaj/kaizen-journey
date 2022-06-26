import React from 'react';
import { useIntl } from 'react-intl';
import { Col, Row, Statistic } from 'antd';
import styles from './HabitStatistic.module.less';
import { IHabitModel } from '@modules/Habit/models/HabitModel';

interface IProps {
  habit: IHabitModel;
}

const HabitStatistic: React.FC<IProps> = ({ habit }) => {
  const intl = useIntl();

  //todo: add tooltips to streaks with dates/ paused days counts
  return (
    <>
      <Row gutter={[16, 16]} justify="center" className={styles.StatisticRow}>
        <Col span={12} md={6} xxl={4}>
          <Statistic
            title={intl.formatMessage({ id: 'habit.currentStreak' })}
            value={habit.currentStreak.streakCount}
          />
        </Col>
        <Col span={12} md={6} xxl={4}>
          <Statistic
            title={intl.formatMessage({ id: 'habit.longestStreak' })}
            value={habit.longestStreak.streakCount}
          />
        </Col>
        <Col span={12} md={6} xxl={4}>
          <Statistic title={intl.formatMessage({ id: 'habit.totalCount' })} value={habit.datesChecked.length} />
        </Col>
        <Col span={12} md={6} xxl={4}>
          <Statistic title={intl.formatMessage({ id: 'habit.totalSkippedCount' })} value={habit.datesSkipped.length} />
        </Col>
      </Row>
    </>
  );
};

export default HabitStatistic;
