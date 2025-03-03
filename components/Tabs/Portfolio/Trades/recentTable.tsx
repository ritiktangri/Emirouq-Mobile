/* eslint-disable import/order */
import dayjs from 'dayjs';
import React from 'react';
import { View, ScrollView } from 'react-native';
import { useDashboard } from '~/context/DashboardContext';
import { cn, toCurrency } from '~/utils/helper.utils';
import { DefaultText as Text } from '~/components/common/DefaultText';

const RecentTable = ({ type }: any) => {
  const { dashboardTrades }: any = useDashboard();
  const trades = dashboardTrades?.[type];
  return (
    <View className="mt-8 flex-1">
      <ScrollView className="">
        {/* Header Row */}
        <View className="mb-2 flex-row justify-between">
          <Text className={cn('w-1/3 text-center font-poppinsMedium text-sm dark:text-white')}>
            Close Date
          </Text>
          <Text className={cn('w-1/3 text-center font-poppinsMedium text-sm dark:text-white')}>
            Symbol
          </Text>
          <Text className={cn('w-1/3 text-center font-poppinsMedium text-sm dark:text-white')}>
            Net P&L
          </Text>
        </View>

        {/* Divider */}
        <View className="border- mb-4 border-[0.2px] border-[#30363d] dark:border" />

        {/* Data Rows */}
        {trades?.length ? (
          trades?.map((item: any) => (
            <View key={item?.uuid} className="mb-4 flex-1 flex-row py-1">
              <View
                className={`w-1/3 rounded-md border-l-2 px-2 ${item?.netPnl > 0 ? 'border-green-500' : 'border-red-500'}`}>
                <Text
                  className={` text-center font-poppinsMedium text-sm dark:text-dashboard_card_text  `}>
                  {dayjs(item?.closeDate).format('YYYY-MM-DD')}
                </Text>
                <Text
                  className={` text-center font-poppinsMedium text-sm dark:text-dashboard_card_text`}>
                  {dayjs(item?.closeDate).format('HH:mm:ss A')}
                </Text>
              </View>
              <Text className="w-1/3  text-center font-poppinsMedium text-sm text-primary">
                {item?.underlyingSymbol || item?.symbol}
              </Text>
              <Text
                className={`w-1/3  text-center font-poppinsMedium text-sm ${
                  item?.netPnl > 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                {toCurrency(item?.netPnl)}
              </Text>
            </View>
          ))
        ) : (
          <View className="my-4 flex-1">
            <Text className={cn('text-center font-poppinsMedium dark:text-white')}>
              No data available
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default RecentTable;
