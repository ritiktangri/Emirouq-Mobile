import React from 'react';
import { View, ScrollView } from 'react-native';
import SkeletonLoading from 'expo-skeleton-loading';

const AddPostLoading = () => {
  return (
    <ScrollView className="flex-1 bg-white px-4 pt-4" showsVerticalScrollIndicator={false}>
      {/* Image Upload Area */}
      <View className="mb-4">
        <SkeletonLoading background="#d3d3d3" highlight="#e0e0e0">
          <View className="h-40 w-full rounded-2xl bg-gray-200" />
        </SkeletonLoading>
      </View>

      {/* Thumbnails */}
      <View className="mb-6 flex-row gap-3">
        <SkeletonLoading background="#d3d3d3" highlight="#e0e0e0">
          <View className="h-20 w-20 rounded-xl bg-gray-200" />
        </SkeletonLoading>
        <SkeletonLoading background="#d3d3d3" highlight="#e0e0e0">
          <View className="h-20 w-20 rounded-xl bg-gray-200" />
        </SkeletonLoading>
      </View>

      {/* Title */}
      <View className="mb-4">
        <SkeletonLoading background="#d3d3d3" highlight="#e0e0e0">
          <View>
            <View className="mb-2 h-4 w-20 rounded bg-gray-200" />
            <View className="h-14 w-full rounded-lg bg-gray-200" />
          </View>
        </SkeletonLoading>
      </View>

      {/* Category */}
      <View className="mb-4">
        <SkeletonLoading background="#d3d3d3" highlight="#e0e0e0">
          <View>
            <View className="mb-2 h-4 w-24 rounded bg-gray-200" />
            <View className="h-14 w-full rounded-lg bg-gray-200" />
          </View>
        </SkeletonLoading>
      </View>

      {/* Sub Category */}
      <View className="mb-4">
        <SkeletonLoading background="#d3d3d3" highlight="#e0e0e0">
          <View>
            <View className="mb-2 h-4 w-28 rounded bg-gray-200" />
            <View className="h-14 w-full rounded-lg bg-gray-200" />
          </View>
        </SkeletonLoading>
      </View>

      {/* Condition (Segmented) */}
      <View className="mb-4">
        <SkeletonLoading background="#d3d3d3" highlight="#e0e0e0">
          <View>
            <View className="mb-2 h-4 w-24 rounded bg-gray-200" />
            <View className="flex-row gap-4">
              <View className="h-12 flex-1 rounded-lg bg-gray-200" />
              <View className="h-12 flex-1 rounded-lg bg-gray-200" />
            </View>
          </View>
        </SkeletonLoading>
      </View>

      {/* Price */}
      <View className="mb-4">
        <SkeletonLoading background="#d3d3d3" highlight="#e0e0e0">
          <View>
            <View className="mb-2 h-4 w-16 rounded bg-gray-200" />
            <View className="h-14 w-full rounded-lg bg-gray-200" />
          </View>
        </SkeletonLoading>
      </View>

      {/* Location / Button Area */}
      <View className="mb-10 mt-2">
        <SkeletonLoading background="#d3d3d3" highlight="#e0e0e0">
          <View>
            <View className="mb-2 h-4 w-20 rounded bg-gray-200" />
            <View className="h-14 w-full rounded-xl bg-gray-200" />
          </View>
        </SkeletonLoading>
      </View>
    </ScrollView>
  );
};

export default AddPostLoading;
