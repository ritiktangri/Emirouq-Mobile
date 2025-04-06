import React from 'react';
import { View, Text } from 'react-native';
import SkeletonLoading from 'expo-skeleton-loading';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const Loading = () => {
  return (
    <SkeletonLoading background="#adadad" highlight="#ffffff">
      <View className="mb-4 rounded-lg border-b-[0.5px] border-gray-100 py-2">
        <View className="flex-row  gap-4">
          {/* Image Skeleton */}
          <View className=" h-[80px] w-[80px]">
            <View className=" h-24 w-24 rounded-lg bg-gray-100/50" />
          </View>

          <View className="flex-1">
            {/* Title Skeleton */}
            <View className="mb-2 h-4 w-48 rounded-md bg-gray-100/50" />
            {/* Category and Location Skeleton */}
            <View className="mb-2 h-3 w-32 rounded-md bg-gray-100/50" />
            {/* Status Skeleton */}
            <View className="mb-2 h-6 w-16 rounded-full bg-gray-100/50" />

            {/* Icons and Time Skeleton */}
            <View className="mt-2 flex-row items-center">
              <Ionicons name="eye-outline" size={16} color="gray" />
              <View className="ml-1 h-3 w-8 rounded-md bg-gray-100/50" />
              <MaterialIcons name="access-time" size={16} color="gray" className="ml-4" />
              <View className="ml-1 h-3 w-16 rounded-md bg-gray-100/50" />
            </View>
          </View>
        </View>

        {/* Edit/Delete Buttons Skeleton */}
        <View className="mt-4 flex-row justify-end">
          <View className="mr-2 h-8 w-20 rounded-lg border border-primary bg-gray-100/50 px-4 py-2" />
          <View className="h-8 w-20 rounded-lg border border-red-500 bg-gray-100/50 px-4 py-2" />
        </View>
      </View>
    </SkeletonLoading>
  );
};

export default Loading;
