/* eslint-disable import/order */
import React, { useCallback } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  withRepeat,
} from 'react-native-reanimated';
import { cn } from '~/utils/helper.utils';

const SkeletonPlaceholder = ({ className, style }: any) => (
  <Animated.View
    className={cn(' rounded-md bg-gray-300 dark:bg-analytics_card', className)}
    style={style}
  />
);

const AccountItemSkeleton = ({ animatedStyles }: any) => (
  <View className="flex-row items-center justify-between rounded-lg bg-gray-100 px-4 py-3 dark:bg-account_table_bg">
    <SkeletonPlaceholder className="h-[25px] w-[80px]" style={animatedStyles} />
    <SkeletonPlaceholder className="h-[25px] w-[80px]" style={animatedStyles} />

    <View className="flex-row items-center gap-x-2">
      <SkeletonPlaceholder className="h-[25px] w-[80px]" style={animatedStyles} />
    </View>
    <View className="flex-row items-center gap-x-2">
      <SkeletonPlaceholder className="h-[25px] w-[25px] rounded-lg" style={animatedStyles} />
      <SkeletonPlaceholder className="h-[25px] w-[25px] rounded-lg" style={animatedStyles} />
    </View>
  </View>
);

const Loading = () => {
  const opacity = useSharedValue(0.4);

  React.useEffect(() => {
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

  const data = Array.from({ length: 6 }, (_, index) => ({ id: String(index) }));

  const renderItem = useCallback(
    ({ item }: any) => <AccountItemSkeleton animatedStyles={animatedStyles} />,
    [animatedStyles]
  );

  return (
    <FlatList
      className="gap-y-4 "
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({});

export default Loading;
