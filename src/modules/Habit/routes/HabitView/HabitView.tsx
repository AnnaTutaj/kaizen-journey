import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Button, Select, Space } from 'antd';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowLeft } from '@fortawesome/free-solid-svg-icons';
import HeaderText from '@common/components/HeaderText';
import { Paths } from '@common/constants/Paths';
import PageLoading from '@common/components/PageLoading';
import HabitCalenarHeatmap from '@modules/Habit/components/HabitCalenarHeatmap';
import useHabitFetch from '@modules/Habit/hooks/useHabitFetch';
import { IHabitModel } from '@modules/Habit/models/HabitModel';
import styles from './HabitView.module.less';

interface IYearSelect {
  label: string;
  value: string;
}

const HabitView: React.FC = () => {
  const intl = useIntl();
  const params = useParams();
  const navigate = useNavigate();
  const [habit, setHabit] = useState<IHabitModel | null>(null);
  const [year, setYear] = useState<string>();
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
    setYear(moment().format('YYYY'));
  }, [params.id, getHabitById]);

  const yearSelectOptions = useMemo((): IYearSelect[] => {
    const years: IYearSelect[] = [];
    const year = moment();

    for (let i = 0; i < 5; i++) {
      years.push({ label: year.format('YYYY'), value: year.format('YYYY') });
      year.subtract(1, 'year');
    }

    return years;
  }, []);

  if (!habit || !year) {
    return <PageLoading />;
  }

  return (
    <>
      <div className={styles.Header}>
        <Button onClick={() => navigate(Paths.Habit)}>
          <Space size={10}>
            <FontAwesomeIcon icon={faLongArrowLeft} />
            {intl.formatMessage({ id: 'common.goBack' })}
          </Space>
        </Button>
        <Select<IYearSelect['value']>
          options={yearSelectOptions}
          defaultValue={year}
          onChange={(value) => setYear(value)}
        />
      </div>
      <HeaderText text={habit.name} />
      <HabitCalenarHeatmap habit={habit} year={year} />
    </>
  );
};

export default HabitView;
