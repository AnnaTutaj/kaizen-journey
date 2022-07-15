import { Button, Select, Space } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import styles from './HabitTracker.module.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import HabitTable from '@modules/Habit/components/HabitTable';
import { IHabitCreateModalProps } from '@modules/Habit/components/HabitCreateModal/HabitCreateModal';
import HabitCreateModal from '@modules/Habit/components/HabitCreateModal';
import { IHabitModel } from '@modules/Habit/models/HabitModel';
import useHabitFetch from '@modules/Habit/hooks/useHabitFetch';
import PageLoading from '@common/components/PageLoading';
import { RangeLastDaysType } from '@common/constants/RangeLastDaysType';
import { useSelector } from 'react-redux';
import { IHabitTrackerOwnState } from '@modules/Habit/redux/HabitTracker/HabitTrackerInterface';
import HabitTrackerActions from '@modules/Habit/redux/HabitTracker/HabitTrackerActions';

interface IRangeSelect {
  label: string;
  value: RangeLastDaysType;
}

const HabitTracker: React.FC = () => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const range = useSelector(({ habitTracker }: IHabitTrackerOwnState) => habitTracker.rangeLastDays);

  const [habitCreateModalConfig, setHabitCreateModalConfig] = useState<IHabitCreateModalProps>();
  const [habits, setHabits] = useState<IHabitModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isInitialLoaded, setIsInitialLoaded] = useState<boolean>(false);
  const { getHabits } = useHabitFetch();

  useEffect(() => {
    async function fetchHabits() {
      const loadedHabits = await getHabits({ setLoading, isArchived: false });
      setHabits(loadedHabits);
      setIsInitialLoaded(true);
    }

    fetchHabits();
  }, [getHabits]);

  const handleCreateSubmit = async () => {
    const loadedHabits = await getHabits({ setLoading, isArchived: false });
    setHabits(loadedHabits);
  };

  const handleCreateHabit = () => {
    setHabitCreateModalConfig({
      handleCancel: () => setHabitCreateModalConfig(undefined),
      handleSubmit: async () => {
        setHabitCreateModalConfig(undefined);
        await handleCreateSubmit();
      }
    });
  };

  const rangeSelectOptions = useMemo((): IRangeSelect[] => {
    const range: IRangeSelect[] = [];
    const days: RangeLastDaysType[] = [7, 14, 30, 60, 90];

    days.forEach((i) => {
      range.push({ label: intl.formatMessage({ id: 'habit.table.select.lastDays' }, { days: i }), value: i });
    });

    return range;
  }, [intl]);

  return (
    <>
      {loading ? <PageLoading /> : null}
      <div className={styles.Header}>
        <div className={styles.HeaderRangeSelect}>
          <Select<IRangeSelect['value']>
            options={rangeSelectOptions}
            defaultValue={range}
            onChange={(value) => HabitTrackerActions.setRangeLastDaysAction(value)(dispatch)}
          />
        </div>
        <Button type="primary" onClick={() => handleCreateHabit()}>
          <Space size={10}>
            <FontAwesomeIcon icon={faPlus} />
            {intl.formatMessage({ id: 'habit.create.button' })}
          </Space>
        </Button>
      </div>
      <HabitTable habits={habits} setHabits={setHabits} isInitialLoaded={isInitialLoaded} />
      {habitCreateModalConfig ? <HabitCreateModal {...habitCreateModalConfig} /> : null}
    </>
  );
};

export default HabitTracker;
