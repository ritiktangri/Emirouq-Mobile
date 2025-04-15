import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { Href, useRouter } from 'expo-router';
import { routes } from '~/utils/routes';

const Render = ({ item }: any) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      className="mb-4 w-[48%] overflow-hidden rounded-2xl border-[0.4px] border-gray-300 bg-white shadow-sm shadow-slate-50"
      onPress={() => {
        router.push({
          pathname: routes.tabs.singlePost(item?.uuid),
          params: {
            title: `${item?.title}`,
          },
        } as Href);
      }}>
      <View className="overflow-hidden rounded-t-2xl">
        <Image source={{ uri: item?.file?.[0] }} className="h-40 w-full" resizeMode="cover" />
      </View>
      <View className="p-3">
        <View className="mb-1 flex-row items-center justify-between">
          <Text className="text-md w-[75%] font-semibold text-gray-900" numberOfLines={1}>
            {item?.title}
          </Text>
        </View>
        <Text className="mb-2 text-sm font-bold text-orange-500">${item?.price || 0}</Text>

        <View className="flex-row items-center">
          <Entypo name="location-pin" size={14} color="#6b7280" />
          <Text className="ml-1 text-xs text-gray-500" numberOfLines={1}>
            {item?.location || 'N/A'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Render;
