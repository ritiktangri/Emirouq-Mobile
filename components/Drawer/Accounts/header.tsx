/* eslint-disable import/order */
import { View, TouchableOpacity } from 'react-native';
import React from 'react';
import { FontAwesome6 } from '@expo/vector-icons';

import CustomHeader from '~/components/UI/CustomHeader';
import { useAuth } from '~/context/AuthContext';
import { cn } from '~/utils/helper.utils';
import { DefaultText as Text } from '~/components/common/DefaultText';
const Header = ({ onPress }: any) => {
  const { activeAccount } = useAuth();

  return (
    <View className="flex-1 gap-y-4">
      <CustomHeader />
      <Text className="font-poppinsSemiBold text-3xl dark:text-white">Accounts</Text>
      <Text className=" font-poppinsMedium leading-normal text-tertiary">
        You can have upto 10 active accounts
      </Text>
      <View className="flex-row">
        <TouchableOpacity
          disabled={activeAccount?.accounts?.length >= 10}
          className={cn(
            activeAccount?.accounts?.length < 10 ? 'bg-primary' : 'bg-gray-500',
            'flex-row items-center justify-center gap-x-1 rounded-md  px-4 py-2'
          )}
          onPress={onPress}>
          <FontAwesome6 name="add" size={20} color="white" />
          <Text className="text-center font-poppinsSemiBold text-white">Add Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
