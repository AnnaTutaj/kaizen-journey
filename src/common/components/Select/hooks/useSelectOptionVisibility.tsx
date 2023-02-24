import { Select, Space } from 'antd';
import { Visibility } from '@common/constants/Visibility';
import { faGlobe, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useIntl } from 'react-intl';
import { useMemo } from 'react';

const { Option } = Select;

const useSelectOptionVisibility = () => {
  const intl = useIntl();

  const visibilityOptions = useMemo(
    () => [
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
    ],
    []
  );

  const selectOptionsVisibility = useMemo(() => {
    return visibilityOptions.map((visibility, index) => (
      <Option key={index} value={visibility.value}>
        <Space>
          <FontAwesomeIcon icon={visibility.icon} />
          {intl.formatMessage({ id: `common.visibility.${visibility.type}` })}
        </Space>
      </Option>
    ));
  }, [intl, visibilityOptions]);

  return { selectOptionsVisibility };
};

export default useSelectOptionVisibility;
