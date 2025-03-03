/* eslint-disable import/order */
import { Ionicons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { round } from 'lodash';
import React, { useState } from 'react';
import { useColorScheme, View } from 'react-native';
import { DefaultText as Text } from '~/components/common/DefaultText';

import { Calendar } from 'react-native-calendars';
import { useDashboard } from '~/context/DashboardContext';
import { cn, toCurrency } from '~/utils/helper.utils';
import theme from '~/utils/theme';

const CalendarStats = () => {
  const [selected, setSelected] = useState('');
  const { setSelectMonthYear, data }: any = useDashboard();
  const markedDates = data?.dailyStats?.data.reduce((acc: any, item: any) => {
    acc[item._id] = { amount: round(item.totalPnl || 0, 3), trades: item.totalTrades || 0 };
    return acc;
  }, {});
  const colorScheme = useColorScheme();

  return (
    <View className="mx-2 flex-1 bg-white dark:bg-black">
      <View className={cn('flex-1 rounded-lg py-3', ' bg-white  dark:bg-dashboard_card')}>
        <Calendar
          className=""
          onDayPress={(day: any) => {
            setSelected(day?.dateString);
          }}
          onMonthChange={({ dateString }: any) => {
            const month = dayjs(dateString).format('MM');
            const year = dayjs(dateString).format('YYYY');
            const format = `${month}-${year}`;
            setSelectMonthYear(format);
          }}
          hideExtraDays
          monthFormat="MMMM yyyy"
          scrollEnabled
          showScrollIndicator
          markedDates={markedDates}
          markingType="custom"
          renderArrow={(direction: any) =>
            direction === 'left' ? (
              <View
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-md  p-1 ',
                  'border-[1px] border-gray-200 bg-white dark:border-0 dark:bg-analytics_card'
                )}>
                <Ionicons name="arrow-back" size={19} color={theme.colors.dashboard_card_text} />
              </View>
            ) : (
              <View
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-md  p-1 ',
                  'border-[1px] border-gray-200 bg-white dark:border-0 dark:bg-analytics_card'
                )}>
                <Ionicons name="arrow-forward" size={19} color={theme.colors.dashboard_card_text} />
              </View>
            )
          }
          dayComponent={({ date, state, marking }: any) => {
            return (
              <View
                className={`relative h-[54px] flex-1 items-center justify-start rounded-2xl  ${
                  date.dateString === selected ? 'border border-primary' : ''
                }`}>
                <View className="flex w-full flex-col items-start">
                  <View className="flex flex-row items-center gap-2 px-3 pt-2">
                    <Text
                      className={`font-poppinsMedium text-[11px] ${
                        state === 'disabled' ? 'text-gray-500' : 'text-black dark:text-white'
                      }`}>
                      {date.day}
                    </Text>
                    {state === 'today' ? <View className="h-2 w-2 rounded-2xl bg-primary" /> : ''}
                  </View>
                </View>
                {marking?.trades && (
                  <View className=" w-full items-center">
                    <Text
                      numberOfLines={1}
                      className={`font-poppinsMedium text-[9px] ${marking.amount === 0 ? 'text-blue-500' : marking.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {toCurrency(marking.amount)}
                    </Text>
                    <Text
                      className={cn('font-poppinsMedium text-[8px]', 'text-black dark:text-white')}>
                      {marking.trades} <Text className="text-[7px]">Trades</Text>
                    </Text>
                  </View>
                )}
              </View>
            );
          }}
          theme={{
            // 'stylesheet.day.basic': {
            //   base: {
            //     width: 20,
            //     alignItems: 'center',
            //     borderWidth: 1,
            //     borderColor: 'red',
            //   },
            // },
            'stylesheet.calendar.header': {
              dayHeader: {
                textAlign: 'center',
                borderWidth: 0,
                borderColor: colorScheme === 'dark' ? '#0F161E' : '#F1F1F1',
                backgroundColor: colorScheme === 'dark' ? '#0F161E' : '#F1F1F1',
                flex: 1,
                color: theme.colors.dashboard_card_text,
                padding: 6,
                fontSize: 12,
              },
              monthText: {
                fontSize: 13, // Increased font size (default is around 16)
                color: theme.colors.dashboard_card_text,
                fontFamily: theme.font.poppinsMedium,
              },
            },
            'stylesheet.calendar.main': {
              dayContainer: {
                borderColor: '#192839',
                borderWidth: 0.5,
                flex: 1,
                // padding: 10,
              },
              emptyDayContainer: {
                borderColor: '#192839', // Set to transparent
                borderWidth: 0.5,
                flex: 1,
                // padding: 10,
              },
              week: {
                marginTop: 0,
                marginBottom: 0,
                flexDirection: 'row',
                justifyContent: 'space-around',
              },
            },
            backgroundColor: '#00000',
            calendarBackground: '#00000',
            textSectionTitleColor: '#b6c1cd',
            selectedDayTextColor: '#ffffff',
            todayTextColor: theme.colors.primary,
            selectedDayBackgroundColor: theme.colors.primary,
            dayTextColor: '#ffffff',
            textDisabledColor: '#d9e1e8',
            dotColor: theme.colors.primary,
            selectedDotColor: '#ffffff',
            arrowColor: theme.colors.primary,
            monthTextColor: theme.colors.primary,
            indicatorColor: theme.colors.primary,
            textDayFontFamily: theme.font.poppinsMedium,
            textMonthFontFamily: theme.font.poppinsMedium,
            textDayHeaderFontFamily: theme.font.poppinsMedium,
            textDayFontSize: 11,
            textMonthFontSize: 11,
            textDayHeaderFontSize: 11,
          }}
        />
      </View>
    </View>
  );
};

export default CalendarStats;
