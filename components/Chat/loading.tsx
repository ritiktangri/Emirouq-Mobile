/* eslint-disable import/order */
import React from 'react';
import { View } from 'react-native';
import SkeletonLoading from 'expo-skeleton-loading';
import { FontAwesome } from '@expo/vector-icons';

const Loading = () => {
  const renderSkeletonItem = () => (
    <SkeletonLoading background="#adadad" highlight="#ffffff">
      <View className="flex flex-row items-center border-b border-gray-300 py-4">
        <View className="mr-4 h-16 w-16 rounded-full">
          {/* Skeleton Circle */}
          <View className="h-full w-full rounded-full bg-gray-100/50" />
        </View>
        <View className="flex-1">
          <View className="mb-1 h-4 w-32 rounded-md bg-gray-100/50" />
          <View className="mb-1 h-4 w-48 rounded-md bg-gray-100/50" />
          <View className="h-4 w-24 rounded-md bg-gray-100/50" />
        </View>
        <View>
          <FontAwesome name="chevron-right" size={20} color="gray" />
        </View>
      </View>
    </SkeletonLoading>
  );

  return (
    <View className="flex-1 bg-white ">
      {/* List */}
      <View className="flex-1 px-4">
        {Array(8)
          .fill(null)
          .map((_, index) => (
            <React.Fragment key={index}>{renderSkeletonItem()}</React.Fragment>
          ))}
      </View>
    </View>
  );
};

export default Loading;
