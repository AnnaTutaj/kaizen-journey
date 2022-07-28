import { message } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import { FirebaseError } from '@firebase/util';
import { useAuth } from '@common/contexts/AuthContext';
import HabitFormModel, { IHabitFormModel } from '@modules/Habit/models/HabitFormModel';
import HabitForm from '@modules/Habit/components/HabitForm';
import useHabitFetch from '@modules/Habit/hooks/useHabitFetch';

export interface IHabitCreateModalProps {
  handleSubmit: (habitId: string) => void;
  handleCancel: () => void;
}

const HabitCreateModal: React.FC<IHabitCreateModalProps> = ({ handleSubmit, handleCancel }) => {
  const intl = useIntl();
  const { userProfile } = useAuth();
  const { createHabit } = useHabitFetch();

  const onFinish = async (values: IHabitFormModel) => {
    try {
      const serializedValues = HabitFormModel.serializeToCreate({
        createdByUid: userProfile?.uid || '',
        ...values
      });

      const habitRef = await createHabit(serializedValues);

      handleSubmit(habitRef?.id);
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorMessage = intl.formatMessage({
          id: error.code,
          defaultMessage: intl.formatMessage({ id: 'common.defaultErrorMessage' })
        });
        message.error(errorMessage);
      } else {
        message.error(intl.formatMessage({ id: 'common.defaultErrorMessage' }));
      }
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
