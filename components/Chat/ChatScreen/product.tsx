/* eslint-disable import/order */
import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Image from '~/components/common/Image';
import { toCurrency } from '~/utils/helper';
import { Ionicons } from '@expo/vector-icons';
import { Href, useRouter } from 'expo-router';
import { routes } from '~/utils/routes';

const Product = ({ product }: any) => {
  const router = useRouter();
  return (
    <View className="flex flex-row items-center gap-4 border-b border-b-gray-700 px-4 py-2">
      <View className=" h-12 w-12 rounded-full  ">
        <Image
          source={{ uri: product?.file }}
          className="h-full w-full rounded-full"
          resizeMode="cover"
        />
      </View>
      <View className="flex-1">
        <Text className="text-lg font-medium">{product?.name}</Text>
        <Text className="font-poppinsSemiBold text-xl text-black">
          {toCurrency(product?.price)}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: routes.tabs.singlePost(product?.uuid),
            params: {
              title: `${product?.title}`,
              removeChatButton: 'true',
            },
          } as Href)
        }
        className="flex flex-row items-center gap-2">
        <Text className="font-poppinsMedium text-primary">View Details</Text>
        <Ionicons name="chevron-forward" size={20} className="!text-primary" />
      </TouchableOpacity>
    </View>
  );
};

export default Product;
