/* eslint-disable import/order */
import React, { useCallback } from 'react';
import { KeyboardAvoidingView, Platform, RefreshControl, VirtualizedList } from 'react-native';
import Header from './header';
import Render from './Render';
import { useDiary } from '~/context/DiaryContext';
import theme from '~/utils/theme';
import Loading from './loading';
import EmptyState from './empty';

const Diary = () => {
  const { data, loading, getTrades }: any = useDiary();

  // Memoize the getItem function
  const getItem = useCallback((_: any, index: any) => data[index], [data]);

  // Memoize the getItemCount function
  const getItemCount = useCallback(() => data.length, [data]);

  // Memoize the renderItem function to prevent unnecessary re-renders
  const renderItem = useCallback(
    ({ item }: any) => (loading ? <Loading /> : <Render item={item} />),
    [Render, loading]
  );

  const keyExtractor = useCallback((item: any) => item?.date, []);
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="mt2 bg-default_light_bg flex-1 dark:bg-black ">
      <VirtualizedList
        refreshControl={
          <RefreshControl
            colors={[theme.colors.primary]}
            refreshing={false}
            onRefresh={getTrades}
            tintColor={theme.colors.primary}
          />
        }
        ListHeaderComponent={Header}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentClassName="pt-3"
        data={data}
        getItem={getItem}
        getItemCount={getItemCount}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={loading ? <Loading /> : <EmptyState />}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 0, gap: 20, paddingHorizontal: 16, paddingTop: 8 }} // Changed to contentContainerStyle for VirtualizedList
        initialNumToRender={10} // Render 10 items initially
        maxToRenderPerBatch={5} // Render 5 items per batch during scrolling
        updateCellsBatchingPeriod={50} // Delay between batches (milliseconds)
        windowSize={21} //Keep the window size as the default one if you are not sure
      />
    </KeyboardAvoidingView>
  );
};

export default Diary;
