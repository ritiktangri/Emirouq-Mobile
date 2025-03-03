/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable import/order */
import React, { Suspense, useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { useECharts } from '~/context/ChartContext';
import {
  MemoizedCalendarStats,
  MemoizedCumulativePnl,
  MemoizedDailyPnl,
  MemoizedTags,
  MemoizedTrades,
  MemoizedRealizedPnl,
  MemoizedStatsCards,
  MemoizedWinPercentChart,
  MemoizedMetricCards,
  MemoizedSelectPnl,
  MemoizedTickerTape,
  MemoizedWeeklyStats,
} from './export';
import { useDashboard } from '~/context/DashboardContext';
import Loading from './Loading';
import theme from '~/utils/theme';
import CalendarStats from './CalendarStats';
import CumulativePnl from './CumulativePnl';
import DailyPnl from './DailyPnl';

// we are rendering the components when the user scrolls to them , this is to improve performance
const initialComponents = [
  <MemoizedTickerTape />,
  <MemoizedSelectPnl />,
  <MemoizedMetricCards />,
  <MemoizedWinPercentChart />,
  <MemoizedStatsCards />,
  <MemoizedRealizedPnl />,
  <MemoizedTrades />,
];
const components = [
  ...initialComponents,
  <MemoizedTags />,
  <DailyPnl />,
  <CumulativePnl />,
  <CalendarStats />,
  <MemoizedWeeklyStats />,
];

const Portfolio = React.memo(() => {
  const [data, setData] = useState(initialComponents);
  const [offset, setOffset] = useState(initialComponents?.length);
  const handleEndReached = useCallback(async () => {
    const nextOffset = offset + 3;
    const newComponents = components?.slice(offset, nextOffset);
    setData((prevData) => [...prevData, ...newComponents]);
    setOffset(nextOffset);
  }, [offset]);
  const { loading, allServices }: any = useDashboard();
  const { hideTooltip }: any = useECharts();

  // this is to scroll to top when the user refreshes the page
  const flatListRef: any = React.useRef(null);
  // useEffect(() => {
  //   if (!loading && data.length > 0) {
  //     flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
  //   }
  // }, [loading, data]);

  // to make smooth animation of charts
  // we have to reset components when loading is true
  // if all the components are rendered at once, it will cause lag in the animation of chart
  useEffect(() => {
    if (loading) {
      setData(initialComponents);
      setOffset(initialComponents?.length);
    }
  }, [loading]);

  return (
    <View className="bg-default_light_bg flex-1 dark:bg-black">
      <FlatList
        ref={flatListRef}
        onScroll={() => {
          hideTooltip();
        }}
        refreshControl={
          <RefreshControl
            colors={[theme.colors.primary]}
            refreshing={false}
            onRefresh={allServices}
            tintColor={theme.colors.primary}
          />
        }
        onEndReached={handleEndReached}
        // since initially, onEndReached is called without scrolling
        // so we need to set onEndReachedThreshold to a very small value
        onEndReachedThreshold={0.3}
        showsVerticalScrollIndicator={false}
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => {
          if (index === 0) {
            // Render TickerTape directly without loading
            return <View className="my-2">{item}</View>;
          } else {
            if (loading) {
              return <Loading />;
            }
            return (
              <Suspense fallback={<View />}>
                <View className="my-2">{item}</View>
              </Suspense>
            );
          }
        }}
        initialNumToRender={6}
      />
    </View>
  );
});
export default Portfolio;
