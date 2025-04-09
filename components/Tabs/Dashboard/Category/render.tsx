import { View, Text, Image } from 'react-native';
import React from 'react';

const Render = ({ item }: any) => {
  return (
    <View className="m-2 flex-1 rounded-lg bg-white shadow-md">
      <View className="flex-1">
        <Text className="text-center text-lg font-bold text-black">{item?.title}</Text>
      </View>
      <View className="flex-1">
        <Image
          source={{ uri: item?.logo }}
          className="h-full w-full rounded-t-lg"
          resizeMode="cover"
        />
      </View>
    </View>
  );
};

export default Render;
