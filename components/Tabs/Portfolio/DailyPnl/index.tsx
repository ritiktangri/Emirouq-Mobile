/* eslint-disable prettier/prettier */
import React from 'react';
import { View } from 'react-native';

import Chart from './chart';

import { DefaultText as Text } from '~/components/common/DefaultText';
import { useQuery } from '~/context/QueryContext';
import { cn } from '~/utils/helper.utils';

const DailyPnl = () => {
  const { selectedDateText }: any = useQuery();
  return (
    <View className={cn('mx-2 flex-col gap-0 rounded-lg bg-white  dark:bg-dashboard_card')}>
      <View className="flex flex-row items-center gap-2 p-5">
        <Text className={cn('font-poppinsMedium text-lg dark:text-dashboard_card_text')}>
          Net Daily Pnl
        </Text>
        {selectedDateText}
      </View>
      <Chart chartId="daily-pnl" />
    </View>
  );
};

export default DailyPnl;
