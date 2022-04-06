import { message } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@common/util/firebase';
import { FirebaseError } from '@firebase/util';
import { useAuth } from '@common/contexts/AuthContext';
import GratitudeFormModel, { IGratitudeFormModel } from '@modules/Gratitude/models/GratitudeFormModel';
import GratitudeForm from '@modules/Gratitude/components/GratitudeForm';
import moment from 'moment';

export interface IGratitudeCreateModalProps {
  handleSubmit: (gratitudeId: string) => void;
  handleCancel: () => void;
}

const GratitudeCreateModal: React.FC<IGratitudeCreateModalProps> = ({ handleSubmit, handleCancel }) => {
  const intl = useIntl();
  const { userProfile } = useAuth();

  const onFinish = async (values: IGratitudeFormModel) => {
    try {
      const finalValues = GratitudeFormModel.serializeToCreate({
        createdByUid: userProfile?.uid || '',
        createdBy: userProfile?.username || '',
        createdByPictureURL: userProfile?.pictureURL || '',
        ...values
      });

      const gratitudeRef = await addDoc(collection(db, 'gratitude'), finalValues);

      handleSubmit(gratitudeRef?.id);
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
      handleCancel={handleCancel}
      title={intl.formatMessage({ id: 'gratitude.create.title' })}
      initialValues={{
        date: moment()
      }}
    />
  );
};

export default GratitudeCreateModal;
