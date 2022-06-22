import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageLoading from '@common/components/PageLoading';
import HabitCalenarHeatmap from '@modules/Habit/components/HabitCalenarHeatmap';
import useHabitFetch from '@modules/Habit/hooks/useHabitFetch';
import { IHabitModel } from '@modules/Habit/models/HabitModel';
import HeaderText from '@common/components/HeaderText';
import styles from './HabitView.module.less';

const HabitView: React.FC = () => {
  const params = useParams();
  const [habit, setHabit] = useState<IHabitModel | null>(null);
  const { getHabitById } = useHabitFetch();

  useEffect(() => {
    async function fetchHabit() {
      if (!params.id) {
        return;
      }

      const fetchedHabit = await getHabitById(params.id);
      setHabit(fetchedHabit);
    }

    fetchHabit();
  }, [params.id, getHabitById]);

  if (!habit) {
    return <PageLoading />;
  }

  //todo: Add "Go back to habits" button
  return (
    <>
      <div className={styles.Header}>
        <HeaderText text={habit.name} />
      </div>
      <HabitCalenarHeatmap habit={habit} />
    </>
  );
};

export default HabitView;
