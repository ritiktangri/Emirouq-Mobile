/* eslint-disable import/order */
import React, { Suspense } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';

import theme from '~/utils/theme';
import { useReport } from '~/context/ReportContext';

import { MemoizedStatsCards } from '../export';
import Loading from '../Loading';
import AnimatedAccordion from './AnimatedAccordion';

const Overview = () => {
  const components = [<MemoizedStatsCards />, <AnimatedAccordion />];
  const { loading, getReportsSummary }: any = useReport();
  return (
    <View className="flex-1 dark:bg-black ">
      <FlatList
        onScroll={() => {}}
        contentContainerClassName="gap-y-3 mt-3"
        refreshControl={
          <RefreshControl
            colors={[theme.colors.primary]}
            refreshing={false}
            onRefresh={getReportsSummary}
            tintColor={theme.colors.primary}
          />
        }
        // since initially, onEndReached is called without scrolling
        // so we need to set onEndReachedThreshold to a very small value
        onEndReachedThreshold={0.3}
        showsVerticalScrollIndicator={false}
        data={
          loading
            ? [
                <View className="mx-4">
                  <Loading id="overview" />
                </View>,
              ]
            : components
        }
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Suspense fallback={<View />}>
            <View className="">{item}</View>
          </Suspense>
        )}
        initialNumToRender={2}
      />
    </View>
  );
};

export default Overview;
