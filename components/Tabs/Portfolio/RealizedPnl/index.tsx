/* eslint-disable import/order */
import React, { useMemo } from 'react';
import { View } from 'react-native';
import { DefaultText as Text } from '~/components/common/DefaultText';
import Line from '~/components/Line';
import { useDashboard } from '~/context/DashboardContext';
import { cn, toCurrency } from '~/utils/helper.utils';

const RealizedPnl = () => {
  let { data } = useDashboard();
  data = useMemo(() => {
    return [
      {
        id: 1,
        text: 'Avg. Planned R-Multiple',
        value: data?.plannedMultiple?.avgPlannedRMultiple
          ? `${data?.plannedMultiple?.avgPlannedRMultiple}R`
          : '--',
        isPositive: data?.plannedMultiple?.avgPlannedRMultiple > 0,
      },
      {
        id: 2,
        text: 'Avg. Positive Realized R-Multiple',
        value: data?.plannedMultiple?.positiveRealizedRMultiple
          ? `${data?.plannedMultiple?.positiveRealizedRMultiple}R`
          : '--',
        isPositive: data?.plannedMultiple?.positiveRealizedRMultiple > 0,
      },
      {
        id: 3,
        text: 'Avg. Negative Realized R-Multiple',
        value: data?.plannedMultiple?.negativeRealizedRMultiple
          ? `${data?.plannedMultiple?.negativeRealizedRMultiple}R`
          : '--',
        isPositive: data?.plannedMultiple?.negativeRealizedRMultiple,
      },
      {
        id: 4,
        text: 'Avg. Position Size',
        isPositive: data?.avgPositionSize?.avgPositionSize > 0,
        value: toCurrency(data?.avgPositionSize?.avgPositionSize || 0),
      },
    ];
  }, [data]);
  return (
    <View className={cn('mx-2 rounded-lg  bg-white p-5  dark:bg-dashboard_card')}>
      <View className="flex flex-col gap-5">
        {data.map((item: any, index: any) => (
          <View key={item.id}>
            <View className="flex flex-row items-center justify-between">
              <Text className={cn('font-poppinsMedium text-base dark:text-dashboard_card_text')}>
                {item.text}
              </Text>
              <Text
                className={`${item?.isPositive > 0 ? 'text-green-500' : 'text-red-500'} font-poppinsSemiBold text-base`}>
                {item.value || '--'}
              </Text>
            </View>
            {data?.length - 1 !== index ? <Line className="py-2" /> : <></>}
          </View>
        ))}
      </View>
    </View>
  );
};

export default RealizedPnl;
