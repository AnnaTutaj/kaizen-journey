import { Select } from 'antd';
import { useMemo } from 'react';
import { exportlimit } from '@common/constants/ExportLimit';
import { useIntl } from 'react-intl';

const { Option } = Select;

const useSelectOptionExportLimit = () => {
  const intl = useIntl();

  const selectOptionsExportLimit = useMemo(() => {
    return exportlimit.map((limit, index) => (
      <Option key={index} value={limit}>
        {limit === 0 ? intl.formatMessage({ id: 'export.noLimit' }) : limit}
      </Option>
    ));
  }, [intl]);

  return { selectOptionsExportLimit };
};

export default useSelectOptionExportLimit;
