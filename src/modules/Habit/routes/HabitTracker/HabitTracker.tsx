import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useThunkDispatch } from '@common/redux/useThunkDispatch';
import { useIntl } from 'react-intl';
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
import Button from '@common/components/Button';
import Select from '@common/components/Select';
import PageHeader from '@common/components/PageHeader';
import { sortedHabits } from '@common/helpers/HabitHelper';
import _ from 'lodash';

interface IRangeSelect {
  label: string;
  value: RangeLastDaysType;
}

const HabitTracker: React.FC = () => {
  const intl = useIntl();
  const dispatch = useThunkDispatch();

  const range = useSelector(({ habitTracker }: IHabitTrackerOwnState) => habitTracker.rangeLastDays);

  const [habitCreateModalConfig, setHabitCreateModalConfig] = useState<IHabitCreateModalProps>();
  const [habits, setHabits] = useState<IHabitModel[]>([]);
  const [habitOrder, setHabitOrder] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isInitialLoaded, setIsInitialLoaded] = useState<boolean>(false);
  const { getHabits } = useHabitFetch();

  const handleDeleteHabit = useCallback((id: string) => {
    setHabits((prevState) => _.remove(prevState, (i) => i.id !== id));
  }, []);

  const handleUpdateHabit = useCallback((updatedHabit: IHabitModel) => {
    setHabits((prevState) => {
      return prevState.map((i) => (i.id === updatedHabit.id ? updatedHabit : i));
    });
  }, []);

  const handleSetHabitsInOrder = useCallback(
    ({ habitsToSet, orderToSet }: { habitsToSet?: IHabitModel[]; orderToSet?: string[] }) => {
      if (habitsToSet === undefined && orderToSet === undefined) {
        return;
      }

      if (orderToSet) {
        setHabitOrder(orderToSet);
      }
      setHabits(sortedHabits(habitsToSet || habits, orderToSet || habitOrder));
    },
    [habits, habitOrder]
  );

  useEffect(() => {
    async function fetchHabits() {
      const { habits: loadedHabits, order: loadedOrder } = await getHabits({
        setLoading,
        filters: { isArchived: false },
        withOrder: true
      });
      handleSetHabitsInOrder({ habitsToSet: loadedHabits, orderToSet: loadedOrder });
      setIsInitialLoaded(true);
    }

    fetchHabits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreateSubmit = useCallback(async () => {
    const { habits: loadedHabits } = await getHabits({
      setLoading,
      filters: { isArchived: false }
    });
    handleSetHabitsInOrder({ habitsToSet: loadedHabits });
  }, [getHabits, handleSetHabitsInOrder]);

  const handleCreateHabit = useCallback(() => {
    setHabitCreateModalConfig({
      handleCancel: () => setHabitCreateModalConfig(undefined),
      handleSubmit: async () => {
        setHabitCreateModalConfig(undefined);
        await handleCreateSubmit();
      }
    });
  }, [handleCreateSubmit]);

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
      <PageHeader>
        <>
          <Select<IRangeSelect['value']>
            options={rangeSelectOptions}
            defaultValue={range}
            onChange={(value) => dispatch(HabitTrackerActions.setRangeLastDaysAction(value))}
          />
          <Button type="primary" onClick={handleCreateHabit} icon={<FontAwesomeIcon icon={faPlus} />}>
            {intl.formatMessage({ id: 'habit.create.button' })}
          </Button>
        </>
      </PageHeader>
      <HabitTable
        habits={habits}
        setHabitsInOrder={handleSetHabitsInOrder}
        updateHabit={handleUpdateHabit}
        deleteHabit={handleDeleteHabit}
        isInitialLoaded={isInitialLoaded}
      />
      {habitCreateModalConfig ? <HabitCreateModal {...habitCreateModalConfig} /> : null}
    </>
  );
};

export default HabitTracker;
