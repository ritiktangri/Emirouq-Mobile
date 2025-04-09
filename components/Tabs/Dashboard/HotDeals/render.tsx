import { View, Text, Image } from 'react-native';
import React from 'react';

const Render = ({ item }: any) => {
  return (
    <View className="m-2 w-[300px] flex-1 rounded-lg bg-white shadow-md">
      <View className="flex-row items-center justify-between p-2">
        <Text className="text-lg font-bold">{item?.title}</Text>
        <Text className="text-sm text-gray-500">{item?.price}</Text>
      </View>
      <View className="flex-row items-center justify-between p-2">
        <Image
          source={{ uri: item?.category?.logo }}
          className="h-8 w-8 rounded-full"
          resizeMode="cover"
        />
        <Text className="text-sm text-gray-500">{item?.location}</Text>
      </View>
      <View className="p-2">
        <Text className="text-sm text-gray-500">{item?.description}</Text>
      </View>
    </View>
  );
};

export default Render;
