import { round } from 'lodash';
import { View, FlatList } from 'react-native';

import { DefaultText as Text } from '~/components/common/DefaultText';
import { toCurrency } from '~/utils/helper.utils';

const StatsView = ({ item }: any) => {
  const stats = [
    { title: 'Total Trades', value: item?.totalTrades },
    { title: 'Win Rate', value: `${round(item?.tradeWinsPercent, 2)}&` },
    { title: 'Winners', value: item?.tradeWinCount },
    { title: 'Losers', value: item?.tradeLossCount },
    { title: 'Break Even', value: item?.breakEvenCount },
    { title: 'Gross P&L', value: toCurrency(item?.grossPnl || 0) },
    { title: 'Total Cost', value: toCurrency(item?.netPnl || 0) },
    { title: 'Commissions', value: toCurrency(item?.commissions || 0) },
  ];
  return (
    <View className="mt-4 rounded-lg border-gray-700 bg-white p-3  dark:border dark:bg-dashboard_card">
      <FlatList
        numColumns={2}
        onEndReachedThreshold={0.3}
        showsVerticalScrollIndicator={false}
        data={stats}
        columnWrapperStyle={{ flex: 1, justifyContent: 'space-between' }}
        keyExtractor={(_: any, index: any) => index.toString()}
        renderItem={({ item }: any) => {
          return (
            <View className="flex-1 flex-row items-center justify-between gap-2 border-b border-[#3A3A4780] p-2">
              <Text className="text-base dark:text-dashboard_card_text">{item?.title}</Text>
              <Text className="text-base text-[#3c5577] dark:text-[#9DB2CE]">{item?.value}</Text>
            </View>
          );
        }}
        initialNumToRender={8}
      />
    </View>
  );
};

export default StatsView;
