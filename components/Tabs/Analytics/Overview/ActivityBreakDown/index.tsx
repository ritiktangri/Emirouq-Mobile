/* eslint-disable import/order */
import React, { useMemo } from 'react';
import { View } from 'react-native';
import { useReport } from '~/context/ReportContext';
import AnimatedAccordion from '../Animated';

const ActivityBreakDown = () => {
  const { reports }: any = useReport();

  const activityResponse = reports?.dailyGrouped?.[0];
  const data = useMemo(
    () => [
      {
        id: 0,
        key: 'Total Trading Days',
        value: activityResponse?.totalTradingDays || '0',
      },
      {
        id: 1,
        key: 'Winning Days',
        value: activityResponse?.winningDays || '0',
      },
      {
        id: 2,
        key: 'Losing Days',
        value: activityResponse?.losingDays || '0',
      },
      {
        id: 3,
        key: 'Break Even Days',
        value: activityResponse?.breakEvenDays || '0',
      },
    ],
    [activityResponse]
  );

  return (
    <View className=" flex-1 rounded-lg border-gray-700 p-4 dark:border-2 dark:bg-dashboard_card">
      {data?.map((item, index) => (
        <AnimatedAccordion key={item.id} item={item} index={index} total={data?.length} />
      ))}
    </View>
  );
};

export default ActivityBreakDown;
