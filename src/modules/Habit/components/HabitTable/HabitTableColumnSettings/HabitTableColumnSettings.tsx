import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { Checkbox, Space } from 'antd';
import { StyledDivider } from './styled';

export enum ColumnType {
  currentStreak = 'currentStreak',
  longestStreak = 'longestStreak',
  totalChecks = 'totalChecks'
}

interface IProps {
  visibleColumns: CheckboxValueType[];
  setVisibleColumns: React.Dispatch<React.SetStateAction<CheckboxValueType[]>>;
}

const HabitTableColumnSettings: React.FC<IProps> = ({ visibleColumns, setVisibleColumns }) => {
  const intl = useIntl();

  const plainOptions: ColumnType[] = [ColumnType.currentStreak, ColumnType.longestStreak, ColumnType.totalChecks];

  const [indeterminate, setIndeterminate] = useState<boolean>(false);
  const [checkAll, setCheckAll] = useState<boolean>(true);

  const onChange = (list: CheckboxValueType[]) => {
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
      <StyledDivider dashed />
      <Checkbox.Group value={visibleColumns} onChange={onChange}>
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
