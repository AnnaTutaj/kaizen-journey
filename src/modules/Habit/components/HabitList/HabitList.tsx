import React from 'react';
import { IHabitModel } from '@modules/Habit/models/HabitModel';
import HabitListItem from './HabitListItem/HabitListItem';
import { StyledList } from '@common/components/List/styled';
import { StyledHeaderText } from '@common/components/HeaderText/styled';

interface IProps {
  habits: IHabitModel[];
  setHabits: React.Dispatch<React.SetStateAction<IHabitModel[]>>;
  headerText: string;
}

const HabitList: React.FC<IProps> = ({ habits, setHabits, headerText }) => {
  return (
    <StyledList
      header={<StyledHeaderText>{headerText}</StyledHeaderText>}
      dataSource={habits}
      renderItem={(item) => {
        return <HabitListItem habit={item} setHabits={setHabits} />;
      }}
    />
  );
};

export default HabitList;
