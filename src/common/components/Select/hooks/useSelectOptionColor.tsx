import { Select, Space } from 'antd';
import { useIntl } from 'react-intl';
import { useMemo } from 'react';
import { StyledCategoryColor } from './styled';
import { useTheme } from 'styled-components';

const { Option } = Select;

const useSelectOptionColor = () => {
  const intl = useIntl();
  const theme = useTheme();

  const selectOptionsColor = useMemo(() => {
    return Object.entries(theme.layout.colorsCategory).map((categoryColor, index) => (
      <Option key={index} value={categoryColor[0]}>
        <Space>
          <StyledCategoryColor
            style={{
              backgroundColor: categoryColor[1]
            }}
          />
          {intl.formatMessage({ id: `common.color.${categoryColor[0]}` })}
        </Space>
      </Option>
    ));
  }, [intl, theme.layout.colorsCategory]);

  return { selectOptionsColor };
};

export default useSelectOptionColor;
