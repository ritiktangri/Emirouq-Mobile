/* eslint-disable import/order */
import { Calendar, LocaleConfig } from 'react-native-calendars';
import {
  startOfDay,
  endOfDay,
  subDays,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfQuarter,
  endOfQuarter,
  startOfYear,
  format,
} from 'date-fns';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Dimensions, useColorScheme } from 'react-native';
import { Modalize, useModalize } from 'react-native-modalize';
import { Ionicons } from '@expo/vector-icons';
import { Portal } from 'react-native-portalize';
import theme from '~/utils/theme';
import { useQuery } from '~/context/QueryContext';
import { Text } from '~/components/common/Text';
import { cn } from '~/utils/helper';

// Configure locale for react-native-calendars (optional)
LocaleConfig.locales['en'] = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  dayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  today: 'Today',
};
LocaleConfig.defaultLocale = 'en';

const CalendarComponent = () => {
  const { ref, open, close }: any = useModalize();
  const [selectedRange, setSelectedRange] = useState<any>({});
  const { globalQueries, setQuery }: any = useQuery();
  const screenWidth = Dimensions.get('window').width;
  const calendarWidth = screenWidth * 0.6; // Adjust percentage as needed
  const colorScheme = useColorScheme();
  const onDayPress = (day: any) => {
    if (!selectedRange?.startDate || (selectedRange?.startDate && selectedRange?.endDate)) {
      // Start a new range

      setQuery({
        startDate: day.dateString,
        endDate: null,
      });
    } else if (day.dateString > selectedRange?.startDate) {
      // Extend the range
      setSelectedRange({
        ...selectedRange,
        endDate: day.dateString,
      });
    } else {
      // Start a new range if the selected date is before the start date
      setSelectedRange({
        startDate: day.dateString,
        endDate: null,
      });
    }
  };

  useEffect(() => {
    if (globalQueries?.startDate || globalQueries?.endDate) {
      setSelectedRange({
        startDate: globalQueries?.startDate,
        endDate: globalQueries?.endDate,
      });
    }
  }, [globalQueries]);

  const markedDates = () => {
    const marked = {} as any;
    if (selectedRange?.startDate) {
      marked[selectedRange?.startDate] = {
        startingDay: true,
        color: theme.colors.primary,
        textColor: 'white',
      };
    }
    if (selectedRange?.endDate) {
      marked[selectedRange?.endDate] = {
        endingDay: true,
        color: theme.colors.primary,
        textColor: 'white',
      };
    }
    // Mark the days in between
    if (selectedRange?.startDate && selectedRange?.endDate) {
      const start = new Date(selectedRange?.startDate);
      const end = new Date(selectedRange?.endDate);
      for (let dt = start; dt <= end; dt.setDate(dt.getDate() + 1)) {
        const dateString = format(dt, 'yyyy-MM-dd');
        if (!marked[dateString]) {
          marked[dateString] = {
            color: theme.colors.primary,
            textColor: 'white',
          };
        }
      }
    }
    return marked;
  };
  const Ranges: any = [
    {
      label: <Text className="font-regular font-poppinsMedium  text-sm text-primary">Today</Text>,
      value: [startOfDay(new Date()), endOfDay(new Date())],
      placement: 'left',
    },

    {
      label: (
        <Text className="font-regular font-poppinsMedium  text-sm text-primary">This Week</Text>
      ),
      value: [startOfWeek(new Date()), endOfWeek(new Date())],
      placement: 'left',
    },

    {
      label: (
        <Text className="font-regular font-poppinsMedium  text-sm text-primary">This Month</Text>
      ),
      value: [startOfMonth(new Date()), endOfMonth(new Date())],
      placement: 'left',
    },

    {
      label: (
        <Text className="font-regular font-poppinsMedium  text-sm text-primary">Last 30 days</Text>
      ),
      value: [startOfDay(subDays(new Date(), 29)), endOfDay(new Date())],
      placement: 'left',
    },

    {
      label: (
        <Text className="font-regular font-poppinsMedium  text-sm text-primary ">Last Month</Text>
      ),
      value: [subMonths(startOfMonth(new Date()), 1), subMonths(endOfMonth(new Date()), 1)],
      placement: 'left',
    },

    {
      label: (
        <Text className="font-regular font-poppinsMedium  text-sm text-primary ">This Quarter</Text>
      ),
      value: [startOfQuarter(new Date()), endOfQuarter(new Date())],
      placement: 'left',
    },

    {
      label: (
        <Text className="font-regular font-poppinsMedium  text-sm text-primary ">
          YTD (Year to date)
        </Text>
      ),
      value: [startOfYear(new Date()), endOfDay(new Date())],
      placement: 'left',
    },
  ];
  return (
    <View>
      <TouchableOpacity className="rounded-md " onPress={open}>
        <Ionicons name="calendar-outline" size={20} className="!text-black dark:!text-white" />
      </TouchableOpacity>

      <Portal>
        <Modalize
          ref={ref}
          adjustToContentHeight
          handlePosition="outside"
          modalStyle={{
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
          HeaderComponent={
            <View
              className={cn('flex-row items-center justify-between  px-5 py-2', 'dark:bg-drawer')}>
              <Text className={cn('text-xl font-bold', 'dark:!text-white')}>Choose Date Range</Text>
              <TouchableOpacity onPress={close} className="p-2">
                <Ionicons name="close" size={20} className={cn('!text-black dark:!text-white')} />
              </TouchableOpacity>
            </View>
          }>
          <View className={'bg-white dark:bg-drawer'}>
            <View
              className={cn(
                'm-4 flex flex-row items-center rounded-3xl p-2',
                'bg-white dark:!bg-[#1F1F1F]'
              )}>
              <View className="flex flex-1 flex-col gap-7  rounded p-1">
                {Ranges?.map((range: any, index: any) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setSelectedRange({
                          startDate: format(range?.value[0], 'yyyy-MM-dd'),
                          endDate: format(range?.value[1], 'yyyy-MM-dd'),
                        });
                      }}
                      className="font-poppinsMedium text-sm">
                      {range?.label}
                    </TouchableOpacity>
                  );
                })}
              </View>
              <View
                style={{ width: calendarWidth }}
                className={cn(
                  'border-l-[1px] border-gray-300 dark:border-l-2 dark:border-[#2D2D2D]'
                )}>
                <View>
                  {selectedRange?.startDate ? (
                    <Text
                      className={cn(
                        'font-regular px-2  font-poppinsMedium text-sm',
                        'text-black dark:text-white'
                      )}>
                      {selectedRange?.startDate} {selectedRange?.endDate ? ' ~' : ''}{' '}
                      {selectedRange?.endDate}
                    </Text>
                  ) : (
                    <Text className="px-2 font-poppinsMedium text-sm dark:text-gray-500">
                      YYYY-MM-DD ~ YYYY-MM-DD
                    </Text>
                  )}
                </View>
                <Calendar
                  style={{
                    width: calendarWidth, // Apply calculated width to the Calendar
                  }}
                  onDayPress={onDayPress}
                  // hideDayNames
                  weekDaysNames={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
                  hideExtraDays
                  monthFormat="MMM yyyy"
                  scrollEnabled
                  showScrollIndicator
                  markingType="period"
                  markedDates={markedDates()}
                  theme={{
                    backgroundColor: '#00000',
                    calendarBackground: '#00000',
                    textSectionTitleColor: colorScheme === 'dark' ? '#b6c1cd' : 'black',
                    selectedDayTextColor: '#ffff',
                    todayTextColor: theme.colors.primary,
                    selectedDayBackgroundColor: theme.colors.primary,
                    dayTextColor: colorScheme === 'dark' ? '#ffff' : 'black',
                    textDisabledColor: '#d9e1e8',
                    dotColor: theme.colors.primary,
                    selectedDotColor: '#ffff',
                    arrowColor: theme.colors.primary,
                    monthTextColor: theme.colors.primary,
                    indicatorColor: theme.colors.primary,
                    textDayFontFamily: theme.font.poppinsMedium,
                    textMonthFontFamily: theme.font.poppinsMedium,
                    textDayHeaderFontFamily: theme.font.poppinsMedium,
                    textDayFontSize: 12,
                    textMonthFontSize: 12,
                    textDayHeaderFontSize: 12,
                  }}
                />
              </View>
            </View>

            <View className="mb-10 flex w-full flex-row justify-center gap-x-2 p-5">
              <TouchableOpacity
                onPress={() => {
                  setSelectedRange({});
                }}
                className={cn(
                  'flex-1 rounded-md border-[0.4px] border-gray-400 py-3 dark:border-0 dark:bg-[#E3EAF31F]'
                )}>
                <Text className={cn('text-center font-poppinsMedium dark:text-white')}>
                  Clear Filter
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  const isQueryChanged =
                    selectedRange?.startDate !== globalQueries?.startDate ||
                    selectedRange?.endDate !== globalQueries?.endDate;
                  if (!isQueryChanged) {
                    close();
                    return;
                  }
                  setQuery({
                    startDate: selectedRange?.startDate,
                    endDate: selectedRange?.endDate,
                  });
                  close();
                }}
                className="flex-1 rounded-md bg-primary py-3">
                <Text className="text-center font-poppinsMedium text-white">Apply Filter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modalize>
      </Portal>
    </View>
  );
};

export default CalendarComponent;
