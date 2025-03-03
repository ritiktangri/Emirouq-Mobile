import { View } from 'react-native';

import { DefaultText as Text } from '~/components/common/DefaultText';
import { width } from '~/constants/Colors';
import { toCurrency } from '~/utils/helper.utils';
import Slider from '../Slider';

const color = {
  true: 'text-green-500',
  false: 'text-red-500',
  breakEven: 'text-blue-400',
};
const getColumns = ({ type, label }: any) => [
  {
    title: label,
    width: width * 0.2,
    render: (item: any) => (
      <View className="flex-row items-center gap-1">
        <Text className="text-xs text-white">{item?.[type]}</Text>
      </View>
    ),
  },
  {
    title: 'Net Profits',
    width: width * 0.2,
    render: (item: any) => (
      <Text
        className={`text-xs ${color[item?.pnl === 0 ? 'breakEven' : item?.pnl > 0 ? 'true' : 'false']}`}>
        {toCurrency(item?.pnl)}
      </Text>
    ),
  },
  {
    title: 'Winning %',
    width: width * 0.2,
    render: (item: any) => (
      <Text className="text-xs text-white">
        <Slider />
      </Text>
    ),
  },
  {
    title: 'Total Profit',
    width: width * 0.2,
    render: (item: any) => (
      <Text className={`text-xs ${color[!!item?.totalProfit === false ? 'breakEven' : 'true']}`}>
        {toCurrency(item?.totalProfit || 0)}
      </Text>
    ),
  },
  {
    title: 'Total Loss',
    width: width * 0.2,
    render: (item: any) => (
      <Text className={`text-xs ${color[!!item?.totalLoss === false ? 'breakEven' : 'false']}`}>
        {toCurrency(item?.totalLoss || 0)}
      </Text>
    ),
  },
  {
    title: 'Winning Trades',
    width: width * 0.2,
    render: (item: any) => (
      <Text className="text-xs text-white">{item?.totalWinningTrade || '--'}</Text>
    ),
  },
  {
    title: 'Losing Trades',
    width: width * 0.2,
    render: (item: any) => (
      <Text className="text-xs text-white">{item?.totalLoosingTrade || '--'}</Text>
    ),
  },
  {
    title: 'Avg Position Size',
    width: width * 0.2,
    render: (item: any) => (
      <Text className="text-xs text-white">
        {item?.avgPositionSize ? toCurrency(item?.avgPositionSize) : '--'}
      </Text>
    ),
  },
];

export default getColumns;
