import React from 'react';
import { View } from 'react-native';
import { DefaultText as Text } from '~/components/common/DefaultText';

import { useDashboard } from '~/context/DashboardContext';
import { cn, toCurrency } from '~/utils/helper.utils';

const WeeklyStats = () => {
  const { weeksList }: any = useDashboard();
  return (
    <View className="mx-2 flex flex-row flex-wrap justify-start gap-2">
      {weeksList?.map((item: any, index: any) => (
        <View
          key={item.id}
          className={cn(
            'mb-2 w-[32%] gap-2 rounded-lg p-4',
            'bg-white dark:border-2 dark:border-gray-800 dark:bg-dashboard_card'
          )}>
          <Text className={cn('font-poppinsMedium text-xs dark:!text-white')}>
            Week {index + 1}
          </Text>
          <Text
            className={`font-poppinsMedium text-base ${
              item?.pnl === 0
                ? 'dark:text-dashboard_card_text'
                : item?.pnl > 0
                  ? 'text-green-500'
                  : 'text-red-500'
            }`}>
            {toCurrency(item?.pnl || 0)}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default WeeklyStats;
