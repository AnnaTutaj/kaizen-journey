import { Form, message } from 'antd';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { FirebaseError } from '@firebase/util';
import FormModal from '@common/components/FormModal';
import { CategoryColorsDTO } from '@common/constants/CategoryColors';
import useHabitFetch from '@modules/Habit/hooks/useHabitFetch';
import { saveAs } from 'file-saver';
import dayjs from 'dayjs';
import { IHabitModel } from '@modules/Habit/models/HabitModel';
import HabitListFiltersModel, { IHabitListFiltersModel } from '@modules/Habit/models/HabitListFiltersModel';
import { exportlimit, ExportLimit } from '@common/constants/ExportLimit';
import Select from '@common/components/Select';

export interface IExportHabitModalalProps {
  handleSubmit: () => void;
  handleCancel: () => void;
}

interface IExportHabitModalProps extends IHabitListFiltersModel {
  limit: ExportLimit;
}

const ExportHabitModal: React.FC<IExportHabitModalalProps> = ({ handleSubmit, handleCancel }) => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const { getHabits } = useHabitFetch();

  const handleDownloadJson = useCallback((habits: IHabitModel[]) => {
    const currentDate = dayjs().format('YYYY-MM-DD');
    const fileName = `kaizen-journey-habit-${currentDate}.json`;

    const fileToSave = new Blob([JSON.stringify(habits, null, 2)], {
      type: 'application/json'
    });

    saveAs(fileToSave, fileName);
  }, []);

  const onFinish = async (values: IExportHabitModalProps) => {
    try {
      const serializedFilters = HabitListFiltersModel.serialize(values);
      const habits = await getHabits({ filters: serializedFilters, limitCount: values.limit });
      handleDownloadJson(habits);
      handleSubmit();
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorMessage = intl.formatMessage({
          id: error.code,
          defaultMessage: intl.formatMessage({ id: 'common.defaultErrorMessage' })
        });
        message.error(errorMessage);
      }
    }
  };

  return (
    <FormModal<IExportHabitModalProps>
      modalProps={{
        title: intl.formatMessage({ id: 'exportHabit.form.title' }),
        onCancel: handleCancel,
        width: 400
      }}
      form={form}
      initialValues={{ limit: exportlimit[0] }}
      onFinish={onFinish}
      submitButtonText={intl.formatMessage({ id: 'exportHabit.form.submit' })}
    >
      <>
        <Form.Item label={intl.formatMessage({ id: 'common.form.field.color' })} name="color">
          <Select<CategoryColorsDTO> type="color" allowClear />
        </Form.Item>
        <Form.Item label={intl.formatMessage({ id: 'common.form.field.visibility' })} name="isPublic">
          <Select<boolean> type="visibility" allowClear />
        </Form.Item>
        <Form.Item label={intl.formatMessage({ id: 'common.form.field.limit' })} name="limit">
          <Select<number> type="exportLimit" />
        </Form.Item>
      </>
    </FormModal>
  );
};

export default ExportHabitModal;
