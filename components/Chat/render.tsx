/* eslint-disable import/order */
import { TouchableOpacity } from 'react-native';
import React from 'react';
import { toCurrency } from '~/utils/helper';
import { View } from '../common/View';
import { Text } from '../common/Text';
import { Ionicons } from '@expo/vector-icons';
import { Href, useRouter } from 'expo-router';
import { routes } from '~/utils/routes';
import Image from '../common/Image';

const Render = ({ item }: any) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => {
        router.push({
          pathname: routes.chatScreen,
          params: { ...item },
        } as Href);
      }}
      className="flex-row items-center gap-2 border-b border-gray-200 px-4 py-4">
      <View className=" h-16 w-16 rounded-full bg-black">
        <Image expoImage source={item?.avatar} contentFit="fill" />
      </View>
      <View className="flex-1">
        <View className="flex-row items-center justify-between">
          <Text className="font-poppinsMedium text-lg">{item?.name}</Text>
          <Text className="text-sm text-gray-500">{item?.time}</Text>
        </View>
        <View className="mx-5 flex-row items-center gap-2">
          <View className=" h-16 w-16 rounded-full  ">
            <Image expoImage source={item?.productImage} contentFit="fill" />
          </View>

          <View>
            <Text className="text-base">{item?.product}</Text>
            <Text className="font-poppinsMedium text-base text-gray-700">
              {toCurrency(item?.price)}
            </Text>
          </View>
        </View>
        <View direction="row" className="mt-1">
          <Text className="flex-1 text-base text-gray-600">{item?.message}</Text>
          {item?.unread_count && (
            <View className=" flex h-5 w-5 items-center  rounded-full bg-red-500">
              <Text className="text-xs font-bold text-white">{item?.unread_count}</Text>
            </View>
          )}
        </View>
      </View>
      <Ionicons name="chevron-forward" size={24} color="gray" className="ml-4" />
    </TouchableOpacity>
  );
};

export default Render;
