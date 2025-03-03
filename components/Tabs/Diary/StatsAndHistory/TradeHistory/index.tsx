/* eslint-disable import/order */
import { View, Dimensions, StyleSheet, ScrollView, FlatList, useColorScheme } from 'react-native';
import React from 'react';
import { DataTable } from 'react-native-paper';
import { getTagsByTitle } from '~/utils/get-tags-by-title';
import dayjs from 'dayjs';
import { DefaultText as Text } from '~/components/common/DefaultText';
import { formatDateInTimeZone } from '~/utils/helper';
import { useAuth } from '~/context/AuthContext';
import { toCurrency } from '~/utils/helper.utils';
import { round } from 'lodash';

const TradeHistory = ({ item }: any) => {
  const { width } = Dimensions.get('screen');
  const { user } = useAuth();
  const colorScheme = useColorScheme();
  const columns = [
    {
      title: 'Status',
      width: width * 0.2,
      render: (item: any) => (
        <View className="flex-row items-center gap-1">
          <View
            className={`h-2 w-2 rounded-full ${item?.status === 'open' ? 'bg-green-500' : 'bg-red-500'} `}
          />
          <Text className="font-poppinsMedium text-xs dark:text-dashboard_card_text">
            {item?.status?.toUpperCase()}
          </Text>
        </View>
      ),
    },
    {
      title: 'Result',
      render: (value: any) => {
        const isBreakEven =
          value?.breakEven ||
          (value?.[value?.calculationMethod]?.netPnl === 0 && value?.status === 'closed');
        return (
          <View
            className={`flex  h-6 items-center  justify-center rounded-md border   ${
              isBreakEven
                ? `border-blue-500`
                : value?.result === 'win'
                  ? `border-green-500`
                  : value?.result === 'lose'
                    ? `border-red-500`
                    : 'border-0'
            }`}>
            <Text
              className={`
                     px-4 font-poppinsMedium text-[9px] capitalize
                     ${
                       isBreakEven
                         ? `text-blue-500`
                         : value?.result === 'win'
                           ? `text-green-500`
                           : value?.result === 'lose'
                             ? `text-red-500`
                             : 'text-dashboard_card_text'
                     }`}>
              {isBreakEven ? 'BE' : value?.result || '--'}
            </Text>
          </View>
        );
      },
      width: width * 0.2,
    },
    {
      title: 'Trade Type',
      width: width * 0.2,
      render: (item: any) => (
        <Text className="font-poppinsMedium text-xs dark:text-dashboard_card_text">
          {item?.tradeType?.toUpperCase()}
        </Text>
      ),
    },
    {
      title: 'Symbol',
      render: (item: any) => (
        <Text className="font-poppinsMedium text-xs dark:text-dashboard_card_text">
          {item?.underlyingSymbol || item?.symbol}
        </Text>
      ),
      width: width * 0.2,
    },
    {
      title: 'Open Date',
      width: width * 0.2,
      render: (value: any) => {
        const response = formatDateInTimeZone({ date: value?.openDate, tz: user?.timeZone });
        return (
          <View>
            <Text className="text-xs dark:text-dashboard_card_text">{response?.date}</Text>
            <Text className="text-xs dark:text-dashboard_card_text">{response?.time}</Text>
          </View>
        );
      },
    },
    {
      title: 'Close Date',
      width: width * 0.2,
      render: (value: any) => {
        const response = formatDateInTimeZone({ date: value?.closeDate, tz: user?.timeZone });
        return (
          <View>
            {value?.status === 'closed' ? (
              <View>
                <Text className="text-xs dark:text-dashboard_card_text">{response?.date}</Text>
                <Text className="text-xs dark:text-dashboard_card_text">{response?.time}</Text>
              </View>
            ) : (
              <Text className=" text-xs dark:text-dashboard_card_text">--</Text>
            )}
          </View>
        );
      },
    },
    {
      title: 'Avg Entry Price',
      width: width * 0.2,
      render: (item: any) => (
        <Text className="font-poppinsMedium text-xs dark:text-dashboard_card_text">
          {toCurrency(item?.avgEntryPrice)}
        </Text>
      ),
    },
    {
      title: 'Avg Exit Price',
      width: width * 0.2,
      render: (item: any) => (
        <Text className="font-poppinsMedium text-xs dark:text-dashboard_card_text">
          {toCurrency(item?.avgExitPrice)}
        </Text>
      ),
    },
    {
      title: 'Net P&L',
      render: (item: any) => (
        <Text
          className={`font-poppinsMedium text-xs dark:text-dashboard_card_text ${item?.netPnl > 0 ? '!text-green-500' : '!text-red-500'}`}>
          {toCurrency(item?.netPnl)}
        </Text>
      ),
      width: width * 0.2,
    },
    {
      title: 'Net ROI',
      render: (item: any) => (
        <Text
          className={`${item?.netRoi > 0 ? '!text-green-500' : '!text-red-500'} font-poppinsMedium text-xs dark:text-dashboard_card_text`}>
          {round(item?.netRoi, 2)}%
        </Text>
      ),
      width: width * 0.2,
    },
    {
      title: 'Executions',
      width: width * 0.2,
      render: (item: any) => (
        <Text className="font-poppinsMedium text-xs dark:text-dashboard_card_text">
          {item?.executions.length}
        </Text>
      ),
    },
    {
      title: 'Commission',
      width: width * 0.2,
      render: (item: any) => (
        <Text className="font-poppinsMedium text-xs dark:text-dashboard_card_text">
          {toCurrency(item?.totalCommission || 0)}
        </Text>
      ),
    },
    {
      title: 'Strike',
      render: (item: any) => (
        <Text className="font-poppinsMedium text-xs dark:text-dashboard_card_text">
          {toCurrency(item?.strike || 0)}
        </Text>
      ),
      width: width * 0.2,
    },
    {
      title: 'Contract Multiplier',
      width: width * 0.3,
      render: (item: any) => (
        <Text className="font-poppinsMedium text-xs dark:text-dashboard_card_text">
          {item?.contractMultiplier || '--'}
        </Text>
      ),
    },
    {
      title: 'Instrument',
      width: width * 0.2,
      render: (item: any) => (
        <Text
          className={`font-poppinsMedium text-xs dark:text-dashboard_card_text ${item?.instrument === 'call' ? '!text-green-500' : item?.instrument === 'put' ? '!text-red-500' : ''} font-interMedium`}>
          {item?.instrument?.toUpperCase() || '-'}
        </Text>
      ),
    },
    {
      title: 'Expiry Date',
      width: width * 0.2,
      render: (item: any) =>
        item?.expDate ? (
          <Text className="font-poppinsMedium text-xs dark:text-dashboard_card_text">
            {dayjs(item?.expDate).format('YYYY-MM-DD')}
          </Text>
        ) : (
          <Text className="font-poppinsMedium text-xs dark:text-dashboard_card_text">-</Text>
        ),
    },
  ];

  return (
    <ScrollView
      horizontal
      className="mt-4"
      showsHorizontalScrollIndicator={false}
      keyboardShouldPersistTaps="always">
      <DataTable style={{ borderRadius: 8, borderWidth: 0.3, borderColor: 'gray' }}>
        <DataTable.Header
          style={{
            backgroundColor: colorScheme === 'dark' ? '#4f6073' : '#F1F1F1',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}>
          {columns.map((col, index) => (
            <DataTable.Title key={index} style={{ width: col.width || width * 0.2 }}>
              {col.title}
            </DataTable.Title>
          ))}
        </DataTable.Header>

        {/* {item?.trades?.map((trade: any, rowIndex: any) => (
          <DataTable.Row key={rowIndex}>
            {columns.map((col, colIndex) => (
              <DataTable.Cell key={colIndex} style={{ width: col.width || width * 0.2 }}>
                {col.render(trade)}
              </DataTable.Cell>
            ))}
          </DataTable.Row>
        ))} */}
        <FlatList
          data={item?.trades}
          renderItem={({ item }) => (
            <DataTable.Row>
              {columns.map((col, colIndex) => (
                <DataTable.Cell key={colIndex} style={{ width: col.width || width * 0.2 }}>
                  {col.render(item)}
                </DataTable.Cell>
              ))}
            </DataTable.Row>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </DataTable>
    </ScrollView>
  );
};

export default TradeHistory;
