import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Space } from 'antd';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxArchive, faGlobe, faInfoCircle, faLock, faLongArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Paths } from '@common/constants/Paths';
import PageLoading from '@common/components/PageLoading';
import HabitCalenarHeatmap from '@modules/Habit/components/HabitCalenarHeatmap';
import useHabitFetch from '@modules/Habit/hooks/useHabitFetch';
import { IHabitModel } from '@modules/Habit/models/HabitModel';
import HabitStatistic from '@modules/Habit/components/HabitStatistic';
import Tooltip from 'antd/es/tooltip';
import { Visibility } from '@common/constants/Visibility';
import { useUserProfile } from '@common/contexts/UserProfile/UserProfileContext';
import Button from '@common/components/Button';
import Select from '@common/components/Select';
import useCommonStyles from '@common/useStyles';
import useStyles from './useStyles';
import PageHeader from '@common/components/PageHeader';

interface IYearSelect {
  label: string;
  value: string;
}

const HabitView: React.FC = () => {
  const intl = useIntl();
  const { styles } = useStyles();
  const { styles: commonStyles } = useCommonStyles();
  const params = useParams();
  const navigate = useNavigate();
  const { userProfile } = useUserProfile();
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
    setYear(dayjs().format('YYYY'));
  }, [params.id, getHabitById]);

  const yearSelectOptions = useMemo((): IYearSelect[] => {
    const years: IYearSelect[] = [];
    let year = dayjs();

    for (let i = 0; i < 5; i++) {
      years.push({ label: year.format('YYYY'), value: year.format('YYYY') });
      year = year.subtract(1, 'year');
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
      <PageHeader flexWrap="wrap">
        <>
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
        </>
      </PageHeader>
      <div className={styles.habitViewContainer}>
        <Space size={12}>
          <span className={commonStyles.headerText}>{habit.name}</span>
          <div>
            <Tooltip
              placement="bottom"
              title={intl.formatMessage({
                id: `common.visibility.${habit.isPublic ? Visibility.public : Visibility.private}`
              })}
            >
              <FontAwesomeIcon className={styles.headerIcon} icon={habit.isPublic ? faGlobe : faLock} />
            </Tooltip>
          </div>
          {habit.isArchived ? (
            <Tooltip
              placement="bottom"
              title={intl.formatMessage({
                id: 'habit.archived'
              })}
            >
              <FontAwesomeIcon className={styles.headerIcon} icon={faBoxArchive} />
            </Tooltip>
          ) : null}
        </Space>
        <div className={styles.habitDescription}>{habit.description}</div>
        <div className={styles.habitCalenarHeatmapContainer}>
          <HabitCalenarHeatmap habit={habit} year={year} />
        </div>
        <Space className={styles.summaryContainerSpace} size={8} align="center">
          <span className={commonStyles.headerText}>{intl.formatMessage({ id: 'common.summary' })}</span>
          <Tooltip title={intl.formatMessage({ id: 'common.summary.info' })}>
            <FontAwesomeIcon className={styles.headerIcon} icon={faInfoCircle} />
          </Tooltip>
        </Space>
        <HabitStatistic habit={habit} />
      </div>
    </>
  );
};

export default HabitView;
