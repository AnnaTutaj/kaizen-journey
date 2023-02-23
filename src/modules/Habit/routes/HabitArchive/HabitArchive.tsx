import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { IHabitModel } from '@modules/Habit/models/HabitModel';
import useHabitFetch from '@modules/Habit/hooks/useHabitFetch';
import PageLoading from '@common/components/PageLoading';
import HabitList from '@modules/Habit/components/HabitList';
import Empty from '@common/components/Empty';

const HabitArchive: React.FC = () => {
  const intl = useIntl();
  const [habits, setHabits] = useState<IHabitModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isInitialLoaded, setIsInitialLoaded] = useState<boolean>(false);
  const { getHabits } = useHabitFetch();

  useEffect(() => {
    const fetchHabits = async () => {
      const loadedHabits = await getHabits({ setLoading, filters: { isArchived: true } });
      setHabits(loadedHabits);
      setIsInitialLoaded(true);
    };

    fetchHabits();
  }, [getHabits]);

  if (!isInitialLoaded) {
    return <PageLoading />;
  }

  return (
    <>
      {loading ? <PageLoading /> : null}
      {habits && habits.length ? (
        <HabitList
          headerText={intl.formatMessage({ id: 'habit.archive.title' })}
          habits={habits}
          setHabits={setHabits}
        />
      ) : (
        <Empty description={intl.formatMessage({ id: 'habit.archive.empty' })} />
      )}
    </>
  );
};

export default HabitArchive;
