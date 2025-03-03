/* eslint-disable import/order */
import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  withRepeat,
} from 'react-native-reanimated';

const Loader = () => {
  const opacity = useSharedValue(0.4);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(1, {
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1, // Repeat indefinitely
      true // Reverse the animation on each repeat
    );
  }, []);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <View className="mx-2  rounded-lg bg-white p-4 dark:bg-dashboard_card">
      <Animated.View
        style={[
          {
            width: '100%',
            paddingVertical: 20,
            backgroundColor: 'rgba(0,0,0,0.2)',
            borderRadius: 8,
          },
          animatedStyles,
        ]}
      />
    </View>
  );
};

export default Loader;
