import { Select, Space } from 'antd';
import { useIntl } from 'react-intl';
import { useMemo } from 'react';
import { useTheme } from 'antd-style';
import { createStyles } from 'antd-style';

const { Option } = Select;

const useStyles = createStyles(({ css, token }) => ({
  categoryColor: css`
    width: 20px;
    height: 20px;
    border-radius: ${token.borderRadiusSM}px;
  `
}));

const useSelectOptionColor = () => {
  const intl = useIntl();
  const theme = useTheme();
  const { styles } = useStyles();

  const selectOptionsColor = useMemo(() => {
    return Object.entries(theme.layout.colorsCategory).map((categoryColor, index) => (
      <Option key={index} value={categoryColor[0]}>
        <Space>
          <div
            className={styles.categoryColor}
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
