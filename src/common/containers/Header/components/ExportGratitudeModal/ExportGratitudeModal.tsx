import { Form, message, Select, Space } from 'antd';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { FirebaseError } from '@firebase/util';
import { useAuth } from '@common/contexts/AuthContext';
import FormModal from '@common/components/FormModal';
import { Visibility } from '@common/constants/Visibility';
import { faGlobe, faLock } from '@fortawesome/free-solid-svg-icons';
import { CategoryColors, CategoryColorsDTO } from '@common/constants/CategoryColors';
import styles from './ExportGratitudeModal.module.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useGratitudeListFetch from '@modules/Gratitude/hooks/useGratitudeListFetch';
import { saveAs } from 'file-saver';
import dayjs from 'dayjs';
import { IGratitudeModel } from '@modules/Gratitude/models/GratitudeModel';
import GratitudeListFiltersModel, {
  IGratitudeListFiltersModel
} from '@modules/Gratitude/models/GratitudeListFiltersModel';
import { exportlimit, ExportLimit } from '@common/constants/ExportLimit';

const { Option } = Select;

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
  const { userProfile } = useAuth();

  const visibilityOptions = [
    {
      type: Visibility.public,
      icon: faGlobe,
      value: true
    },
    {
      type: Visibility.private,
      icon: faLock,
      value: false
    }
  ];

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
            mode="tags"
            style={{ width: '100%' }}
            tokenSeparators={['#', ' ']}
            onChange={(value) => {
              form.setFieldsValue({ tags: value.map((i) => i.toLowerCase()) });
            }}
          >
            {userProfile.tags.map((tag) => (
              <Option key={tag}>{tag}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label={intl.formatMessage({ id: 'gratitude.form.field.color' })} name="color">
          <Select<CategoryColorsDTO> allowClear>
            {Object.entries(CategoryColors).map((categoryColor, index) => (
              <Option key={index} value={categoryColor[0]}>
                <Space>
                  <div
                    className={styles.CategoryColor}
                    style={{
                      backgroundColor: categoryColor[1]
                    }}
                  ></div>
                  {intl.formatMessage({ id: `common.color.${categoryColor[0]}` })}
                </Space>
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label={intl.formatMessage({ id: 'common.form.field.visibility' })} name="isPublic">
          <Select<boolean> allowClear>
            {visibilityOptions.map((visibility, index) => (
              <Option key={index} value={visibility.value}>
                <Space>
                  <FontAwesomeIcon icon={visibility.icon} />
                  {intl.formatMessage({ id: `common.visibility.${visibility.type}` })}
                </Space>
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label={intl.formatMessage({ id: 'common.form.field.limit' })} name="limit">
          <Select<number>>
            {exportlimit.map((limit, index) => (
              <Option key={index} value={limit}>
                {limit === 0 ? intl.formatMessage({ id: 'export.noLimit' }) : limit}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </>
    </FormModal>
  );
};

export default ExportGratitudeModal;
