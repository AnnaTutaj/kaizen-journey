import { colorsCategory } from './../containers/App/ColorPalette';
import { IUserCategory } from '@common/contexts/UserProfile/UserProfileContext';
import { useMemo } from 'react';
import { useIntl } from 'react-intl';

const useCategories = () => {
  const intl = useIntl();

  const defaultCategories = useMemo((): IUserCategory[] => {
    const defaultColors = ['blue', 'brown', 'default', 'green', 'navy', 'orange', 'red'];
    return colorsCategory.map((categoryColor) => {
      return {
        name: intl.formatMessage({ id: `common.categoryColor.${categoryColor}` }),
        isSelected: defaultColors.includes(categoryColor),
        color: categoryColor
      };
    });
  }, [intl]);

  return {
    defaultCategories
  };
};

export default useCategories;
