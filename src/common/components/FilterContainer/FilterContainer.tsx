import { createStyles } from 'antd-style';
import { JSX } from 'react';

const useStyles = createStyles(({ css }, props: IFilterContainerStyleProps) => ({
  container: css`
    display: ${props.showFilters ? 'block' : 'none'};
  `
}));

interface IFilterContainerStyleProps {
  showFilters?: boolean;
}

export interface IFilterContainerProps extends IFilterContainerStyleProps {
  children: JSX.Element;
}

const FilterContainer: React.FC<IFilterContainerProps> = ({ showFilters, children }) => {
  const { styles } = useStyles({ showFilters });

  return <div className={styles.container}>{children}</div>;
};

export default FilterContainer;
