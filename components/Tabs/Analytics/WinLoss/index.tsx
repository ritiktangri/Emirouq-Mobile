import React, { useMemo } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { DefaultText as Text } from '~/components/common/DefaultText';

import Stats from './stats';

import { useReport } from '~/context/ReportContext';
import Chart from './chart';
import theme from '~/utils/theme';
import Loading from '../Loading';
import { useQuery } from '~/context/QueryContext';

const color: any = {
  win: 'text-green-500',
  loss: 'text-red-500',
  true: 'text-green-500',
  false: 'text-red-500',
};

const WinLoss = () => {
  const { selectedDateText }: any = useQuery();

  const { chartReport, loadingScreens }: any = useReport();
  const data = useMemo(
    () =>
      loadingScreens === 'winLoss'
        ? []
        : [
            {
              id: 1,
              key: 'win',
              value: 'Wins',
              stats: chartReport?.winLoss?.win || {},
              data: chartReport?.winLoss?.cumulativeWinTrades || [],
              chartHeading: 'Daily Net Cumulative P&L (WINS)',
              subHeading: selectedDateText,
            },
            {
              id: 2,
              key: 'loss',
              value: 'Losses',
              stats: chartReport?.winLoss?.loss || {},
              data: chartReport?.winLoss?.cumulativeLoseTrades || [],
              chartHeading: 'Daily Net Cumulative P&L (LOSSES)',
              subHeading: selectedDateText,
            },
          ],
    [chartReport?.winLoss, loadingScreens]
  );

  return loadingScreens === 'winLoss' ? (
    <Loading id="winLoss" />
  ) : (
    <FlatList
      className="mx-4 mt-2 gap-y-2"
      contentContainerStyle={{ gap: 16 }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          colors={[theme.colors.primary]}
          refreshing={false}
          onRefresh={() => {}}
          tintColor={theme.colors.primary}
        />
      }
      data={data}
      renderItem={({ item }) => (
        <View className="gap-y-4">
          <View className="flex-row items-center gap-2 rounded-lg bg-white px-5 py-5 dark:bg-dashboard_card">
            <Text className={`font-poppinsMedium text-xl uppercase ${color[item?.key]}`}>
              {item?.value}
            </Text>
            <Text className={`font-poppinsMedium text-lg ${color[item?.key]}`}>
              ({item?.key === 'win' ? item?.stats?.winningTrades : item?.stats?.losingTrades}{' '}
              Trades)
            </Text>
          </View>

          <Stats item={item} />

          <View className="rounded-lg bg-white p-5 dark:bg-dashboard_card">
            <Text className="font-poppinsMedium text-lg dark:text-dashboard_card_text">
              {item?.chartHeading}
            </Text>
            {item?.subHeading}
            <Chart chartId={`chart_${item?.key}`} data={item?.data} />
          </View>
        </View>
      )}
      keyExtractor={(item) => item?.id.toString()}
    />
  );
};

export default WinLoss;
