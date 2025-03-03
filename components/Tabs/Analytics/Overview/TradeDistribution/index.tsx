/* eslint-disable import/order */
import React, { useMemo } from 'react';
import { View } from 'react-native';
import { useReport } from '~/context/ReportContext';
import { toCurrency } from '~/utils/helper.utils';
import AnimatedAccordion from '../Animated';

const TradeDistribution = () => {
  const { reports }: any = useReport();

  const cumulative = reports?.cumulative?.[0];
  const data = useMemo(
    () => [
      {
        id: 1,
        key: 'Total Number of Trades',
        value: cumulative?.totalCount || 0,
      },
      {
        id: 2,
        key: 'Number of Winning Trades',
        value: cumulative?.winningTrades || 0,
      },
      {
        id: 3,
        key: 'Number of Losing Trades',
        value: cumulative?.losingTrades || 0,
      },
      {
        id: 4,
        key: 'Number of Break Even Trades',
        value: cumulative?.breakEvenTrades || 0,
      },
      {
        id: 5,
        key: 'Total Commissions',
        value: toCurrency(cumulative?.totalCommissions || 0),
      },
    ],
    [cumulative]
  );

  return (
    <View className=" flex-1 rounded-lg bg-white p-4 dark:border-2 dark:border-gray-700 dark:bg-dashboard_card">
      {data?.map((item, index) => (
        <AnimatedAccordion key={item.id} item={item} index={index} total={data?.length} />
      ))}
    </View>
  );
};

export default TradeDistribution;
