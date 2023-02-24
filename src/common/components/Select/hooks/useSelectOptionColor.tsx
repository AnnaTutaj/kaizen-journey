import { Select, Space } from 'antd';
import { useIntl } from 'react-intl';
import { useMemo } from 'react';
import { CategoryColors } from '@common/constants/CategoryColors';
import styles from './useSelectOptionColor.module.less';

const { Option } = Select;

const useSelectOptionColor = () => {
  const intl = useIntl();

  const selectOptionsColor = useMemo(() => {
    return Object.entries(CategoryColors).map((categoryColor, index) => (
      <Option key={index} value={categoryColor[0]}>
        <Space>
          <div
            className={styles.CategoryColor}
            style={{
              backgroundColor: categoryColor[1]
            }}
          />
          {intl.formatMessage({ id: `common.color.${categoryColor[0]}` })}
        </Space>
      </Option>
    ));
  }, [intl]);

  return { selectOptionsColor };
};

export default useSelectOptionColor;