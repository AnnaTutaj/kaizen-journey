import { Modal, Form, Input, Button, message, DatePicker, Switch } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@common/util/firebase';
import { FirebaseError } from '@firebase/util';
import { useAuth } from '@common/contexts/AuthContext';
import moment from 'moment';
import GratitudeFormModel, { IGratitudeFormModel } from '@modules/Gratitude/models/GratitudeFormModel';

const { TextArea } = Input;

interface IProps {
  isModalVisible: boolean;
  handleSubmit: (gratitudeId: string) => void;
  handleCancel: () => void;
}

const GratitudeCreateModal: React.FC<IProps> = ({ isModalVisible, handleSubmit, handleCancel }) => {
  const intl = useIntl();
  const { userProfile } = useAuth();

  const onFinish = async (values: IGratitudeFormModel) => {
    try {
      const finalValues = GratitudeFormModel.serialize({
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
    <Modal
      title={intl.formatMessage({ id: 'gratitude.form.title' })}
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={false}
      width={400}
    >
      <Form name="basic" initialValues={{ date: moment() }} onFinish={onFinish} autoComplete="off" layout={'vertical'}>
        <Form.Item
          label={intl.formatMessage({ id: 'gratitude.form.field.title' })}
          name="title"
          rules={[
            { required: true, message: intl.formatMessage({ id: 'common.form.field.required.error' }) },
            { max: 50, message: intl.formatMessage({ id: 'common.form.field.max.error' }, { max: 100 }) }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={intl.formatMessage({ id: 'gratitude.form.field.description' })}
          name="description"
          rules={[{ max: 5000, message: intl.formatMessage({ id: 'common.form.field.max.error' }, { max: 5000 }) }]}
        >
          <TextArea rows={2} showCount maxLength={200} />
        </Form.Item>

        <Form.Item label={intl.formatMessage({ id: 'gratitude.form.field.date' })} name="date">
          <DatePicker />
        </Form.Item>

        <Form.Item
          label={intl.formatMessage({ id: 'gratitude.form.field.isPublic' })}
          name="isPublic"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {intl.formatMessage({ id: 'gratitude.form.submit' })}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default GratitudeCreateModal;
