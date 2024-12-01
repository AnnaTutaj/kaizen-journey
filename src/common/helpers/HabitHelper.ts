import _ from 'lodash';
import { IHabitModel } from '@modules/Habit/models/HabitModel';

const sortedHabits = (habits: IHabitModel[], order: string[]): IHabitModel[] => {
  return _.sortBy(
    habits,
    (item) => {
      const index = order.indexOf(item.id);
      return index === -1 ? Infinity : index;
    },
    (item) => item.name
  );
};

export { sortedHabits };
