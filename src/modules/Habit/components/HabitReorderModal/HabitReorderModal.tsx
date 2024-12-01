import { Form } from 'antd';
import React, { useCallback, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import FormModal from '@common/components/FormModal';
import useErrorMessage from '@common/hooks/useErrorMessage';
import { IHabitModel } from '@modules/Habit/models/HabitModel';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { createStyles } from 'antd-style';
import HabitReorderItem from './components/HabitReorderItem';
import HabitReorderItemSortable from './components/HabitReorderItemSortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import HabitResource from '@modules/Habit/api/HabitResource';
import { useUserProfile } from '@common/contexts/UserProfile/UserProfileContext';

export interface IHabitReorderModalalProps {
  handleSubmit: (order: string[]) => void;
  handleCancel: () => void;
  habits: IHabitModel[];
}

const HabitReorderModal: React.FC<IHabitReorderModalalProps> = ({ habits, handleSubmit, handleCancel }) => {
  const intl = useIntl();
  const { userProfile } = useUserProfile();
  const { styles } = useStyles();
  const [form] = Form.useForm();
  const { showError } = useErrorMessage();
  const sensors = useSensors(useSensor(PointerSensor));
  const [items, setItems] = useState<IHabitModel[]>(habits);
  const [activeId, setActiveId] = useState<string>();
  const activeItem = useMemo(() => habits.find((i) => i.id === activeId), [activeId]);

  const onCancel = useCallback(() => {
    //todo: show 'Unsaved changes' alert if order is changed and close is clicked 
    handleCancel();
  }, []);

  const onFinish = async () => {
    try {
      const order = items.map((i) => i.id);
      await HabitResource.setOrder(userProfile.uid, { order: order });
      handleSubmit(order);
    } catch (error) {
      showError(error);
    }
  };


  const handleDragStart = useCallback(({ active }: DragStartEvent) => {
    if (active.id) {
      setActiveId(active.id as string);
    }
  }, []);

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);
      setItems(arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <FormModal
      modalProps={{
        title: intl.formatMessage({ id: 'habit.reorder' }),
        onCancel,
        width: 400
      }}
      form={form}
      onFinish={onFinish}
    >
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <div className={styles.container}>
            {items.map((item) => (
              <HabitReorderItemSortable key={item.id} habit={item} />
            ))}
          </div>
        </SortableContext>
        <DragOverlay>{activeItem ? <HabitReorderItem habit={activeItem} /> : null}</DragOverlay>
      </DndContext>
    </FormModal>
  );
};

const useStyles = createStyles(({ css, token }) => ({
  container: css`
    display: flex;
    gap: ${token.marginSM}px;
    flex-direction: column;
    margin-bottom: ${token.margin}px;
  `
}));

export default HabitReorderModal;
