/* eslint-disable import/order */
import React, { useCallback } from 'react';
import { View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { DefaultText as Text } from '~/components/common/DefaultText';

import { useTrade } from '~/context/TradeContext';
import { width } from '~/constants/Colors';
import { NoTradesSVG } from '~/svgs';
import Loading from './loading';
import theme from '~/utils/theme';
import Checkbox from 'expo-checkbox';
import { useRouter } from 'expo-router';
import { useTheme } from '~/context/ThemeContext';
import { cn } from '~/utils/helper.utils';

// Optimized CellContent component
const CellContent = React.memo(({ value, item, col }: any) => {
  const cellStyle = [{ width: width * col.width }];
  return (
    <View
      className={`flex   ${col?.dataIndex === 'select' ? 'items-center' : 'items-start'} justify-center `}
      style={cellStyle}>
      {col.render(value, item)}
    </View>
  );
});
const MemoizedCheckbox = React.memo(({ status, onPress }: any) => {
  return (
    <Checkbox
      value={status}
      onValueChange={onPress}
      color={status ? theme.colors.primary : theme.colors.drawer}
      style={{ borderRadius: 3, width: 18, height: 18 }}
    />
  );
});

// Header Component
const TableHeader = React.memo(({ selectedRows, toggleSelectAll, columns, trades }: any) => {
  return (
    <View className={cn('flex-row bg-gray-200 p-2 dark:bg-trade_table_header')}>
      {columns.map((col: any) => (
        <View
          key={col.dataIndex}
          className="items- center  flex flex-row justify-center "
          style={[{ width: width * col.width }]}>
          {col.dataIndex === 'select' ? (
            <MemoizedCheckbox
              status={selectedRows.size === trades.length}
              onPress={() => toggleSelectAll()}
            />
          ) : (
            <View
              className="flex-row items-center justify-start"
              key={col.title}
              style={{ width: col.width * width }}>
              <Text
                numberOfLines={1}
                className={cn('font-poppinsMedium text-[11px] dark:text-white')}>
                {col.title}
              </Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );
});

// Row Component
const TableRow = React.memo(({ item, index, isSelected, toggleRowSelection, columns }: any) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => toggleRowSelection(index)}
      className={` ${isSelected ? 'bg-gray-100 dark:bg-trade_table_column' : 'bg-white dark:bg-dashboard_card'}`}>
      <View className="flex flex-row p-2">
        {columns.map((col: any) => (
          <CellContent
            key={col.dataIndex}
            value={item[col.dataIndex]}
            item={item}
            col={col}
            width={width}
          />
        ))}
      </View>
    </TouchableOpacity>
  );
});

const CustomTable = () => {
  const {
    trades,
    tradeLoading,
    selectedRows,
    toggleSelectAll,
    filterColumns,
    columns,
    toggleRowSelection,
  }: any = useTrade();

  const router = useRouter();
  // Memoized renderRow function
  const renderRow = useCallback(
    ({ item, index }: any) => {
      const isSelected = selectedRows.has(item.uuid);
      return (
        <TableRow
          item={item}
          index={index}
          isSelected={isSelected}
          toggleRowSelection={() => {
            router.push(`/(hydrogen)/(drawer)/(tabs)/trades/${item.uuid}`);
          }}
          columns={columns?.filter((col: any) => filterColumns.includes(col.dataIndex))}
        />
      );
    },
    [selectedRows, toggleRowSelection, columns, width, router, filterColumns]
  );
  const renderTableHeader = useCallback(() => {
    return (
      <TableHeader
        selectedRows={selectedRows}
        toggleSelectAll={toggleSelectAll}
        columns={columns?.filter((col: any) => filterColumns.includes(col.dataIndex))}
        trades={trades}
      />
    );
  }, [selectedRows, toggleSelectAll, columns, trades, filterColumns]);

  return (
    <View className={cn('mx-2 flex-1 rounded-lg dark:bg-drawer')}>
      {tradeLoading ? (
        <View className="mx-2 flex-1 ">
          <Loading id="recent-trades" />
        </View>
      ) : trades.length === 0 ? (
        <View className="min-h-[300px] flex-1 flex-col items-center justify-center gap-2">
          <View className="flex items-center justify-center">
            <NoTradesSVG />
          </View>
          <View>
            <Text className={cn('font-poppinsMedium text-lg dark:text-white')}>
              No trades found
            </Text>
          </View>
        </View>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator>
          <View className={cn('border-[0.4px] border-gray-300 dark:border-0')}>
            {renderTableHeader()}
            <FlatList
              data={trades}
              ListFooterComponentClassName="flex-1 mx-2"
              renderItem={renderRow}
              keyExtractor={(item: any) => item.uuid}
              getItemLayout={(_, index) => ({
                length: 50,
                offset: 50 * index,
                index,
              })}
              maxToRenderPerBatch={15}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default CustomTable;
