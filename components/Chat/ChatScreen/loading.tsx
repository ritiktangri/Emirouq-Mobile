import React from 'react';
import { View } from 'react-native';
import SkeletonLoading from 'expo-skeleton-loading';

const SkeletonBox = ({ height, width, className = '' }: any) => (
  <SkeletonLoading background="#d3d3d3" highlight="#e0e0e0">
    <View className={`rounded-xl bg-gray-200 ${height} ${width} ${className}`} />
  </SkeletonLoading>
);

const ChatBubbleSkeleton = ({ numberOfMessages = 7 }: { numberOfMessages: number }) => {
  const messageLengths = ['w-48', 'w-32', 'w-64', 'w-40', 'w-56', 'w-24', 'w-48']; // Possible message lengths
  const alignment = ['justify-start', 'justify-end'];

  return (
    <View className="flex-1 bg-gray-100 p-4">
      {/* Top Bar (Name and Status) */}
      <View className="mb-4 flex-row items-center">
        <SkeletonBox height="h-10" width="w-10" className="mr-3 rounded-full" />
        <SkeletonBox height="h-4" width="w-32" />
      </View>

      {/* Product Info */}
      <View className="mb-4 flex-row items-center">
        <SkeletonBox height="h-16" width="w-16" className="mr-3 rounded-lg" />
        <View>
          <SkeletonBox height="h-3" width="w-48" className="mb-1" />
          <SkeletonBox height="h-3" width="w-32" />
        </View>
      </View>

      {/* Message List */}
      {[...Array(numberOfMessages)].map((_, index) => (
        <View key={index} className={`flex-row ${alignment[index % 2]} mb-2`}>
          <SkeletonBox
            height="h-8"
            width={messageLengths[index % messageLengths.length]}
            className="rounded-xl"
          />
        </View>
      ))}
    </View>
  );
};

export default ChatBubbleSkeleton;
