/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable import/order */
import React, { Suspense, useCallback, useState } from 'react';
import {
  FlatList,
  Modal,
  RefreshControl,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import theme from '~/utils/theme';
import { useTrade } from '~/context/TradeContext';
import { MemoizedCumulativePnl, MemoizedFilters } from './export';

import CustomTable from './Table';
import Loading from './Table/loading';
import { useTheme } from '~/context/ThemeContext';
import { cn } from '~/utils/helper.utils';
import FilterModal from './FilterColumns';
import Footer from './Table/footer';
import Picker from '~/components/common/Picker';
import { Ionicons } from '@expo/vector-icons';

// we are rendering the components when the user scrolls to them , this is to improve performance
// const components: any = [<MemoizedTradeTable />];

const Trades = () => {
  const {
    getTradesList,
    cumulativeChart,
    chartLoading,
    filterModal,
    bulkActionModal,
    setBulkActionModal,
  }: any = useTrade();

  const renderHeader = useCallback(() => {
    return (
      <>
        <MemoizedCumulativePnl />
        <MemoizedFilters />
      </>
    );
  }, []);
  const RenderFooter = useCallback(() => <Footer />, []);
  const Table = useCallback(() => <CustomTable />, []);
  const items = Array.from({ length: 300 }, (_, i) => `index-${i}`);
  const itemHeight = 50;

  const handleIndexChange = (index: number) => {
    // setSelectedValue(items[index]);
  };
  const RenderBulkActionModal = useCallback(() => {
    return (
      <View className="flex flex-1 items-center justify-end bg-[rgba(0,0,0,0.5)]">
        <View className=" h-1/4 w-full rounded-t-3xl bg-gray-100 p-4 dark:bg-account_table_bg">
          <View className=" flex  flex-row items-center">
            <Text className="flex-1 font-poppinsMedium text-base text-black dark:text-white">
              Collective Actions on Trades
            </Text>
            <TouchableOpacity
              onPress={() => {
                setBulkActionModal(false);
              }}>
              <Ionicons name="close" size={24} className="!text-black dark:!text-white" />
            </TouchableOpacity>
          </View>
          <Picker items={items} onIndexChange={handleIndexChange} itemHeight={itemHeight} />
        </View>
      </View>
    );
  }, [bulkActionModal, items]);
  return (
    <View className={cn('bg-default_light_bg flex-1 flex-col dark:bg-black')}>
      {chartLoading ? (
        <View className=" mx-2 flex-1 ">
          <Loading />
        </View>
      ) : (
        <FlatList
          ListHeaderComponentClassName="flex-1 my-2 gap-y-2"
          onScroll={() => {}}
          ListHeaderComponent={renderHeader}
          refreshControl={
            <RefreshControl
              colors={[theme.colors.primary]}
              refreshing={false}
              onRefresh={() => {
                getTradesList(null, 10, 0, '', true);
                cumulativeChart(null);
              }}
              tintColor={theme.colors.primary}
            />
          }
          // since initially, onEndReached is called without scrolling
          // so we need to set onEndReachedThreshold to a very small value
          onEndReachedThreshold={0.0001}
          // onEndReached={handleOnEndReached}
          showsVerticalScrollIndicator={false}
          data={[<Table />]}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => {
            return (
              <Suspense fallback={<View />}>
                <View className="my-2">{item}</View>
              </Suspense>
            );
          }}
          initialNumToRender={15}
          ListFooterComponent={() => <RenderFooter />}
        />
      )}
      <Modal animationType="slide" transparent visible={filterModal}>
        <FilterModal />
      </Modal>

      <Modal animationType="fade" transparent visible={bulkActionModal}>
        <RenderBulkActionModal />
      </Modal>
    </View>
  );
};

export default Trades;
