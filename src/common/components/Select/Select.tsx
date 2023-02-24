import { Select as AntDSelect, SelectProps } from 'antd';
import { useCallback } from 'react';
import useSelectOptionColor from './hooks/useSelectOptionColor';
import useSelectOptionExportLimit from './hooks/useSelectOptionExportLimit';
import useSelectOptionTag from './hooks/useSelectOptionTag';
import useSelectOptionVisibility from './hooks/useSelectOptionVisibility';

export const { Option } = AntDSelect;
type SelectType = 'color' | 'visibility' | 'tag' | 'exportLimit';

export interface ISelectProps<T> extends SelectProps<T> {
  type?: SelectType;
}

const Select = <T extends {}>({ type, children, ...props }: ISelectProps<T>) => {
  const { selectOptionsVisibility } = useSelectOptionVisibility();
  const { selectOptionsColor } = useSelectOptionColor();
  const { selectOptionsTag } = useSelectOptionTag();
  const { selectOptionsExportLimit } = useSelectOptionExportLimit();

  const renderOptions = useCallback(
    (type: SelectType): JSX.Element[] => {
      switch (type) {
        case 'visibility':
          return selectOptionsVisibility;

        case 'color':
          return selectOptionsColor;

        case 'tag':
          return selectOptionsTag;

        case 'exportLimit':
          return selectOptionsExportLimit;
      }
    },
    [selectOptionsVisibility, selectOptionsColor, selectOptionsTag, selectOptionsExportLimit]
  );

  return <AntDSelect {...props}>{type ? renderOptions(type) : children}</AntDSelect>;
};

export default Select;
