import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Select, Space } from 'antd';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxArchive, faGlobe, faInfoCircle, faLock, faLongArrowLeft } from '@fortawesome/free-solid-svg-icons';
import HeaderText from '@common/components/HeaderText';
import { Paths } from '@common/constants/Paths';
import PageLoading from '@common/components/PageLoading';
import HabitCalenarHeatmap from '@modules/Habit/components/HabitCalenarHeatmap';
import useHabitFetch from '@modules/Habit/hooks/useHabitFetch';
import { IHabitModel } from '@modules/Habit/models/HabitModel';
import styles from './HabitView.module.less';
import HabitStatistic from '@modules/Habit/components/HabitStatistic';
import Tooltip from 'antd/es/tooltip';
import { Visibility } from '@common/constants/Visibility';
import { useAuth } from '@common/contexts/AuthContext';
import Button from '@common/components/Button';

interface IYearSelect {
  label: string;
  value: string;
}

const HabitView: React.FC = () => {
  const intl = useIntl();
  const params = useParams();
  const navigate = useNavigate();
  const { userProfile } = useAuth();
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

  const handleGoBack = useCallback(() => {
    if (!habit) {
      return;
    }

    if (habit.createdByUid === userProfile.uid) {
      navigate(habit.isArchived ? Paths.HabitArchive : Paths.HabitTracker);
    } else {
      navigate(generatePath(Paths.UserViewHabit, { id: habit.createdByUid }));
    }
  }, [navigate, habit, userProfile.uid]);

  if (!habit || !year) {
    return <PageLoading />;
  }

  return (
    <>
      <div className={styles.Header}>
        <Button
          onClick={() => handleGoBack()}
          icon={<FontAwesomeIcon icon={faLongArrowLeft} />}
          text={intl.formatMessage({ id: 'common.goBack' })}
        />
        <Select<IYearSelect['value']>
          options={yearSelectOptions}
          defaultValue={year}
          onChange={(value) => setYear(value)}
        />
      </div>
      <div className={styles.HabitViewContainer}>
        <Space size={12}>
          <HeaderText text={habit.name} />
          <div>
            <Tooltip
              placement="bottom"
              title={intl.formatMessage({
                id: `common.visibility.${habit.isPublic ? Visibility.public : Visibility.private}`
              })}
            >
              <FontAwesomeIcon className={styles.HeaderIcon} icon={habit.isPublic ? faGlobe : faLock} />
            </Tooltip>
          </div>
          {habit.isArchived ? (
            <Tooltip
              placement="bottom"
              title={intl.formatMessage({
                id: 'habit.archived'
              })}
            >
              <FontAwesomeIcon className={styles.HeaderIcon} icon={faBoxArchive} />
            </Tooltip>
          ) : null}
        </Space>
        <div className={styles.HabitDescription}>{habit.description}</div>
        <div className={styles.HabitCalenarHeatmapContainer}>
          <HabitCalenarHeatmap habit={habit} year={year} />
        </div>
        <Space size={8} className={styles.SummaryContainer} align="center">
          <HeaderText text={intl.formatMessage({ id: 'common.summary' })} />
          <Tooltip title={intl.formatMessage({ id: 'common.summary.info' })}>
            <FontAwesomeIcon className={styles.DateInfoIcon} icon={faInfoCircle} />
          </Tooltip>
        </Space>
        <HabitStatistic habit={habit} />
      </div>
    </>
  );
};

export default HabitView;
