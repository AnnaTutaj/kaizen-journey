import React from 'react';
import { useIntl } from 'react-intl';
import { useUserProfile } from '@common/contexts/UserProfile/UserProfileContext';
import HabitFormModel, { IHabitFormModel } from '@modules/Habit/models/HabitFormModel';
import HabitForm from '@modules/Habit/components/HabitForm';
import useHabitFetch from '@modules/Habit/hooks/useHabitFetch';
import useErrorMessage from '@common/hooks/useErrorMessage';

export interface IHabitCreateModalProps {
  handleSubmit: (habitId: string) => void;
  handleCancel: () => void;
}

const HabitCreateModal: React.FC<IHabitCreateModalProps> = ({ handleSubmit, handleCancel }) => {
  const intl = useIntl();
  const { userProfile } = useUserProfile();
  const { createHabit } = useHabitFetch();
  const { showError } = useErrorMessage();

  const onFinish = async (values: IHabitFormModel) => {
    try {
      const serializedValues = HabitFormModel.serializeToCreate({
        createdByUid: userProfile.uid,
        ...values
      });

      const habitRef = await createHabit(serializedValues);

      handleSubmit(habitRef?.id);
    } catch (error) {
      showError(error);
    }
  };

  return (
    <HabitForm
      onFinish={onFinish}
      handleCancel={handleCancel}
      title={intl.formatMessage({ id: 'habit.create.title' })}
      initialValues={{
        color: 'default',
        isPublic: false
      }}
    />
  );
};

export default HabitCreateModal;
