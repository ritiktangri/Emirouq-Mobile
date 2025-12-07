import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { twMerge } from 'tailwind-merge';
import { clsx, ClassValue } from 'clsx';
import * as FileSystem from 'expo-file-system';
import { Dimensions } from 'react-native';

dayjs.extend(utc);
dayjs.extend(timezone);
/* eslint-disable prettier/prettier */
function millisToTime(millis: any) {
  const minutes = Math.floor(millis / 60000);
  const seconds: any = ((millis % 60000) / 1000).toFixed(0);
  return (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}
function toCurrency(
  number: number | string,
  disableDecimal = false,
  decimalPlaces = 2,
  currency = 'AED'
) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
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
function formatDate(date?: Date, format: string = 'DD MMM, YYYY'): string {
  if (!date) return '';
  return dayjs(date).format(format);
}

export function getRelativeTime(date: Date): string {
  if (!date) return '';
  date = new Date(date);
  const now = new Date();
  const elapsedSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (elapsedSeconds >= 31536000) {
    // One year in seconds
    return formatDate(date); // Return the actual date as an ISO string
  }

  const intervals: [number, string][] = [
    [2592000, 'month'],
    [86400, 'day'],
    [3600, 'hour'],
    [60, 'minute'],
    [1, 'second'],
  ];

  for (const [seconds, unit] of intervals) {
    const intervalValue = Math.floor(elapsedSeconds / seconds);
    if (intervalValue >= 1) {
      return intervalValue === 1 ? `${intervalValue} ${unit} ago` : `${intervalValue} ${unit}s ago`;
    }
  }

  return 'just now';
}

//save file locally
const saveFileLocally = async (attachments: any) => {
  try {
    attachments.forEach(async ({ uri, name }: any) => {
      const newPath = `${FileSystem.documentDirectory}${name}`;

      await FileSystem.copyAsync({
        from: uri,
        to: newPath,
      });
    });
    return attachments.map((attachment: any) => ({
      ...attachment,
      uri: `${FileSystem.documentDirectory}${attachment.name}`,
    }));
  } catch (error) {
    console.error('Error saving file:', error);
    alert('Error saving file locally');
  }
};

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

function extractAddressDetails(components: any[]) {
  const result = {
    street: '',
    postalCode: '',
    country: '',
    countryCode: '',
    state: '',
    stateCode: '',
    city: '',
  };

  let streetNumber = '';
  let route = '';

  components.forEach((component: { types: unknown; long_name: string; short_name: string }) => {
    const types = component.types as string[];

    if (types.includes('street_number')) {
      streetNumber = component.long_name;
    }

    if (types.includes('route')) {
      route = component.long_name;
    }

    if (types.includes('locality')) {
      result.city = component.long_name;
    }

    if (types.includes('administrative_area_level_1')) {
      result.state = component.long_name;
      result.stateCode = component.short_name;
    }

    if (types.includes('country')) {
      result.country = component.long_name;
      result.countryCode = component.short_name;
    }

    if (types.includes('postal_code')) {
      result.postalCode = component.long_name;
    }
  });

  result.street = [streetNumber, route].filter(Boolean).join(' ');

  return result;
}
export {
  millisToTime,
  toCurrency,
  getInitials,
  cn,
  formatDateInTimeZone,
  capitalizeFirstLetter,
  saveFileLocally,
  screenWidth,
  screenHeight,
  extractAddressDetails,
};
