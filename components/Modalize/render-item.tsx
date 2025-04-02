/* eslint-disable import/order */
import { View, TouchableOpacity, useColorScheme } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '~/components/common/Text';
import { useTheme } from '~/context/ThemeContext';
import { cn } from '~/utils/helper';

export default function RenderItem({ item, expandedId, toggleSection, handleSelect }: any) {
  return (
    <View className={cn('px-5 dark:bg-drawer')} key={item.id}>
      <TouchableOpacity
        className="my-2 flex-row items-center "
        onPress={() => toggleSection(item.id)}>
        <View className="flex-1 flex-row items-center gap-5 ">
          <Text className={cn('text-base dark:text-white')}>{item.heading}</Text>
          {item?.selectedValue ? (
            <Text className="font-poppinsMedium text-sm  text-primary">({item.selectedValue})</Text>
          ) : (
            <></>
          )}
        </View>
        {item?.selectedValue ? (
          <TouchableOpacity onPress={() => handleSelect(item?.key, '')} className="mr-4">
            <Text className={cn('font-poppinsMedium text-sm dark:text-dashboard_card_text ')}>
              Clear
            </Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
        {item?.heading ? (
          <Ionicons
            name={expandedId === item.id ? 'chevron-up' : 'chevron-down'}
            size={20}
            className="dark:!text-white"
          />
        ) : (
          <></>
        )}
      </TouchableOpacity>
      {expandedId === item.id &&
        item?.data?.map((subItem: any) => (
          <View key={subItem.id} className="ml-4">
            <TouchableOpacity
              className={`flex-row justify-between rounded-lg p-3 font-poppinsMedium ${
                item.selectedValue === subItem.value ? 'bg-gray-200 dark:bg-[#131B24]' : ''
              }`}
              onPress={() => handleSelect(item?.key, subItem.value)}>
              <Text className={cn('font-poppinsMedium text-sm dark:text-white')}>
                {subItem.label}
              </Text>
              {item.selectedValue === subItem.value && (
                <Ionicons
                  name="checkmark"
                  size={20}
                  className="!text-primary dark:!text-[#3498db]"
                />
              )}
            </TouchableOpacity>
          </View>
        ))}

      <View className="my-2 border-b border-gray-600" />
    </View>
  );
}
