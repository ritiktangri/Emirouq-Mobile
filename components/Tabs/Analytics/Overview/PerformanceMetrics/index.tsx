/* eslint-disable import/order */
import React, { useMemo } from 'react';
import { View } from 'react-native';
import { DefaultText as Text } from '~/components/common/DefaultText';
import { useReport } from '~/context/ReportContext';
import { toCurrency } from '~/utils/helper.utils';
import AnimatedAccordion from '../Animated';

const PerformanceMetrics = () => {
  const { reports }: any = useReport();
  const cumulative = reports?.cumulative?.[0];
  const data = useMemo(
    () => [
      {
        id: 0,
        key: 'Average Position per Trade',
        value: toCurrency(cumulative?.avgPositionPerTrade || 0),
      },
      {
        id: 1,
        key: 'Average Winning Trade',
        value: toCurrency(cumulative?.averageWinningTrade || 0),
      },
      {
        id: 2,
        key: 'Average Losing Trade',
        value: toCurrency(cumulative?.averageLosingTrade || 0),
      },
      {
        id: 3,
        key: 'Largest Profit (Trade)',
        value: toCurrency(cumulative?.largestProfit || 0),
      },
      {
        id: 4,
        key: 'Largest Loss (Trade)',
        value: toCurrency(cumulative?.largestLoss || 0),
      },
    ],
    [cumulative]
  );

  return (
    <View className=" flex-1 rounded-lg border-gray-700 p-4 dark:border-2 dark:bg-dashboard_card">
      {data?.map((item, index) => (
        <AnimatedAccordion key={item.id} item={item} index={index} total={data?.length} />
      ))}
    </View>
  );
};

export default PerformanceMetrics;
