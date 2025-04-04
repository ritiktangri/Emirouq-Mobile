/* eslint-disable import/order */
import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Image from '~/components/common/Image';
import { toCurrency } from '~/utils/helper';
import { Ionicons } from '@expo/vector-icons';

const Product = ({ data }: any) => {
  return (
    <View className="flex flex-row items-center gap-4 border-b border-b-gray-700 px-4 py-2">
      <View className="h-16 w-16 overflow-hidden rounded-full">
        <Image source={data?.productImage} contentFit="fill" />
      </View>
      <View className="flex-1">
        <Text className="text-lg font-medium">{data?.product}</Text>
        <Text className="font-poppinsSemiBold text-xl text-black">{toCurrency(data?.price)}</Text>
      </View>
      <TouchableOpacity className="flex flex-row items-center gap-2">
        <Text className="font-poppinsMedium text-primary">View Details</Text>
        <Ionicons name="chevron-forward" size={20} className="!text-primary" />
      </TouchableOpacity>
    </View>
  );
};

export default Product;
