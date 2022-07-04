import React from 'react';
import { List } from 'antd';
import { IHabitModel } from '@modules/Habit/models/HabitModel';
import styles from '@modules/Habit/components/HabitList/HabitList.module.less';
import HabitListItem from './HabitListItem/HabitListItem';
import HeaderText from '@common/components/HeaderText';

interface IProps {
  habits: IHabitModel[];
  setHabits: React.Dispatch<React.SetStateAction<IHabitModel[]>>;
  headerText: string;
}

const HabitList: React.FC<IProps> = ({ habits, setHabits, headerText }) => {
  return (
    <List
      className={styles.HabitList}
      header={<HeaderText text={headerText} />}
      dataSource={habits}
      renderItem={(item) => {
        return <HabitListItem habit={item} setHabits={setHabits} />;
      }}
    />
  );
};

export default HabitList;
