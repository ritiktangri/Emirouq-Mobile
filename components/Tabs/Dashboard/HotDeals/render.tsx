import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';
import { Href, useRouter } from 'expo-router';
import { routes } from '~/utils/routes';

const Render = ({ item }: any) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      className="mr-4 w-72 overflow-hidden rounded-2xl border-[0.4px] border-gray-300 bg-white p-0 shadow-sm shadow-slate-50"
      onPress={() => {
        router.push({
          pathname: routes.tabs.singlePost(item?.uuid),
          params: {
            title: `${item?.title}`,
          },
        } as Href);
      }}>
      <Image source={{ uri: item?.file?.[0] }} className="h-44 w-full" resizeMode="cover" />
      <View className="p-4">
        <Text className="mb-1 text-lg font-semibold text-gray-900">{item?.title}</Text>
        <View className="mb-2 flex-row items-center space-x-2">
          <Text className="text-lg font-bold text-red-500">${Number(item?.price) - 10}</Text>
          <Text className="text-base text-gray-400 line-through">${item?.price || 0}</Text>
          <View className="rounded-md bg-red-100 px-2 py-0.5">
            <Text className="text-xs font-semibold text-red-500">- 12%</Text>
          </View>
        </View>
        <View className="flex-row items-center">
          <Feather name="clock" size={16} color="#6b7280" />
          <Text className="ml-1 text-sm text-gray-500">Ends in 2d</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Render;
