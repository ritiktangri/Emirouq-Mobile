/* eslint-disable import/order */
import { View, TouchableOpacity } from 'react-native';
import React from 'react';
import { FontAwesome6 } from '@expo/vector-icons';
import CustomHeader from '~/components/UI/CustomHeader';
import { DefaultText as Text } from '~/components/common/DefaultText';
const Header = ({ onPress }: any) => {
  return (
    <View className="flex-1 gap-y-4">
      <CustomHeader />
      <Text className="font-poppinsSemiBold text-2xl dark:text-white">Categories Management</Text>
      <Text className=" font-poppinsMedium text-sm leading-normal text-tertiary">
        You can create a category which can be assigned tags
      </Text>
      <View className="flex-row">
        <TouchableOpacity
          className="flex-row items-center justify-center gap-x-1 rounded-md bg-primary px-4 py-2"
          onPress={onPress}>
          <FontAwesome6 name="add" size={20} color="white" />
          <Text className="text-center font-poppinsSemiBold text-white">Create Category</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
