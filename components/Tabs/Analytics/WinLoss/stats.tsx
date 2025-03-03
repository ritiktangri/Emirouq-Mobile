import { View, Text } from 'react-native';
import React from 'react';

import { toCurrency } from '~/utils/helper.utils';
import { useQuery } from '~/context/QueryContext';
const renderStatItem = (label: string, value: string | number, color?: string) => {
  return (
    <View className="flex-row justify-between py-1">
      <Text className="font-poppinsRegular text-base dark:text-dashboard_card_text">{label}</Text>
      <Text className={`font-poppinsMedium text-base ${color ? color : 'text-white'}`}>
        {value}
      </Text>
    </View>
  );
};

const Stats = ({ item }: any) => {
  const { selectedDateText }: any = useQuery();

  return (
    <View className="rounded-lg bg-white px-5 py-5 dark:bg-dashboard_card">
      <View className="mb-2">
        <Text className="font-poppinsMedium text-lg dark:text-dashboard_card_text">
          Statistics ({item?.value})
        </Text>
        {selectedDateText}
      </View>
      <View className="border-t border-gray-600 pt-2">
        {renderStatItem(
          'Total P&L',
          toCurrency(item?.stats?.pnl || 0),
          item?.key === 'loss' ? 'text-red-500' : 'text-green-500'
        )}
        {renderStatItem('Average Position Size', toCurrency(item?.stats?.avgPositionSize || 0))}
        {renderStatItem(
          item?.key === 'win' ? 'Average Winning Trade' : 'Average Losing Trade',
          item?.key === 'win'
            ? toCurrency(item?.stats?.avgWinningTrade || 0)
            : toCurrency(item?.stats?.avgLosingTrade || 0),
          item?.key === 'loss' ? 'text-red-500' : 'text-green-500'
        )}
        {renderStatItem(
          item?.key === 'win' ? 'Number of Winning Trades' : 'Number of Losing Trades',
          item?.key === 'win' ? item?.stats?.winningTrades || 0 : item?.stats?.losingTrades || 0
        )}
        {renderStatItem('Total commission', toCurrency(item?.stats?.totalCommission || 0))}
      </View>
    </View>
  );
};

export default Stats;
