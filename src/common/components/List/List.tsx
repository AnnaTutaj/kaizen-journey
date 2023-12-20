import { List as AntdList, ListProps } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ css }) => ({
  list: css`
    .ant-list-header {
      padding-top: 0;
      border: none;
    }

    .ant-list-item {
      border: none;
    }
  `
}));

const List = <T extends {}>(props: ListProps<T>) => {
  const { styles } = useStyles();
  return <AntdList {...props} className={styles.list} />;
};

export default List;
