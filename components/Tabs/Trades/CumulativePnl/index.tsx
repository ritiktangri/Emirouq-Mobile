/* eslint-disable prettier/prettier */
import React from 'react';
import { View } from 'react-native';

import Chart from './chart';
import { DefaultText as Text } from '~/components/common/DefaultText';

import { cn, toCurrency } from '~/utils/helper.utils';
import { useTrade } from '~/context/TradeContext';
import { useQuery } from '~/context/QueryContext';
import { useTheme } from '~/context/ThemeContext';

const CumulativePnl = () => {
  const { cumulative }: any = useTrade();
  const { selectedDateText }: any = useQuery();

  return (
    <View className={cn('mx-2 rounded-xl bg-white dark:bg-dashboard_card')}>
      <View className="flex flex-col gap-2  p-3">
        <Text className={cn('font-poppinsMedium text-base dark:text-dashboard_card_text')}>
          Net Cumulative Pnl
        </Text>
        {selectedDateText}
        <Text
          className={`font-poppinsMedium text-2xl ${cumulative?.netPnl > 0 ? 'text-green-500' : 'text-red-500'}`}>
          {toCurrency(cumulative?.netPnl || 0)}
        </Text>
      </View>
      <View className="mb-2 flex h-[160px] items-center justify-center  ">
        <Chart chartId="cumulative-trade-pnl-chart" />
      </View>
    </View>
  );
};

export default CumulativePnl;
