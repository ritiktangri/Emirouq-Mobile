/* eslint-disable prettier/prettier */
import React from 'react';
import { View } from 'react-native';

import Chart from './chart';
import { DefaultText as Text } from '~/components/common/DefaultText';

import { toCurrency } from '~/utils/helper.utils';
import { useTrade } from '~/context/TradeContext';
import { useQuery } from '~/context/QueryContext';

const CumulativePnl = ({ data }: any) => {
  const { selectedDateText }: any = useQuery();

  return (
    <View className="rounded-xl border-[0.4px] border-gray-400 bg-white dark:border-0 dark:bg-dashboard_card">
      <View className="flex flex-col gap-2 p-3">
        <Text className="font-poppinsMedium text-base dark:text-dashboard_card_text ">
          Net Cumulative Pnl {selectedDateText}
        </Text>
        <Text
          className={`font-poppinsMedium text-2xl ${data?.netPnl > 0 ? 'text-green-500' : 'text-red-500'}`}>
          {toCurrency(data?.netPnl || 0)}
        </Text>
      </View>
      <View className="my-2  flex h-[180px] items-center justify-center">
        <Chart chartId={`cumulative-diary-pnl-chart-${data?.date}`} data={data?.trades} />
      </View>
    </View>
  );
};

export default CumulativePnl;
