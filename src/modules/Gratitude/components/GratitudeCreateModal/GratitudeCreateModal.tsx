import React from 'react';
import { useIntl } from 'react-intl';
import { useUserProfile } from '@common/contexts/UserProfile/UserProfileContext';
import GratitudeFormModel, { IGratitudeFormModel } from '@modules/Gratitude/models/GratitudeFormModel';
import GratitudeForm from '@modules/Gratitude/components/GratitudeForm';
import dayjs from 'dayjs';
import useErrorMessage from '@common/hooks/useErrorMessage';
import GratitudeResource from '@modules/Gratitude/api/GratitudeResource';

export interface IGratitudeCreateModalProps {
  handleSubmit: () => void;
  handleCancel: () => void;
}

const GratitudeCreateModal: React.FC<IGratitudeCreateModalProps> = ({ handleSubmit, handleCancel }) => {
  const intl = useIntl();
  const { userProfile } = useUserProfile();
  const { showError } = useErrorMessage();

  const onFinish = async (values: IGratitudeFormModel) => {
    try {
      const finalValues = GratitudeFormModel.serializeToCreate({
        createdByUid: userProfile.uid,
        createdBy: userProfile.username,
        createdByPictureURL: userProfile.pictureURL,
        ...values
      });
      await GratitudeResource.create(finalValues);
      handleSubmit();
    } catch (error) {
      showError(error);
    }
  };

  return (
    <GratitudeForm
      onFinish={onFinish}
      handleCancel={handleCancel}
      title={intl.formatMessage({ id: 'gratitude.create.title' })}
      initialValues={{
        date: dayjs(),
        color: 'default',
        isPublic: false,
        hours: 0,
        minutes: 0
      }}
    />
  );
};

export default GratitudeCreateModal;
