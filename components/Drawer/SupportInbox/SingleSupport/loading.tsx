/* eslint-disable import/order */
import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  withRepeat,
} from 'react-native-reanimated';
import { cn } from '~/utils/helper.utils';

const SkeletonPlaceholder = ({ className, style }: any) => (
  <Animated.View className={cn(' rounded-md bg-gray-700', className)} style={style} />
);

const ChatLoading = () => {
  const opacity = useSharedValue(0.4);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(1, {
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );
  }, []);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const data = Array.from({ length: 10 }, (_, index) => ({ id: String(index) })); // Create an array of 4 items

  const renderItem = ({ item }: any) => (
    <View style={styles.messageContainer}>
      {item.id % 2 === 0 ? ( // Alternate layout for different senders
        <>
          <View style={styles.senderIcon}>
            <SkeletonPlaceholder
              className="h-[32px] w-[32px] rounded-full"
              style={[animatedStyles]}
            />
          </View>
          <View style={styles.messageContent}>
            <SkeletonPlaceholder className="mb-1 h-[16px] w-[70%]" style={animatedStyles} />
            <SkeletonPlaceholder className="h-[16px] w-[85%]" style={animatedStyles} />
            {/*Optional file placeholder*/}
            {item.id % 3 === 0 && (
              <SkeletonPlaceholder className="mt-1 h-[32px] w-[60%]" style={animatedStyles} />
            )}
          </View>
        </>
      ) : (
        <>
          <View style={styles.messageContentRight}>
            <SkeletonPlaceholder className="mb-1 h-[16px] w-[70%]" style={animatedStyles} />
            <SkeletonPlaceholder className="h-[16px] w-[85%]" style={animatedStyles} />
            {/*Optional file placeholder*/}
            {item.id % 3 === 0 && (
              <SkeletonPlaceholder className="mt-1 h-[32px] w-[60%]" style={animatedStyles} />
            )}
          </View>
          <View style={styles.receiverIcon}>
            <SkeletonPlaceholder
              className="h-[32px] w-[32px] rounded-full"
              style={animatedStyles}
            />
          </View>
        </>
      )}
    </View>
  );

  return (
    <View className="flex-1 bg-black p-4">
      {/* Header Skeleton */}

      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponentClassName="mb-10 gap-4"
        ListHeaderComponent={() => (
          <View className="mb-4 gap-5">
            <SkeletonPlaceholder className="h-[24px] w-[40px]" style={animatedStyles} />
            <View className="flex-row justify-between">
              <SkeletonPlaceholder className="mb-1 h-[16px] w-[100px]" style={animatedStyles} />
              <SkeletonPlaceholder className="h-[12px] w-[60px]" style={animatedStyles} />
            </View>
            <View className="flex-row justify-between">
              <SkeletonPlaceholder className="h-[32px] w-[80px]" style={animatedStyles} />
              <SkeletonPlaceholder className="h-[32px] w-[100px]" style={animatedStyles} />
            </View>
          </View>
        )}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContent}
      />
      <SkeletonPlaceholder className="mt-4 h-[40px] w-[95%] self-center" style={animatedStyles} />
    </View>
  );
};

const styles = StyleSheet.create({
  flatListContent: {
    paddingBottom: 24, // Add some padding at the bottom
  },

  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    width: '100%',
  },
  senderIcon: {
    marginRight: 8,
  },
  receiverIcon: {
    marginLeft: 8,
  },
  messageContent: {
    flex: 1,
    alignItems: 'flex-start',
  },
  messageContentRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  messageText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default ChatLoading;
