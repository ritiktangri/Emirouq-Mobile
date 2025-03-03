/* eslint-disable import/order */
// eslint-disable-next-line import/order
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Input from '../UI/Input';
import { DefaultText as Text } from '~/components/common/DefaultText';
import { useTheme } from '~/context/ThemeContext';
import { cn } from '~/utils/helper.utils';

const Header = ({ isSearch, title, setSearch, onClose }: any) => {
  return (
    <View>
      <View className="flex-row items-center justify-between px-5 py-2">
        <Text className={cn('text-xl font-bold dark:text-white')}>{title}</Text>
        <TouchableOpacity onPress={onClose} className="p-2">
          <Ionicons name="close" size={20} className="!text-black dark:!text-white" />
        </TouchableOpacity>
      </View>
      <View className="my-2 border-b border-gray-600" />
      {isSearch ? (
        <Input
          placeholder="Search timezone"
          transparent
          containerStyle={{
            marginHorizontal: 12,
          }}
          onChangeText={setSearch}
        />
      ) : null}
    </View>
  );
};

export default Header;
