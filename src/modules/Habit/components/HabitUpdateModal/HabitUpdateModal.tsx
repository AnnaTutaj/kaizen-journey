import React from 'react';
import { useIntl } from 'react-intl';
import HabitFormModel, { IHabitFormModel } from '@modules/Habit/models/HabitFormModel';
import HabitForm from '@modules/Habit/components/HabitForm';
import { IHabitModel } from '@modules/Habit/models/HabitModel';
import useHabitFetch from '@modules/Habit/hooks/useHabitFetch';
import useErrorMessage from '@common/hooks/useErrorMessage';

export interface IHabitUpdateModalProps {
  handleSubmit: () => void;
  handleCancel: () => void;
  habit: IHabitModel;
}

const HabitUpdateModal: React.FC<IHabitUpdateModalProps> = ({ handleSubmit, handleCancel, habit }) => {
  const intl = useIntl();
  const { updateHabit } = useHabitFetch();
  const { showError } = useErrorMessage();

  const onFinish = async (values: IHabitFormModel) => {
    try {
      const serializedValues = HabitFormModel.serializeToUpdate(values);
      await updateHabit(habit.id, serializedValues);
      handleSubmit();
    } catch (error) {
      showError(error);
    }
  };

  return (
    <HabitForm
      onFinish={onFinish}
      initialValues={HabitFormModel.build(habit)}
      handleCancel={handleCancel}
      title={intl.formatMessage({ id: 'habit.update.title' })}
    />
  );
};

export default HabitUpdateModal;
