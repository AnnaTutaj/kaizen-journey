import React from 'react';
import { IHabitModel } from '@modules/Habit/models/HabitModel';
import { createStyles } from 'antd-style';
import HabitReorderItem from '../HabitReorderItem';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface IProps {
  habit: IHabitModel;
}

const HabitReorderItemSortable: React.FC<IProps> = ({ habit }) => {
  const { styles, cx } = useStyles();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: habit.id
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className={cx(styles.draggable, {
        [styles.isDragging]: isDragging
      })}
      key={habit.id}
    >
      <HabitReorderItem habit={habit} />
    </div>
  );
};

const useStyles = createStyles(({ css }) => ({
  draggable: css`
    cursor: grab;
  `,
  isDragging: css`
    cursor: grabbing;
    opacity: 0.5;
  `
}));

export default HabitReorderItemSortable;
