/* eslint-disable import/order */
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { useTrade } from '~/context/TradeContext';
import { Ionicons } from '@expo/vector-icons';
import theme from '~/utils/theme';
import Checkbox from 'expo-checkbox';
import { setStorageItemAsync } from '~/hooks/useStorageState';

const FilterModal = () => {
  const { columns, filterColumns, setFilterColumns, setFilterModal }: any = useTrade();
  return (
    <View className="flex-1 flex-row items-center justify-center bg-[rgba(0,0,0,0.5)] p-5">
      <FlatList
        data={columns?.slice(1)}
        numColumns={2}
        contentContainerClassName="px-6 py-10 gap-y-6"
        keyExtractor={(_, index) => index.toString()}
        ListHeaderComponent={() => {
          return (
            <View className="flex-1 flex-row  ">
              <View className="flex-1 gap-2">
                <Text className=" font-poppinsMedium text-xl capitalize text-black  dark:text-white">
                  Select Columns
                </Text>
                <Text className=" font-poppinsMedium text-xs  text-black  dark:text-white">
                  Choose the columns you want to display in the table
                </Text>
              </View>
              <TouchableOpacity>
                <Ionicons
                  name="close-outline"
                  size={24}
                  color={theme.colors.primary}
                  onPress={() => setFilterModal(false)}
                />
              </TouchableOpacity>
            </View>
          );
        }}
        className="rounded-xl bg-white  dark:bg-dashboard_card"
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item }) => {
          return (
            <View className="flex-1 flex-row items-center gap-2  ">
              <Checkbox
                value={filterColumns?.includes(item.dataIndex)}
                onValueChange={async () => {
                  const isFiltered = filterColumns?.includes(item.dataIndex);
                  if (isFiltered) {
                    const filter = filterColumns?.filter((i: any) => i !== item.dataIndex);
                    setFilterColumns(filter);
                    await setStorageItemAsync('filterColumns', JSON.stringify(filter));
                  } else {
                    setFilterColumns([...filterColumns, item.dataIndex]);
                    await setStorageItemAsync(
                      'filterColumns',
                      JSON.stringify([...filterColumns, item.dataIndex])
                    );
                  }
                }}
                color={
                  filterColumns?.includes(item.dataIndex)
                    ? theme.colors.primary
                    : theme.colors.drawer
                }
                style={{ borderRadius: 3, width: 18, height: 18 }}
              />
              <Text className="font-poppinsMedium text-sm capitalize text-black  dark:text-white">
                {item?.title}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default FilterModal;
