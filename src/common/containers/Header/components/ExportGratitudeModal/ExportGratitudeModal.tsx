import { Form, message } from 'antd';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { FirebaseError } from '@firebase/util';
import FormModal from '@common/components/FormModal';
import { CategoryColorsDTO } from '@common/constants/CategoryColors';
import useGratitudeListFetch from '@modules/Gratitude/hooks/useGratitudeListFetch';
import { saveAs } from 'file-saver';
import dayjs from 'dayjs';
import { IGratitudeModel } from '@modules/Gratitude/models/GratitudeModel';
import GratitudeListFiltersModel, {
  IGratitudeListFiltersModel
} from '@modules/Gratitude/models/GratitudeListFiltersModel';
import { exportlimit, ExportLimit } from '@common/constants/ExportLimit';
import Select from '@common/components/Select';
export interface IExportGratitudeModalalProps {
  handleSubmit: () => void;
  handleCancel: () => void;
}

interface IExportGratitudeModalProps extends IGratitudeListFiltersModel {
  limit: ExportLimit;
}

const ExportGratitudeModal: React.FC<IExportGratitudeModalalProps> = ({ handleSubmit, handleCancel }) => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const { getGratitudes } = useGratitudeListFetch();

  const handleDownloadJson = useCallback((gratitudes: IGratitudeModel[]) => {
    const currentDate = dayjs().format('YYYY-MM-DD');
    const fileName = `kaizen-journey-gratitude-${currentDate}.json`;

    const fileToSave = new Blob([JSON.stringify(gratitudes, null, 2)], {
      type: 'application/json'
    });

    saveAs(fileToSave, fileName);
  }, []);

  const onFinish = async (values: IExportGratitudeModalProps) => {
    try {
      const serializedFilters = GratitudeListFiltersModel.serialize(values);
      const gratitudes = await getGratitudes({ mode: 'myList', filters: serializedFilters, limitCount: values.limit });
      handleDownloadJson(gratitudes);
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
    <FormModal<IExportGratitudeModalProps>
      modalProps={{
        title: intl.formatMessage({ id: 'exportGratitude.form.title' }),
        onCancel: handleCancel,
        width: 400
      }}
      form={form}
      initialValues={{ limit: exportlimit[0] }}
      onFinish={onFinish}
      submitButtonText={intl.formatMessage({ id: 'exportGratitude.form.submit' })}
    >
      <>
        <Form.Item label={intl.formatMessage({ id: 'gratitude.form.field.tags' })} name="tags">
          <Select<string[]>
            type="tag"
            mode="tags"
            style={{ width: '100%' }}
            tokenSeparators={['#', ' ']}
            onChange={(value) => {
              form.setFieldsValue({ tags: value.map((i) => i.toLowerCase()) });
            }}
          />
        </Form.Item>
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

export default ExportGratitudeModal;
