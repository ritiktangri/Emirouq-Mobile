import { View, Text, ScrollView } from 'react-native';
import SkeletonLoading from 'expo-skeleton-loading';
import React from 'react';

const SkeletonBox = ({ height, width, className = '' }: any) => (
  <SkeletonLoading background="#d3d3d3" highlight="#e0e0e0">
    <View className={`rounded-lg bg-gray-200 ${height} ${width} ${className}`} />
  </SkeletonLoading>
);

const Card = () => {
  return (
    <View className="w-72 flex-1 bg-white px-4">
      <SkeletonBox height="h-40" width="w-64" className="mb-4" />
      <View>
        <View className="mb-2 flex-row justify-between gap-x-3">
          <SkeletonBox height="h-4" width="w-40" />
          <SkeletonBox height="h-4" width="w-12" />
        </View>
        <SkeletonBox height="h-4" width="w-12" className="mb-2" />
        <SkeletonBox height="h-4" width="w-56" className="mb-2" />
      </View>
    </View>
  );
};
const FeaturedListLoading = () => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-1  px-4">
      {Array(2)
        .fill(null)
        .map((_, index) => (
          <React.Fragment key={index}>
            <Card />
          </React.Fragment>
        ))}
    </ScrollView>
  );
};

export default FeaturedListLoading;
