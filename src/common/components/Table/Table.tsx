import { Table as AntDTable } from 'antd';
import { ColumnType } from 'antd/es/table';
import { TableProps } from 'antd/es/table/InternalTable';
import { useMemo } from 'react';

export interface ITableColumn<T> extends ColumnType<T> {
  visible?: () => boolean;
}

export interface ITableProps<T> extends TableProps<T> {
  columns: ITableColumn<T>[];
}

const Table = <T extends {}>({ columns, ...props }: ITableProps<T>) => {
  const filteredColumns = useMemo(
    () => columns.filter((column) => column.visible === undefined || column.visible()),
    [columns]
  );

  return <AntDTable<T> {...props} columns={filteredColumns} />;
};

export default Table;
