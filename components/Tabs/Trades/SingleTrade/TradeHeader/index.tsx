import { View, TouchableOpacity } from 'react-native';
import React from 'react';
import { capitalizeFirstLetter } from '~/utils/helper';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import { DefaultText as Text } from '~/components/common/DefaultText';
import dayjs from 'dayjs';
import { useTheme } from '~/context/ThemeContext';
import { cn } from '~/utils/helper.utils';

const TradeHeader = ({ data, open, setOpen }: any) => {
  return (
    <View className={cn('bg-white pb-4 pt-6 dark:bg-[#131B24]')}>
      <View className="flex-row items-center justify-between px-4">
        <Text className={cn('font-interMedium text-gray-500 dark:text-gray-400')}>
          {dayjs(data?.formatDate).format('DD-MM-YYYY')}
        </Text>
        <View
          className={`rounded-full ${data?.status === 'open' ? 'bg-[#053321] ' : 'bg-[#D92D202E] '}  px-2 py-[0.5]`}>
          <Text
            className={`text-sm ${data?.status == 'open' ? 'text-[#75E0A7]' : 'text-[#F96C62]'} `}>
            {capitalizeFirstLetter(data?.status)}
          </Text>
        </View>
      </View>
      <Text className={cn('mt-3 px-4 font-interMedium text-2xl dark:text-white')}>
        {data?.underlyingSymbol}
      </Text>
      <TouchableOpacity
        className={cn(
          'mt-2 flex-row items-center justify-between border-t border-gray-300  px-4 pt-3 dark:border-[#1F242F]'
        )}
        onPress={() => {
          setOpen(!open);
        }}>
        <View className="flex-row items-center gap-2">
          <FontAwesome5 name="chart-bar" size={20} className="dark:!text-[#B1B0B0]" />
          <Text className="font-interMedium dark:text-[#B1B0B0]">View Chart</Text>
        </View>
        <Entypo
          name={open ? 'chevron-up' : 'chevron-down'}
          size={20}
          className="dark:!text-[#B1B0B0]"
        />
      </TouchableOpacity>
    </View>
  );
};

export default TradeHeader;
