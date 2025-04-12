import { View, Text, Image } from 'react-native';
import React from 'react';

const Render = ({ item }: any) => {
  return (
    <View className="items-center justify-center gap-y-2">
      <View className="h-16 w-16 items-center justify-center rounded-full bg-blue-50">
        <Image
          source={{ uri: item?.logo }}
          style={{ width: 28, height: 28, borderRadius: 14 }}
          resizeMode="contain"
        />
      </View>
      <Text className="text-sm font-normal text-gray-700">{item?.title}</Text>
    </View>
  );
};

export default Render;
