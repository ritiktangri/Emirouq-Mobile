import React, { useEffect } from 'react';
import { useColorScheme, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  withRepeat,
} from 'react-native-reanimated';
import theme from '~/utils/theme';

const Loading = React.memo(() => {
  const opacity = useSharedValue(0.4);
  const colorScheme = useColorScheme();
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
    <View className="bg-dashboard_bg flex-1">
      {/* Date Placeholder */}
      <Animated.View
        style={[
          {
            width: 150,
            height: 30,
            marginTop: 20,
            borderRadius: 8,
            backgroundColor: colorScheme === 'dark' ? theme.colors.dashboard_card : 'lightgrey',
          },
          animatedStyles,
        ]}
      />

      {/* Text Area Placeholder */}
      <Animated.View
        style={[
          {
            width: '100%',
            height: 200,
            marginTop: 20,
            borderRadius: 8,
            backgroundColor: colorScheme === 'dark' ? theme.colors.dashboard_card : 'lightgrey',
          },
          animatedStyles,
        ]}
      />

      {/* Button Placeholders */}
      <View className=" mt-4 flex flex-row items-center justify-end">
        <Animated.View
          style={[
            {
              width: 120,
              height: 40,
              borderRadius: 8,
              backgroundColor: colorScheme === 'dark' ? theme.colors.dashboard_card : 'lightgrey',
            },
            animatedStyles,
          ]}
        />
        <Animated.View
          style={[
            {
              width: 80,
              height: 40,
              marginLeft: 10,
              borderRadius: 8,
              backgroundColor: colorScheme === 'dark' ? theme.colors.dashboard_card : 'lightgrey',
            },
            animatedStyles,
          ]}
        />
      </View>

      {/* Chart Section Placeholder */}
      <View className=" mt-8 rounded-lg ">
        <Animated.View
          style={[
            {
              width: '100%',
              height: 24,
              marginBottom: 16,
              backgroundColor: colorScheme === 'dark' ? theme.colors.dashboard_card : 'lightgrey',

              borderRadius: 6,
            },
            animatedStyles,
          ]}
        />

        {/* Chart Placeholder - A simple line representing the chart */}
        <Animated.View
          style={[
            {
              width: '100%',
              height: 120,
              backgroundColor: colorScheme === 'dark' ? theme.colors.dashboard_card : 'lightgrey',

              borderRadius: 5,
            },
            animatedStyles,
          ]}
        />

        {/* Stats Section Placeholder */}
        <Animated.View
          style={[
            {
              width: '20%',
              height: 24,
              backgroundColor: colorScheme === 'dark' ? theme.colors.dashboard_card : 'lightgrey',

              borderRadius: 4,
              marginTop: 10,
            },
            animatedStyles,
          ]}
        />
      </View>
    </View>
  );
});

export default Loading;
