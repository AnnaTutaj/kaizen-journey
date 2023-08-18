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
import { StyledHeaderContainer } from '@common/components/Header/styled';
import {
  StyledHabitCalenarHeatmapContainer,
  StyledHabitDescription,
  StyledHabitViewContainer,
  StyledHeaderIcon,
  StyledSummaryContainerSpace
} from './styled';
import { StyledHeaderText } from '@common/components/HeaderText/styled';

interface IYearSelect {
  label: string;
  value: string;
}

const HabitView: React.FC = () => {
  const intl = useIntl();
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
      <StyledHeaderContainer $flexWrap="wrap">
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
      </StyledHeaderContainer>
      <StyledHabitViewContainer>
        <Space size={12}>
          <StyledHeaderText>{habit.name}</StyledHeaderText>
          <div>
            <Tooltip
              placement="bottom"
              title={intl.formatMessage({
                id: `common.visibility.${habit.isPublic ? Visibility.public : Visibility.private}`
              })}
            >
              <StyledHeaderIcon icon={habit.isPublic ? faGlobe : faLock} />
            </Tooltip>
          </div>
          {habit.isArchived ? (
            <Tooltip
              placement="bottom"
              title={intl.formatMessage({
                id: 'habit.archived'
              })}
            >
              <StyledHeaderIcon icon={faBoxArchive} />
            </Tooltip>
          ) : null}
        </Space>
        <StyledHabitDescription>{habit.description}</StyledHabitDescription>
        <StyledHabitCalenarHeatmapContainer>
          <HabitCalenarHeatmap habit={habit} year={year} />
        </StyledHabitCalenarHeatmapContainer>
        <StyledSummaryContainerSpace size={8} align="center">
          <StyledHeaderText>{intl.formatMessage({ id: 'common.summary' })}</StyledHeaderText>
          <Tooltip title={intl.formatMessage({ id: 'common.summary.info' })}>
            <StyledHeaderIcon icon={faInfoCircle} />
          </Tooltip>
        </StyledSummaryContainerSpace>
        <HabitStatistic habit={habit} />
      </StyledHabitViewContainer>
    </>
  );
};

export default HabitView;
