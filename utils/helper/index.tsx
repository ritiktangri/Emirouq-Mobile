import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
dayjs.extend(timezone);

export function capitalizeFirstLetter(word: string): string {
  if (!word) return '';
  return word.charAt(0).toUpperCase() + word.slice(1);
}
export const formatDateInTimeZone = ({ date, tz }: any) => {
  let newData = '';
  let newTime = '';
  if (date) {
    newData = dayjs(date).tz(tz).format('YYYY-MM-DD');
    newTime = dayjs(date).tz(tz).format('HH:mm:ss');
  }
  return {
    date: newData,
    time: newTime,
  };
};
