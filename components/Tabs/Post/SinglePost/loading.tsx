import React from 'react';
import { View } from 'react-native';
import SkeletonLoading from 'expo-skeleton-loading';

const Loading = () => {
  return (
    <View className="flex-1 bg-white px-4">
      {/* Top Area */}
      <SkeletonLoading background="#d3d3d3" highlight="#e0e0e0">
        <View className="mb-4 h-40 w-full rounded-lg bg-gray-200" />
      </SkeletonLoading>

      {/* Image boxes */}
      <View className="mb-4 flex flex-row gap-2 space-x-2">
        <SkeletonLoading background="#d3d3d3" highlight="#e0e0e0">
          <View className="h-20 w-24 rounded-lg bg-gray-200" />
        </SkeletonLoading>
        <SkeletonLoading background="#d3d3d3" highlight="#e0e0e0">
          <View className="h-20 w-24 rounded-lg bg-gray-200" />
        </SkeletonLoading>
      </View>

      <SkeletonLoading background="#d3d3d3" highlight="#e0e0e0">
        <View className="mb-4 h-6 w-full rounded-lg bg-gray-200" />
      </SkeletonLoading>
      <SkeletonLoading background="#d3d3d3" highlight="#e0e0e0">
        <View className="mb-4 h-6 w-full rounded-lg bg-gray-200" />
      </SkeletonLoading>
      <SkeletonLoading background="#d3d3d3" highlight="#e0e0e0">
        <View className="mb-4 h-6 w-full rounded-lg bg-gray-200" />
      </SkeletonLoading>

      {/* Square Area with faded side*/}
      <View className="mb-4 flex flex-row items-center">
        <SkeletonLoading background="#d3d3d3" highlight="#e0e0e0">
          <View className="mr-2 h-16 w-16 rounded-lg bg-gray-200" />
        </SkeletonLoading>
        <SkeletonLoading background="#d3d3d3" highlight="#e0e0e0">
          <View className="mr-2 h-16 w-16 rounded-lg bg-gray-200" />
        </SkeletonLoading>
      </View>

      {/* Third Line */}
      <SkeletonLoading background="#d3d3d3" highlight="#e0e0e0">
        <View className="mb-2 h-6 w-full rounded-lg bg-gray-200" />
      </SkeletonLoading>

      {/* Fourth Line */}
      <SkeletonLoading background="#d3d3d3" highlight="#e0e0e0">
        <View className="mb-4 h-6 w-full rounded-lg bg-gray-200" />
      </SkeletonLoading>

      <SkeletonLoading background="#d3d3d3" highlight="#e0e0e0">
        <View className="mb-4 h-6 w-full rounded-lg bg-gray-200" />
      </SkeletonLoading>
      <View className="mb-4 flex flex-row gap-2 space-x-2">
        <SkeletonLoading background="#d3d3d3" highlight="#e0e0e0">
          <View className="h-20 w-24 rounded-lg bg-gray-200" />
        </SkeletonLoading>
        <SkeletonLoading background="#d3d3d3" highlight="#e0e0e0">
          <View className="h-20 w-24 rounded-lg bg-gray-200" />
        </SkeletonLoading>
        <SkeletonLoading background="#d3d3d3" highlight="#e0e0e0">
          <View className="h-20 w-24 rounded-lg bg-gray-200" />
        </SkeletonLoading>
      </View>
      <SkeletonLoading background="#d3d3d3" highlight="#e0e0e0">
        <View className="mb-4 h-6 w-full rounded-lg bg-gray-200" />
      </SkeletonLoading>
      <SkeletonLoading background="#d3d3d3" highlight="#e0e0e0">
        <View className="mb-4 h-6 w-full rounded-lg bg-gray-200" />
      </SkeletonLoading>
      <SkeletonLoading background="#d3d3d3" highlight="#e0e0e0">
        <View className="mb-4 h-6 w-full rounded-lg bg-gray-200" />
      </SkeletonLoading>
      <View className="mb-4 flex flex-row items-center">
        <SkeletonLoading background="#d3d3d3" highlight="#e0e0e0">
          <View className="mr-2 h-16 w-16 rounded-lg bg-gray-200" />
        </SkeletonLoading>
        <SkeletonLoading background="#d3d3d3" highlight="#e0e0e0">
          <View className="mr-2 h-16 w-16 rounded-lg bg-gray-200" />
        </SkeletonLoading>
      </View>
    </View>
  );
};

export default Loading;
