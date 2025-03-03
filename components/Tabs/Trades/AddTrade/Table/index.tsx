import { View, StyleSheet, Dimensions, ScrollView, useColorScheme } from 'react-native';
import React from 'react';
import { DataTable } from 'react-native-paper';
import { AntDesign, Feather } from '@expo/vector-icons';
import { DefaultText as Text } from '~/components/common/DefaultText';
import dayjs from 'dayjs';

const TradeList = ({ tab, setSingleTrade, data, setOpen, setTradesList }: any) => {
  const { width } = Dimensions.get('screen');
  const colorScheme = useColorScheme();
  const deleteItem = (index: any) => {
    setTradesList((prevItems: any) => {
      const newItems = [...prevItems];
      newItems.splice(index, 1);
      return newItems;
    });
  };
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      keyboardShouldPersistTaps="always">
      <DataTable className="rounded-lg border-[0.2px] border-gray-400 bg-[#F1F1F1] dark:border dark:border-gray-700 dark:bg-transparent">
        <DataTable.Header className="rounded-t-lg">
          <DataTable.Title
            style={{
              width: width * 0.25,
            }}
            textStyle={{ color: colorScheme === 'dark' ? 'white' : '#686868' }}>
            Date
          </DataTable.Title>
          <DataTable.Title
            style={{
              width: width * 0.2,
            }}
            textStyle={{ color: colorScheme === 'dark' ? 'white' : '#686868' }}>
            Time
          </DataTable.Title>
          {tab === 1 ? (
            <>
              <DataTable.Title
                style={{
                  width: width * 0.2,
                }}
                textStyle={{ color: colorScheme === 'dark' ? 'white' : '#686868' }}>
                Instrument
              </DataTable.Title>
              <DataTable.Title
                style={{
                  width: width * 0.2,
                }}
                textStyle={{ color: colorScheme === 'dark' ? 'white' : '#686868' }}>
                Exp Date
              </DataTable.Title>
              <DataTable.Title
                style={{
                  width: width * 0.2,
                }}
                textStyle={{ color: colorScheme === 'dark' ? 'white' : '#686868' }}>
                Strike
              </DataTable.Title>
              <DataTable.Title
                style={{
                  width: width * 0.3,
                }}
                textStyle={{ color: colorScheme === 'dark' ? 'white' : '#686868' }}>
                Contract Multiplier
              </DataTable.Title>
            </>
          ) : null}
          <DataTable.Title
            style={{
              width: width * 0.2,
            }}
            textStyle={{ color: colorScheme === 'dark' ? 'white' : '#686868' }}>
            QTY
          </DataTable.Title>
          <DataTable.Title
            style={{
              width: width * 0.2,
            }}
            textStyle={{ color: colorScheme === 'dark' ? 'white' : '#686868' }}>
            Side
          </DataTable.Title>
          <DataTable.Title
            style={{
              width: width * 0.2,
            }}
            textStyle={{ color: colorScheme === 'dark' ? 'white' : '#686868' }}>
            Price
          </DataTable.Title>
          <DataTable.Title
            style={{
              width: width * 0.2,
            }}
            textStyle={{ color: colorScheme === 'dark' ? 'white' : '#686868' }}>
            Commission
          </DataTable.Title>
          <DataTable.Title textStyle={{ color: colorScheme === 'dark' ? 'white' : '#686868' }}>
            Action
          </DataTable.Title>
        </DataTable.Header>

        {data?.map((item: any, index: any) => (
          <DataTable.Row key={index} className="bg-white dark:bg-[#1B2531]">
            <DataTable.Cell
              style={{
                width: width * 0.25,
              }}
              textStyle={{ color: colorScheme === 'dark' ? 'white' : '#686868' }}>
              {dayjs(item.date).format('YYYY-MM-DD')}
            </DataTable.Cell>
            <DataTable.Cell
              style={{
                width: width * 0.2,
              }}
              textStyle={{ color: colorScheme === 'dark' ? 'white' : '#686868' }}>
              {dayjs(item.time).format('hh:mm:ss')}
            </DataTable.Cell>
            {tab === 1 ? (
              <>
                <DataTable.Cell
                  style={{
                    width: width * 0.2,
                  }}
                  textStyle={{ color: colorScheme === 'dark' ? 'white' : '#686868' }}>
                  {item.instrument?.toUpperCase()}
                </DataTable.Cell>
                <DataTable.Cell
                  style={{
                    width: width * 0.2,
                  }}
                  textStyle={{ color: colorScheme === 'dark' ? 'white' : '#686868' }}>
                  {dayjs(item.expDate).format('hh:mm:ss')}
                </DataTable.Cell>
                <DataTable.Cell
                  style={{
                    width: width * 0.2,
                  }}
                  textStyle={{ color: colorScheme === 'dark' ? 'white' : '#686868' }}>
                  {item.strike}
                </DataTable.Cell>
                <DataTable.Cell
                  style={{
                    width: width * 0.3,
                  }}
                  textStyle={{ color: colorScheme === 'dark' ? 'white' : '#686868' }}>
                  {item.contractMultiplier}
                </DataTable.Cell>
              </>
            ) : null}
            <DataTable.Cell
              style={{
                width: width * 0.2,
              }}
              textStyle={{ color: colorScheme === 'dark' ? 'white' : '#686868' }}>
              {item.quantity}
            </DataTable.Cell>
            <DataTable.Cell
              style={{
                width: width * 0.2,
              }}
              textStyle={{ color: colorScheme === 'dark' ? 'white' : '#686868' }}>
              <View className="flex-row items-center gap-1">
                <View
                  className={`${item?.side == 'buy' ? 'bg-green-500' : 'bg-red-500'} h-2 w-2 rounded-full`}
                />
                <Text className={`${item?.side == 'buy' ? 'text-green-500' : 'text-red-500'}`}>
                  {item.side?.toUpperCase()}
                </Text>
              </View>
            </DataTable.Cell>
            <DataTable.Cell
              style={{
                width: width * 0.2,
              }}
              textStyle={{ color: colorScheme === 'dark' ? 'white' : '#686868' }}>
              {item.price}
            </DataTable.Cell>
            <DataTable.Cell
              style={{
                width: width * 0.2,
              }}
              textStyle={{ color: colorScheme === 'dark' ? 'white' : '#686868' }}>
              {item.commission}
            </DataTable.Cell>
            <DataTable.Cell textStyle={{ color: colorScheme === 'dark' ? 'white' : '#686868' }}>
              <View className="flex-row items-center gap-x-4">
                <Feather
                  name="edit"
                  size={14}
                  color="#75A3FF"
                  onPress={() => {
                    setSingleTrade({ ...item, index: index });
                    setOpen('edit');
                  }}
                />
                <AntDesign
                  name="delete"
                  size={14}
                  color="#75A3FF"
                  onPress={() => {
                    deleteItem(index);
                  }}
                />
              </View>
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </ScrollView>
  );
};

export default TradeList;
const styles = StyleSheet.create({
  cell: {
    color: 'white',
  },
});
