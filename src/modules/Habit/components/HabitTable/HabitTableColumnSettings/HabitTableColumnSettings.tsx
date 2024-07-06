import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { Checkbox, Divider, Space } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ css }) => ({
  divider: css`
    margin: 16px 0;
  `
}));

export enum ColumnType {
  currentStreak = 'currentStreak',
  longestStreak = 'longestStreak',
  totalChecks = 'totalChecks'
}

interface IProps {
  visibleColumns: ColumnType[];
  setVisibleColumns: React.Dispatch<React.SetStateAction<ColumnType[]>>;
}

const HabitTableColumnSettings: React.FC<IProps> = ({ visibleColumns, setVisibleColumns }) => {
  const intl = useIntl();
  const { styles } = useStyles();

  const plainOptions: ColumnType[] = [ColumnType.currentStreak, ColumnType.longestStreak, ColumnType.totalChecks];

  const [indeterminate, setIndeterminate] = useState<boolean>(false);
  const [checkAll, setCheckAll] = useState<boolean>(true);

  const onChange = (list: ColumnType[]) => {
    setVisibleColumns(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setVisibleColumns(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  return (
    <>
      <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
        {intl.formatMessage({ id: 'common.checkAll' })}
      </Checkbox>
      <Divider className={styles.divider} dashed />
      <Checkbox.Group<ColumnType> value={visibleColumns} onChange={onChange}>
        <Space direction="vertical">
          <Checkbox value="currentStreak">{intl.formatMessage({ id: 'habit.currentStreak' })}</Checkbox>
          <Checkbox value="longestStreak">{intl.formatMessage({ id: 'habit.longestStreak' })}</Checkbox>
          <Checkbox value="totalChecks">{intl.formatMessage({ id: 'habit.totalChecks' })}</Checkbox>
        </Space>
      </Checkbox.Group>
    </>
  );
};

export default HabitTableColumnSettings;
