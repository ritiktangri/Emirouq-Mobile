import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { twMerge } from 'tailwind-merge';
import { clsx, ClassValue } from 'clsx';

dayjs.extend(utc);
dayjs.extend(timezone);
/* eslint-disable prettier/prettier */
function millisToTime(millis: any) {
  const minutes = Math.floor(millis / 60000);
  const seconds: any = ((millis % 60000) / 1000).toFixed(0);
  return (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}
function toCurrency(number: number | string, disableDecimal = false, decimalPlaces = 2) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: disableDecimal ? 0 : decimalPlaces,
    maximumFractionDigits: disableDecimal ? 0 : decimalPlaces,
  });
  return formatter.format(+number);
}

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
const getInitials = (name: any) => {
  if (name) {
    let initials = name.match(/\b\w/g) || [];
    initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
    return initials;
  }
  return '';
};

function capitalizeFirstLetter(word: string): string {
  if (!word) return '';
  return word.charAt(0).toUpperCase() + word.slice(1);
}
const formatDateInTimeZone = ({ date, tz }: any) => {
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
export { millisToTime, toCurrency, getInitials, cn, formatDateInTimeZone, capitalizeFirstLetter };
