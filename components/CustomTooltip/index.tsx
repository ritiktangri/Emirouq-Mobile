import React, { useState, useRef } from 'react';
import { View, Text, Pressable, Animated } from 'react-native';

export default function CustomTooltip() {
  const [visible, setVisible] = useState(false);
  const scale = useRef(new Animated.Value(0)).current;

  const showTooltip = () => {
    setVisible(true);
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const hideTooltip = () => {
    Animated.timing(scale, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => setVisible(false));
  };

  return (
    <View className="flex-1 items-center justify-center">
      <View className="relative">
        <Pressable
          onPressIn={showTooltip}
          onPressOut={hideTooltip}
          className="rounded-lg bg-indigo-600 px-4 py-2">
          <Text className="font-medium text-white">Press me</Text>
        </Pressable>

        {visible && (
          <Animated.View
            className="absolute bottom-14 left-1/2 z-50 -translate-x-1/2 rounded-md bg-black px-3 py-2"
            style={{
              transform: [{ scale }],
            }}>
            <Text className="text-sm text-white">This is a tooltip</Text>
          </Animated.View>
        )}
      </View>
    </View>
  );
}
