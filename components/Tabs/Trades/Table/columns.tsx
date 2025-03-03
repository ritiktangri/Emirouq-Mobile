/* eslint-disable import/order */
import dayjs from 'dayjs';
import { round } from 'lodash';
import React from 'react';
import { View } from 'react-native';
import { DefaultText as Text } from '~/components/common/DefaultText';

import { formatDateInTimeZone } from '~/utils/helper';
import { cn, toCurrency } from '~/utils/helper.utils';
import theme from '~/utils/theme';
import Checkbox from 'expo-checkbox';

const colors = {
  open: 'purple-500',
  closed: 'amber-500',
  win: 'green-500',
  lose: 'red-500',
  breakEven: 'blue-500',
  true: 'green-500',
  false: 'red-500',
};

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

export const getColumns = ({ selectedItems, handleSelectItem, user }: any) => {
  return [
    {
      title: 'Select',
      dataIndex: 'select',
      render: (_: any, record: any) => (
        <MemoizedCheckbox
          status={selectedItems?.has(record.uuid)}
          onPress={() => handleSelectItem(record.uuid)}
        />
      ),
      width: 0.1,
    },

    {
      title: 'Account',
      dataIndex: 'accountId',
      render: (value: any) => {
        const accountName = user?.accounts.find((i: any) => i.uuid === value)?.accountName;
        return (
          <Text
            numberOfLines={1}
            className={cn(' font-poppinsMedium text-sm dark:text-dashboard_card_text')}>
            {accountName || '- -'}
          </Text>
        );
      },
      width: 0.2,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (value: any) => (
        <View
          className={`flex h-6 items-center justify-center  rounded-md border px-2 ${
            value === 'open' ? `border-purple-500` : `border-amber-500`
          }`}>
          <Text
            numberOfLines={1}
            className={`
               font-poppinsMedium text-sm capitalize
            ${value === 'open' ? `text-purple-500` : `text-amber-500`} text-sm`}>
            {value}
          </Text>
        </View>
      ),
      width: 0.2,
    },
    {
      title: 'Result',
      dataIndex: 'result',
      render: (value: any, record: any) => {
        const isBreakEven =
          record?.breakEven ||
          (record?.[record?.calculationMethod]?.netPnl === 0 && record?.status === 'closed');
        return (
          <View
            className={`flex  h-6 items-center  justify-center rounded-md border   ${
              isBreakEven
                ? `border-blue-500`
                : value === 'win'
                  ? `border-green-500`
                  : value === 'lose'
                    ? `border-red-500`
                    : 'border-0'
            }`}>
            <Text
              numberOfLines={1}
              className={`
                px-4 font-poppinsMedium text-sm 
                ${
                  isBreakEven
                    ? `uppercase text-blue-500`
                    : value === 'win'
                      ? `capitalize text-green-500`
                      : value === 'lose'
                        ? `capitalize text-red-500`
                        : 'capitalize text-dashboard_card_text'
                }`}>
              {isBreakEven ? 'BE' : value || '--'}
            </Text>
          </View>
        );
      },
      width: 0.2,
    },
    {
      title: 'Type',
      dataIndex: 'tradeType',
      render: (value: any) => (
        <Text numberOfLines={1} className={cn(' text-sm uppercase dark:text-dashboard_card_text')}>
          {value}
        </Text>
      ),
      width: 0.2,
    },
    {
      title: 'Symbol',
      dataIndex: 'symbol',
      render: (value: any, record: any) => (
        <Text numberOfLines={1} className={cn(' text-sm uppercase dark:text-dashboard_card_text')}>
          {record?.underlyingSymbol || record?.symbol}
        </Text>
      ),
      width: 0.2,
    },
    {
      title: 'Open Date',
      dataIndex: 'openDate',
      render: (value: any) => {
        const response = formatDateInTimeZone({ date: value, tz: user?.timeZone });
        return (
          <View>
            <Text numberOfLines={1} className={cn(' text-sm  dark:text-dashboard_card_text')}>
              {response?.date}
            </Text>
            <Text numberOfLines={1} className={cn(' text-sm dark:text-dashboard_card_text')}>
              {response?.time}
            </Text>
          </View>
        );
      },
      width: 0.2,
    },
    {
      title: 'Close Date',
      dataIndex: 'closeDate',
      render: (value: any, record: any) => {
        const response = formatDateInTimeZone({ date: value, tz: user?.timeZone });
        return (
          <View>
            {record?.status === 'closed' ? (
              <View>
                <Text numberOfLines={1} className="text-sm dark:text-dashboard_card_text">
                  {response?.date}
                </Text>
                <Text numberOfLines={1} className="text-sm dark:text-dashboard_card_text">
                  {response?.time}
                </Text>
              </View>
            ) : (
              <Text numberOfLines={1} className={cn('text-sm  dark:text-dashboard_card_text')}>
                --
              </Text>
            )}
          </View>
        );
      },
      width: 0.2,
    },
    {
      title: 'Avg Entry, $',
      dataIndex: 'avgEntryPrice',
      render: (value: any) => (
        <Text numberOfLines={1} className="text-sm dark:text-dashboard_card_text">
          {toCurrency(round(value, 4) || 0)}
        </Text>
      ),
      width: 0.2,
    },
    {
      title: 'Avg Exit, $',
      dataIndex: 'avgExitPrice',
      render: (value: any) => (
        <Text numberOfLines={1} className="text-sm dark:text-dashboard_card_text">
          {toCurrency(round(value, 4) || 0)}
        </Text>
      ),
      width: 0.2,
    },
    {
      title: 'Net P&L',
      dataIndex: 'netPnl',
      render: (value: any, record: any) => {
        const netPnl = record?.[record?.calculationMethod]?.netPnl;
        const isClosed = record?.status === 'closed';
        const isPositive = netPnl > 0;
        const isZero = netPnl === 0 && isClosed;
        return (
          <View className="flex flex-col items-center">
            {record?.status === 'open' && (
              <Text numberOfLines={1} className="text-sm text-purple-500">
                (open)
              </Text>
            )}
            <Text
              numberOfLines={1}
              className={`font-poppinsMedium text-sm font-medium ${
                isZero ? 'text-blue-500' : isPositive ? 'text-green-500' : 'text-red-500'
              }`}>
              {toCurrency(netPnl || 0)}
            </Text>
          </View>
        );
      },
      width: 0.2,
    },
    // {
    //   title: 'Net ROI',
    //   dataIndex: 'netRoi',
    //   render: (value: any, record: any) => {
    //     const netRoi = record?.[record?.calculationMethod]?.netRoi;
    //     const isPositive = round(netRoi, 2) > 0;
    //     return (
    //       <Text numberOfLines={1}
    //         className={`text-sm font-medium text-dashboard_card_text ${
    //           isPositive ? 'text-green-500' : 'text-red-500'
    //         }`}>
    //         {round(netRoi, 2)}%
    //       </Text>
    //     );
    //   },
    //   width: 0.2,
    // },
    // {
    //   title: 'Exec',
    //   dataIndex: 'executions',
    //   render: (value: any) => (
    //     <Text numberOfLines={1} className="text-sm text-dashboard_card_text">{value?.length || '- -'}</Text>
    //   ),
    //   width: 0.2,
    // },
    {
      title: 'Comm, $',
      dataIndex: 'totalCommission',
      render: (value: any) => (
        <Text numberOfLines={1} className={cn(' text-sm uppercase dark:text-dashboard_card_text')}>
          {toCurrency(value || 0)}
        </Text>
      ),
      width: 0.2,
    },
    {
      title: 'Strike',
      dataIndex: 'strike',
      render: (value: any) => (
        <Text numberOfLines={1} className={cn(' text-sm uppercase dark:text-dashboard_card_text')}>
          {value ? toCurrency(value) : '- -'}
        </Text>
      ),
      width: 0.2,
    },

    {
      title: 'Instrument',
      dataIndex: 'instrument',
      render: (value: any) => (
        <Text
          numberOfLines={1}
          className={`$} text-sm font-medium uppercase dark:text-dashboard_card_text  ${
            value === 'call' ? 'text-green-500' : value === 'put' ? 'text-red-500' : ''
          }`}>
          {value || '- -'}
        </Text>
      ),
      width: 0.2,
    },
    {
      title: 'Exp Date',
      dataIndex: 'expDate',
      render: (value: any) => (
        <Text numberOfLines={1} className={cn(' text-sm uppercase dark:text-dashboard_card_text')}>
          {value ? dayjs(value).format('YYYY-MM-DD') : '- -'}
        </Text>
      ),
      width: 0.2,
    },
    {
      title: 'Multiplier',
      dataIndex: 'contractMultiplier',
      render: (value: any) => (
        <Text numberOfLines={1} className={cn(' text-sm uppercase dark:text-dashboard_card_text')}>
          {value ? toCurrency(value) : '- -'}
        </Text>
      ),
      width: 0.245,
    },
  ];
};
