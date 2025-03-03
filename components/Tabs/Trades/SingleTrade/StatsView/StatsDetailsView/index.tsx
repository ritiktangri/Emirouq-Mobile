import { View, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { toCurrency } from '~/utils/helper.utils';
import { round } from 'lodash';
import { useAuth } from '~/context/AuthContext';
import { formatDateInTimeZone } from '~/utils/helper';
import dayjs from 'dayjs';
import Input from '~/components/UI/Input';
import { DefaultText as Text } from '~/components/common/DefaultText';

const StatsDetailsView = ({ data }: any) => {
  const { user } = useAuth();

  const renderColor: any = {
    long: '!text-green-600',
    short: '!text-red-600',
    call: '!text-green-600',
    put: '!text-red-600',
    default: 'dark:text-white',
    true: '!text-green-600',
    false: '!text-red-600',
  };
  const calculationMethod = [
    {
      label: 'FIFO',
      value: 'fifo',
    },
    {
      label: 'LIFO',
      value: 'lifo',
    },
    {
      label: 'Weighted Average',
      value: 'wa',
    },
  ];

  const openDate = formatDateInTimeZone({
    date: data?.openDate,
    tz: user?.timeZone,
  });
  const closeDate =
    data?.status === 'closed'
      ? formatDateInTimeZone({
          date: data?.closeDate,
          tz: user?.timeZone,
        })
      : { date: '-', time: '' };

  const sideValue =
    data?.tradeType === 'option' ? `${data?.side}(${data?.instrument})` : data?.side;

  const totalQuantity = data?.executions
    ?.filter((i: any) => (data?.side === 'long' ? i?.side === 'buy' : i?.side === 'sell'))
    ?.reduce((acc: any, curr: any) => acc + curr?.quantity, 0);

  const totalPositionSize = data?.executions
    ?.filter((i: any) => (data?.side === 'long' ? i?.side === 'buy' : i?.side === 'sell'))
    ?.reduce((acc: any, curr: any) => acc + curr?.[data?.calculationMethod]?.adjusted, 0);

  const organizedMapping = [
    {
      key: 'Side',
      value: sideValue || '--',
      visible: true,
      color: renderColor[data?.side?.toLowerCase() || 'default'],
    },
    {
      key: 'Average Entry Price',
      value: toCurrency(data?.avgEntryPrice),
      visible: true,
    },
    {
      key: 'Average Exit Price',
      value: toCurrency(data?.avgExitPrice),
      visible: true,
    },
    {
      key: 'Total Quantity',
      value: round(totalQuantity || 0, 4)?.toString(),
      visible: true,
    },
    {
      key: 'Total Position Size',
      value: toCurrency(Math.abs(totalPositionSize)),
      visible: true,
    },
    {
      key: 'Commissions & Fees',
      value: toCurrency(data?.totalCommission),
      visible: true,
    },

    {
      key: 'Gross P&L',
      value:
        data?.status === 'closed' ? toCurrency(data?.[data?.calculationMethod]?.grossPnl) : '--',
      visible: true,
    },
    {
      key: 'Net ROI',
      value: data?.[data?.calculationMethod]?.netRoi?.toFixed(2) + '%',
      visible: true,
    },

    {
      key: 'Open Date',
      value: openDate?.date,
      visible: true,
    },
    {
      key: 'Entry Time',
      value: openDate?.time,
      visible: true,
    },
    {
      key: 'Close Date',
      value: closeDate?.date,
      visible: true,
    },
    {
      key: 'Close Time',
      value: closeDate?.time,
      visible: true,
    },

    {
      key: 'Calculation Method',
      value: calculationMethod?.find((method) => method?.value === data?.calculationMethod)?.label,
      visible: true,
    },
    {
      key: 'Strike',
      value: toCurrency(data?.strike),
      visible: data?.tradeType === 'option',
    },
    {
      key: 'Exp Date',
      value: dayjs(data?.expDate).format('YYYY-MM-DD'),
      visible: data?.tradeType === 'option',
    },
    {
      key: 'Planned Profit Target',
      visible: true,
      cb: () => (
        <Input
          prefix={<Text className="dark:text-white">$</Text>}
          value={data?.profitTarget ? data?.profitTarget : ''}
          onChangeText={(e) => {}}
          placeholder="Profit Target"
          transparent={true}
          containerStyle={{ width: '60%', height: 36 }}
        />
      ),
    },
    {
      key: 'Planned Stop Loss',
      visible: true,
      cb: () => (
        <Input
          prefix={<Text className="dark:text-white">$</Text>}
          onChangeText={(e) => {}}
          placeholder="Stop Loss"
          transparent={true}
          containerStyle={{ width: '60%', height: 36 }}
        />
      ),
    },

    {
      key: 'Initial Target',
      value: data?.initialTarget ? toCurrency(data?.initialTarget) : '',
      visible: true,
      // loading: realizedMultipleLoading,
      color: data?.initialTarget ? renderColor[data?.initialTarget > 0 ? 'true' : 'false'] : '',
    },
    {
      key: 'Trade Risk',
      value: data?.tradeRisk ? toCurrency(data?.tradeRisk) : '',
      visible: true,
      // loading: realizedMultipleLoading,
      color: data?.tradeRisk ? renderColor[data?.tradeRisk > 0 ? 'true' : 'false'] : '',
    },
    {
      key: 'Planned R-Multiple',
      value: data?.plannedRMultiple ? `${data?.plannedRMultiple?.toFixed(2)}R` : '',
      visible: true,
      // loading: realizedMultipleLoading,
    },
    {
      key: 'Realized R-Multiple',
      value: data?.realizeRMultiple ? `${data?.realizeRMultiple?.toFixed(2)}R` : '',
      visible: true,
      // loading: realizedMultipleLoading,
    },
    {
      key: '',
      visible: true,
      cb: () => (
        <View className="col-span-2 flex w-full justify-end">
          <Text className="text-white">button</Text>
        </View>
      ),
    },
  ];

  const renderData = (data: any, idx: any) => {
    return (
      <View className="flex-row items-center justify-between p-2" key={idx}>
        <Text className="font-interMedium dark:text-[#BFBFBF]">{data?.key}</Text>
        {data?.key === 'Planned Profit Target' || data?.key === 'Planned Stop Loss' ? (
          <View className="flex-row justify-end">{data?.cb()}</View>
        ) : (
          <Text
            className={`${data?.key === 'Side' ? 'text-green-500' : 'dark:text-white'} font-interMedium`}>
            {data?.key === 'Side' ? data?.value?.toUpperCase() : data?.value || '--'}
          </Text>
        )}
      </View>
    );
  };
  return (
    <View>
      <View className="mt-4">
        {/* <FlatList
          onEndReachedThreshold={0.3}
          showsVerticalScrollIndicator={false}
          data={organizedMapping?.filter((data) => data?.visible)}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => {
            return renderData(item);
          }}
          initialNumToRender={6}
        /> */}
        {organizedMapping
          ?.filter((data) => data?.visible)
          ?.map((data, idx) => {
            return renderData(data, idx);
          })}
        <View className="flex-row justify-end">
          <TouchableOpacity className="rounded-lg bg-[#1F242F] px-4 py-3 text-center">
            <Text className="font-interMedium text-white dark:text-tertiary">Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default StatsDetailsView;
