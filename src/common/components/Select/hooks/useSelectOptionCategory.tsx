import { Flex, Select, Typography } from 'antd';
import { useIntl } from 'react-intl';
import { useMemo } from 'react';
import { useTheme } from 'antd-style';
import { createStyles } from 'antd-style';
import { useUserProfile } from '@common/contexts/UserProfile/UserProfileContext';
import { CategoryColorType } from '@common/containers/App/ColorPalette';
import useCategories from '@common/hooks/useCategories';

const { Option } = Select;
const { Text } = Typography;

const useStyles = createStyles(({ css, token }) => ({
  categoryColor: css`
    min-width: 20px;
    width: 20px;
    height: 20px;
    border-radius: ${token.borderRadiusSM}px;
  `
}));

const useSelectOptionCategory = ({ showInactiveColors }: { showInactiveColors?: CategoryColorType[] }) => {
  const intl = useIntl();
  const theme = useTheme();
  const { styles } = useStyles();
  const { userProfile } = useUserProfile();
  const { defaultCategories } = useCategories();

  const categories = useMemo(() => {
    return (userProfile.categories.length ? userProfile.categories : defaultCategories).filter(
      (i) => (showInactiveColors && showInactiveColors.includes(i.color)) || i.isSelected
    );
  }, [userProfile.categories, defaultCategories, showInactiveColors]);

  const selectOptionsCategory = useMemo(() => {
    return categories.map((category, index) => (
      <Option key={index} value={category.color}>
        <Flex align="center" gap={8}>
          <div
            className={styles.categoryColor}
            style={{
              backgroundColor: theme.layout.colorsCategory[category.color]
            }}
          />
          <Text ellipsis>{category.name}</Text>
        </Flex>
      </Option>
    ));
  }, [intl, theme.layout.colorsCategory, categories]);

  return { selectOptionsCategory };
};

export default useSelectOptionCategory;
