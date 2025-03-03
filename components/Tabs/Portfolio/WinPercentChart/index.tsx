/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View } from 'react-native';
import { DefaultText as Text } from '~/components/common/DefaultText';

import Chart from './chart';
import { useDashboard } from '~/context/DashboardContext';
import { round } from 'lodash';
import { cn } from '~/utils/helper.utils';

const WinPercentChart = () => {
  const { data } = useDashboard();
  return (
    <View
      className={cn(
        'darl:border-[1px] mx-2 flex-1 flex-col gap-0 rounded-lg  border-gray-300 bg-white md:flex-row md:justify-center dark:border-0 dark:border-none dark:bg-dashboard_card'
      )}>
      <View className="flex flex-col gap-2 p-5 md:my-auto ">
        <Text className={cn('font-poppinsMedium text-lg text-black dark:text-dashboard_card_text')}>
          Trade Wins
        </Text>
        <Text className={cn('font-poppinsSemiBold text-3xl text-black dark:text-white')}>
          {round(data?.pnlStats?.tradeWinsPercent, 2) || 0}%
        </Text>
      </View>
      <Chart chartId="winPercent" />
    </View>
  );
};

export default WinPercentChart;
