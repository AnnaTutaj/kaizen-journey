import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { IHabitModel } from '@modules/Habit/models/HabitModel';
import useHabitFetch from '@modules/Habit/hooks/useHabitFetch';
import PageLoading from '@common/components/PageLoading';
import HabitList from '@modules/Habit/components/HabitList';
import Empty from '@common/components/Empty';
import { useParams } from 'react-router-dom';

const UserHabit: React.FC = () => {
  const intl = useIntl();
  const params = useParams();
  const [habits, setHabits] = useState<IHabitModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isInitialLoaded, setIsInitialLoaded] = useState<boolean>(false);
  const { getHabits } = useHabitFetch();

  useEffect(() => {
    const fetchHabits = async () => {
      const loadedHabits = await getHabits({ setLoading, isPublic: true, createdByUid: params.id });
      setHabits(loadedHabits);
      setIsInitialLoaded(true);
    };

    fetchHabits();
  }, [getHabits, params.id]);

  if (!isInitialLoaded) {
    return <PageLoading />;
  }

  return (
    <>
      {loading ? <PageLoading /> : null}
      {habits && habits.length ? (
        <HabitList headerText={intl.formatMessage({ id: 'user.habit.title' })} habits={habits} setHabits={setHabits} />
      ) : (
        <Empty description={intl.formatMessage({ id: 'user.habit.empty' })} />
      )}
    </>
  );
};

export default UserHabit;
