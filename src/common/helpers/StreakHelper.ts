import _ from 'lodash';
import dayjs, { Dayjs } from 'dayjs';

export interface IStreak {
  dates: string[];
  streakCount: number;
  skippedCount: number;
}

const getStreakDates = (startDate: string, endDate: string) => {
  const dates: string[] = [];

  let startDateMoment = dayjs(startDate);
  const endDateMoment = dayjs(endDate);

  while (startDateMoment.isSameOrBefore(endDateMoment)) {
    dates.push(startDateMoment.format('YYYY-MM-DD'));
    startDateMoment = startDateMoment.add(1, 'days');
  }

  return dates;
};

const getStreakCounts = (
  startStreak: string,
  endStreak: string,
  datesSkipped: string[]
): { streakCount: number; skippedCount: number; dates: string[] } => {
  const countDays = dayjs(endStreak).diff(dayjs(startStreak), 'days') + 1;
  const dates = getStreakDates(startStreak, endStreak);
  const skippedCount = dates.filter((dates) => datesSkipped.indexOf(dates) >= 0).length;

  return { streakCount: countDays - skippedCount, skippedCount, dates };
};

const getStreaks = (datesChecked: string[], datesSkipped: string[]): IStreak[] => {
  const allDates = [...datesChecked, ...datesSkipped];

  const streaks: IStreak[] = [];
  let startStreak: string | undefined;
  let endStreak: Dayjs | undefined;

  const sortedDates = _.sortBy(allDates);

  for (let i = 0; i < sortedDates.length; i++) {
    const date = sortedDates[i];

    if (!startStreak) {
      startStreak = date;
    }

    const nextDate = sortedDates[i + 1] ? dayjs(sortedDates[i + 1]) : undefined;

    if (nextDate && nextDate.isSame(dayjs(date).add(1, 'day'))) {
      endStreak = nextDate;
      continue;
    }

    if (startStreak && endStreak) {
      const { streakCount, skippedCount, dates } = getStreakCounts(
        startStreak,
        endStreak.format('YYYY-MM-DD'),
        datesSkipped
      );

      streaks.push({
        dates,
        streakCount,
        skippedCount
      });

      startStreak = undefined;
      endStreak = undefined;
      continue;
    }

    const { streakCount, skippedCount, dates } = getStreakCounts(date, date, datesSkipped);

    streaks.push({
      dates,
      streakCount,
      skippedCount
    });

    if (startStreak) {
      startStreak = undefined;
    }
  }

  return streaks;
};

const getSpecifiedStreaks = (
  datesChecked: string[],
  datesSkipped: string[]
): { longestStreak: IStreak; currentStreak: IStreak } => {
  const streaks = getStreaks(datesChecked, datesSkipped);
  const emptyStreak = { streakCount: 0, skippedCount: 0, dates: [] };
  const longestStreak = streaks.reduce(
    (prev, current) => {
      return prev.streakCount > current.streakCount ? prev : current;
    },
    { ...emptyStreak }
  );
  const currentStreak = streaks.find(
    (i) =>
      i.dates.indexOf(dayjs().format('YYYY-MM-DD')) >= 0 ||
      i.dates.indexOf(dayjs().subtract(1, 'day').format('YYYY-MM-DD')) >= 0
  ) || { ...emptyStreak };

  return { longestStreak, currentStreak };
};

export { getSpecifiedStreaks };
