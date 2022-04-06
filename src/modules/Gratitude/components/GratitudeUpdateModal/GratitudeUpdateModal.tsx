import { message } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@common/util/firebase';
import { FirebaseError } from '@firebase/util';
import GratitudeFormModel, { IGratitudeFormModel } from '@modules/Gratitude/models/GratitudeFormModel';
import GratitudeForm from '@modules/Gratitude/components/GratitudeForm';
import { IGratitudeModel } from '@modules/Gratitude/models/GratitudeModel';

export interface IGratitudeUpdateModalProps {
  handleSubmit: () => void;
  handleCancel: () => void;
  gratitude: IGratitudeModel;
}

const GratitudeUpdateModal: React.FC<IGratitudeUpdateModalProps> = ({ handleSubmit, handleCancel, gratitude }) => {
  const intl = useIntl();

  const onFinish = async (values: IGratitudeFormModel) => {
    try {
      const finalValues = GratitudeFormModel.serializeToUpdate({
        ...values
      });

      await updateDoc(doc(db, 'gratitude', gratitude.id), finalValues);

      handleSubmit();
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
    <GratitudeForm
      onFinish={onFinish}
      initialValues={GratitudeFormModel.build(gratitude)}
      handleCancel={handleCancel}
      title={intl.formatMessage({ id: 'gratitude.update.title' })}
    />
  );
};

export default GratitudeUpdateModal;
