/* eslint-disable import/order */
import React from 'react';
import {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { height } from '~/constants/Colors';

export const useDropdownAnimation = () => {
  const dropdownHeight = useSharedValue(0);
  const dropdownOpacity = useSharedValue(0);
  const scrollY = useSharedValue(0);
  const animatedDropdownStyle = useAnimatedStyle(() => ({
    height: dropdownHeight.value,
    opacity: dropdownOpacity.value,
  }));

  const animatedScrollStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(scrollY.value, [0, 100], [0, 0], Extrapolation.CLAMP),
      },
    ],
    opacity: interpolate(scrollY.value, [0, 100], [1, 1], Extrapolation.CLAMP),
  }));

  const showDropdown = React.useCallback(() => {
    dropdownHeight.value = withTiming(height * 0.4, { duration: 300 });
    dropdownOpacity.value = withTiming(1, { duration: 300 });
  }, [dropdownHeight, dropdownOpacity]);

  const hideDropdown = React.useCallback(() => {
    dropdownHeight.value = withTiming(0, { duration: 200 });
    dropdownOpacity.value = withTiming(0, { duration: 200 });
  }, [dropdownHeight, dropdownOpacity]);

  return {
    animatedDropdownStyle,
    animatedScrollStyle,
    scrollY,
    showDropdown,
    hideDropdown,
  };
};
