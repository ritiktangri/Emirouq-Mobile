/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View } from 'react-native';
import { DefaultText as Text } from '~/components/common/DefaultText';

import Chart from './chart';

import { cn, toCurrency } from '~/utils/helper.utils';
import { useDashboard } from '~/context/DashboardContext';
import { useQuery } from '~/context/QueryContext';

const CumulativePnl = () => {
  const { data, selectPnl }: any = useDashboard();
  const { selectedDateText }: any = useQuery();

  const pnl = selectPnl === 'netPnl' ? 'totalNetPnl' : 'totalGrossPnl';
  return (
    <View className={cn('mx-2 flex-col gap-0 rounded-lg bg-white  dark:bg-dashboard_card')}>
      <View className="flex flex-col gap-2 px-5 pt-5">
        <Text className={cn('font-poppinsMedium text-base dark:text-dashboard_card_text')}>
          Net Cumulative Pnl {selectedDateText}
        </Text>
        <Text
          className={`font-poppinsMedium text-2xl ${data?.metricCards?.[pnl] > 0 ? 'text-green-500' : 'text-red-500'}`}>
          {toCurrency(data?.metricCards?.[pnl] || 0)}
        </Text>
      </View>
      <Chart chartId="cumulative-pnl-chart" />
    </View>
  );
};

export default CumulativePnl;
