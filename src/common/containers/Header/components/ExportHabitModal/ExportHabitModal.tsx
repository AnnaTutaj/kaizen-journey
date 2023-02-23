import { Form, message, Select, Space } from 'antd';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { FirebaseError } from '@firebase/util';
import FormModal from '@common/components/FormModal';
import { Visibility } from '@common/constants/Visibility';
import { faGlobe, faLock } from '@fortawesome/free-solid-svg-icons';
import { CategoryColors, CategoryColorsDTO } from '@common/constants/CategoryColors';
import styles from './ExportHabitModal.module.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useHabitFetch from '@modules/Habit/hooks/useHabitFetch';
import { saveAs } from 'file-saver';
import dayjs from 'dayjs';
import { IHabitModel } from '@modules/Habit/models/HabitModel';
import HabitListFiltersModel, { IHabitListFiltersModel } from '@modules/Habit/models/HabitListFiltersModel';
import { exportlimit, ExportLimit } from '@common/constants/ExportLimit';

const { Option } = Select;

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

export default ExportHabitModal;
