import React from 'react';
import { IHabitModel } from '@modules/Habit/models/HabitModel';
import HabitListItem from './HabitListItem/HabitListItem';
import useCommonStyles from '@common/useStyles';
import List from '@common/components/List/List';

interface IProps {
  habits: IHabitModel[];
  setHabits: React.Dispatch<React.SetStateAction<IHabitModel[]>>;
  headerText: string;
}

const HabitList: React.FC<IProps> = ({ habits, setHabits, headerText }) => {
  const { styles: commonStyles } = useCommonStyles();

  return (
    <List
      header={<span className={commonStyles.headerText}>{headerText}</span>}
      dataSource={habits}
      renderItem={(item) => {
        return <HabitListItem habit={item} setHabits={setHabits} />;
      }}
    />
  );
};

export default HabitList;
