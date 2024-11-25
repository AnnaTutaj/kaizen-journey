import React from 'react';
import { useIntl } from 'react-intl';
import GratitudeFormModel, { IGratitudeFormModel } from '@modules/Gratitude/models/GratitudeFormModel';
import GratitudeForm from '@modules/Gratitude/components/GratitudeForm';
import { IGratitudeModel } from '@modules/Gratitude/models/GratitudeModel';
import useErrorMessage from '@common/hooks/useErrorMessage';
import GratitudeResource from '@modules/Gratitude/api/GratitudeResource';

export interface IGratitudeUpdateModalProps {
  handleSubmit: () => void;
  handleCancel: () => void;
  gratitude: IGratitudeModel;
}

const GratitudeUpdateModal: React.FC<IGratitudeUpdateModalProps> = ({ handleSubmit, handleCancel, gratitude }) => {
  const intl = useIntl();
  const { showError } = useErrorMessage();

  const onFinish = async (values: IGratitudeFormModel) => {
    try {
      const finalValues = GratitudeFormModel.serializeToUpdate(values);
      await GratitudeResource.update(gratitude.id, finalValues); 

      handleSubmit();
    } catch (error) {
      showError(error);
    }
  };

  return (
    <GratitudeForm
      onFinish={onFinish}
      initialValues={GratitudeFormModel.build(gratitude)}
      showInactiveColors={[gratitude.color]}
      handleCancel={handleCancel}
      title={intl.formatMessage({ id: 'gratitude.update.title' })}
    />
  );
};

export default GratitudeUpdateModal;
