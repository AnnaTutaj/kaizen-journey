import { Select as AntDSelect, SelectProps } from 'antd';
import { useCallback } from 'react';
import useSelectOptionColor from './hooks/useSelectOptionColor';
import useSelectOptionExportLimit from './hooks/useSelectOptionExportLimit';
import useSelectOptionTag from './hooks/useSelectOptionTag';
import useSelectOptionVisibility from './hooks/useSelectOptionVisibility';
import useSelectOptionCategory from './hooks/useSelectOptionCategory';
import { CategoryColorType } from '@common/containers/App/ColorPalette';

export const { Option } = AntDSelect;
type SelectType = 'color' | 'category' | 'visibility' | 'tag' | 'exportLimit';

export interface ISelectProps<T> extends SelectProps<T> {
  type?: SelectType;
  showInactiveColors?: CategoryColorType[];
}

const Select = <T extends {}>({ type, showInactiveColors, children, ...props }: ISelectProps<T>) => {
  const { selectOptionsVisibility } = useSelectOptionVisibility();
  const { selectOptionsColor } = useSelectOptionColor();
  const { selectOptionsCategory } = useSelectOptionCategory({ showInactiveColors });
  const { selectOptionsTag } = useSelectOptionTag();
  const { selectOptionsExportLimit } = useSelectOptionExportLimit();

  const renderOptions = useCallback(
    (type: SelectType): JSX.Element[] => {
      switch (type) {
        case 'visibility':
          return selectOptionsVisibility;

        case 'color':
          return selectOptionsColor;

        case 'category':
          return selectOptionsCategory;

        case 'tag':
          return selectOptionsTag;

        case 'exportLimit':
          return selectOptionsExportLimit;
      }
    },
    [selectOptionsVisibility, selectOptionsColor, selectOptionsCategory, selectOptionsTag, selectOptionsExportLimit]
  );

  return <AntDSelect {...props}>{type ? renderOptions(type) : children}</AntDSelect>;
};

export default Select;
