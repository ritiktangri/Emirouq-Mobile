/* eslint-disable import/order */
import { View, FlatList } from 'react-native';
import React from 'react';
import { useDashboard } from '~/context/DashboardContext';
import { cn, toCurrency } from '~/utils/helper.utils';
import { DefaultText as Text } from '~/components/common/DefaultText';
import { BankSvg, CommissionSVG, PieCoinsSVG } from '~/svgs';
import theme from '~/utils/theme';

const MetricCards = () => {
  const { data } = useDashboard();
  const eComDashboardStatData = [
    {
      id: 'totalNetPnl',
      icon: <BankSvg fill={theme.colors.bank} />,
      title: 'Net P&L',
      metric: data?.metricCards?.totalNetPnl || 0,
      increased: true,
      decreased: false,
      percentage: '+24.68%',
      style: 'text-[#049F80]',
      fill: '#049F80',
      info: true,
    },
    {
      id: 'totalGrossPnl',
      icon: <PieCoinsSVG fill={theme.colors.primary} />,
      title: 'Gross P&L',
      metric: data?.metricCards?.totalGrossPnl || 0,

      increased: false,
      decreased: true,
      percentage: '-4.40',
      style: 'text-[#3872FA]',
      fill: '#3872FA',
      info: false,
    },
    {
      id: 'totalCommission',
      icon: <CommissionSVG fill={theme.colors.commission} />,

      title: 'Commission',
      metric: data?.metricCards?.totalCommission || 0,

      increased: false,
      decreased: true,
      percentage: '-4.40',
      style: 'text-[#3872FA]',
      fill: '#3872FA',
      info: false,
    },
  ];
  return (
    <View className="flex-1 ">
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={eComDashboardStatData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }: any) => (
          <View
            className={cn(
              'mx-2 flex w-52 flex-col justify-center gap-3 rounded-lg  bg-white p-4 md:w-96  dark:border-gray-800 dark:bg-dashboard_card'
            )}>
            <View className="flex flex-row items-center justify-between">
              {item?.icon}
              <View className="ml-2 flex-1">
                <View className="flex-col gap-2">
                  <Text
                    className={cn('font-poppinsMedium text-base text-black dark:text-[#BFBFBF]')}>
                    {item?.title}
                  </Text>
                  <Text
                    className={`font-poppinsMedium text-xl ${item?.metric > 0 ? 'text-green-500' : 'text-red-600'}`}>
                    {toCurrency(item?.metric)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default MetricCards;
