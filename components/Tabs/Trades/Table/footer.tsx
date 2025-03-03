/* eslint-disable import/order */
import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { cn } from '~/utils/helper.utils';
import { Ionicons } from '@expo/vector-icons';
import { useTrade } from '~/context/TradeContext';
import { useTheme } from '~/context/ThemeContext';

const Footer = () => {
  const { currentPage, setCurrentPage, total, getTradesList }: any = useTrade();
  return (
    <View
      className={cn(
        ' mx-2 mb-2 flex flex-row items-center gap-2  rounded-md  bg-white px-4 py-4 dark:bg-drawer'
      )}
      style={{}}>
      <TouchableOpacity
        onPress={() => {}}
        className={cn('rounded-md bg-gray-400 p-1 dark:bg-gray-600')}>
        <Ionicons name="download-outline" size={24} color={'white'} />
      </TouchableOpacity>
      <View className="flex flex-1 flex-row items-center justify-between gap-2">
        <TouchableOpacity
          disabled={currentPage === 1}
          onPress={() => {
            const page = currentPage - 1;
            setCurrentPage(page);
            const start = 10 * page;
            getTradesList(null, 10, start, '', false);
          }}
          className={cn(
            currentPage === 0 ? 'opacity-50' : '',
            'rounded-md border-[0.4px] dark:border-0 ',
            'bg-gray-400 p-1 dark:bg-gray-600'
          )}>
          <Ionicons name="chevron-back" size={24} color={'white'} />
        </TouchableOpacity>
        <Text className={cn('font-poppinsMedium text-base text-black dark:text-white')}>
          Showing {currentPage} of {Math.ceil(total || 1 / 10)} pages
        </Text>
        <TouchableOpacity
          disabled={currentPage + 1 >= Math.ceil(total / 10)}
          onPress={() => {
            const page = currentPage + 1;
            setCurrentPage(page);
            const start = 10 * page;
            getTradesList(null, 10, start, '', false);
          }}
          className={cn(
            currentPage + 1 >= Math.ceil(total / 10) ? 'opacity-50' : '',
            'rounded-md border-[0.4px] border-gray-400  bg-gray-400 p-1 dark:border-0  dark:bg-gray-600'
          )}>
          <Ionicons name="chevron-forward" size={24} color={'white'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Footer;
