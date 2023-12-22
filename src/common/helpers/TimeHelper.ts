export const secondsToHoursAndMinutes = (seconds: number): { hours: number; minutes: number } => {
  return {
    hours: Math.floor(seconds / 3600),
    minutes: Math.floor((seconds % 3600) / 60)
  };
};

export const hoursAndMinutesToSeconds = (hours: number, minutes: number): number => {
  return hours * 60 * 60 + minutes * 60;
};
