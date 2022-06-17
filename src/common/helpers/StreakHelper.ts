import moment, { Moment } from 'moment';
import _ from 'lodash';

export interface IStreak {
  dates: string[];
  streakCount: number;
  skippedCount: number;
}

const getStreakDates = (startDate: string, endDate: string) => {
  const dates: string[] = [];

  const startDateMoment = moment(startDate);
  const endDateMoment = moment(endDate);

  while (startDateMoment.isSameOrBefore(endDateMoment)) {
    dates.push(startDateMoment.format('YYYY-MM-DD'));
    startDateMoment.add(1, 'days');
  }

  return dates;
};

const getStreakCounts = (
  startStreak: string,
  endStreak: string,
  datesSkipped: string[]
): { streakCount: number; skippedCount: number; dates: string[] } => {
  const countDays = moment(endStreak).diff(moment(startStreak), 'days') + 1;
  const dates = getStreakDates(startStreak, endStreak);
  const skippedCount = dates.filter((dates) => datesSkipped.indexOf(dates) >= 0).length;

  return { streakCount: countDays - skippedCount, skippedCount, dates };
};

const getStreaks = (datesChecked: string[], datesSkipped: string[]): IStreak[] => {
  const allDates = [...datesChecked, ...datesSkipped];

  const streaks: IStreak[] = [];
  let startStreak: string | undefined;
  let endStreak: Moment | undefined;

  const sortedDates = _.sortBy(allDates);

  for (let i = 0; i < sortedDates.length; i++) {
    const date = sortedDates[i];

    if (!startStreak) {
      startStreak = date;
    }

    const nextDate = sortedDates[i + 1] ? moment(sortedDates[i + 1]) : undefined;

    if (nextDate && nextDate.isSame(moment(date).add(1, 'day'))) {
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
      i.dates.indexOf(moment().format('YYYY-MM-DD')) >= 0 ||
      i.dates.indexOf(moment().subtract(1, 'day').format('YYYY-MM-DD')) >= 0
  ) || { ...emptyStreak };

  return { longestStreak, currentStreak };
};

export { getSpecifiedStreaks };
