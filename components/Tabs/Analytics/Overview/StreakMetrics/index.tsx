/* eslint-disable import/order */
import { round } from 'lodash';
import React, { useMemo } from 'react';
import { View } from 'react-native';
import { useReport } from '~/context/ReportContext';
import { toCurrency } from '~/utils/helper.utils';
import AnimatedDropdown from '../Animated';

const StreakMetrics = () => {
  const { reports }: any = useReport();

  const data = useMemo(
    () => [
      {
        id: 0,
        key: 'Max Consecutive Wins (Trades)',
        value: reports?.tradeWinStreak?.[0]?.pnlConsecutiveWins,
      },
      {
        id: 1,
        key: 'Max Consecutive Losses (Trades)',
        value: reports?.tradeWinStreak?.[0]?.pnlConsecutiveLosses,
      },
      {
        id: 2,
        key: 'Max Consecutive Winning Days',
        value: reports?.dailyWinStreak?.[0]?.dailyPnlConsecutiveWins,
      },
      {
        id: 3,
        key: 'Max Consecutive Losing Days',
        value: reports?.dailyWinStreak?.[0]?.dailyPnlConsecutiveLosses,
      },
      {
        id: 4,
        key: 'Largest Profitable Day (Profits)',
        value: toCurrency(round(reports?.dailyGrouped?.[0]?.largestProfitableDay || 0, 3)),
      },
      {
        id: 5,
        key: 'Largest Losing Day (Losses)',
        value: toCurrency(round(reports?.dailyGrouped?.[0]?.largestLosingDay || 0, 3)),
      },
    ],
    [reports]
  );

  return (
    <View className=" flex-1 rounded-lg border-gray-700 p-4 dark:border-2 dark:bg-dashboard_card">
      {data?.map((item, index) => (
        <AnimatedDropdown key={item.id} item={item} index={index} total={data?.length} />
      ))}
    </View>
  );
};

export default StreakMetrics;
