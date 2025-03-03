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
    className={cn(' rounded-md bg-gray-200 dark:bg-analytics_card', className)}
    style={style}
  />
);

const CategoryItemSkeleton = ({ animatedStyles }: any) => (
  <View className="h-16 flex-row items-center justify-between rounded-lg bg-gray-100 px-4 py-3 dark:bg-account_table_bg">
    <View className="flex-row items-center gap-2 space-x-2">
      <SkeletonPlaceholder className="h-[20px] w-[20px] rounded-full" style={animatedStyles} />
      <SkeletonPlaceholder className="h-[20px] w-[120px]" style={animatedStyles} />
    </View>

    <View className="flex-row items-center gap-x-4">
      <SkeletonPlaceholder className="h-[25px] w-[25px] rounded-lg" style={animatedStyles} />
      <SkeletonPlaceholder className="h-[25px] w-[25px] rounded-lg" style={animatedStyles} />
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
    ({ item }: any) => <CategoryItemSkeleton animatedStyles={animatedStyles} />,
    [animatedStyles]
  );

  return (
    <FlatList
      className="mx-4 gap-y-4"
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({});

export default Loading;
