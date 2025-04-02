/* eslint-disable import/order */
import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { Text } from '~/components/common/Text';

import { height } from '~/constants/Colors';
import { cn } from '~/utils/helper';

export const SelectPnl = ({
  options,
  selected,
  setSelected,
  right,
  value,
  overlay = true,
  className,
  width,
  containerClassName,
  nestedDropdownClassName,
  buttonClassName,
}: any) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const dropdownHeight = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: dropdownHeight.value,
    };
  });

  const toggleDropdown = () => {
    setIsExpanded(!isExpanded);
    dropdownHeight.value = withTiming(isExpanded ? 0 : options?.data?.length * 60, {
      duration: 300,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  };

  const handleOptionSelect = (option: any) => {
    setSelected(option);
    toggleDropdown();
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      className={` flex flex-row items-center gap-2 ${
        item?.value === selected ? 'bg-gray-200 dark:bg-dashboard_card' : 'dark:bg-drawer'
      } m-1 rounded-lg p-4`}
      onPress={() => handleOptionSelect(item?.value)}>
      {item?.icon && item?.icon}
      <Text className={cn('font-poppinsMedium', 'text-black dark:text-white')}>{item?.label}</Text>
    </TouchableOpacity>
  );

  const keyExtractor = useCallback((item: any, index: any) => index?.toString(), []);

  return (
    <View className={cn('z-[9999] mb-1', containerClassName)}>
      <View className="flex-row items-center justify-between gap-2">
        <TouchableOpacity
          className={cn(
            'w-[85%] flex-row items-center  rounded-md  p-4',
            className,
            buttonClassName,
            'bg-white dark:bg-analytics_card'
          )}
          onPress={toggleDropdown}>
          <Text className={cn('flex-1', 'text-black dark:text-white')}>{value}</Text>
          <Ionicons
            name={isExpanded ? 'chevron-up' : 'chevron-down'}
            size={16}
            // color={theme.colors.analytics_card}
            className="!text-black dark:!text-white"
          />
        </TouchableOpacity>
        {right && right}
      </View>
      {/* Overlay with TouchableWithoutFeedback */}
      {isExpanded && overlay && (
        <TouchableWithoutFeedback onPress={toggleDropdown}>
          {/* Use screenHeight and screenWidth */}
          <View style={[styles.overlay, { height, width }]} />
        </TouchableWithoutFeedback>
      )}

      {/* Dropdown */}
      {isExpanded && (
        <View className="flex-1">
          <Animated.View
            className={cn(
              ' absolute  top-1 max-h-[250px] w-[85%]  rounded-md border border-gray-300 bg-white dark:border-0 dark:bg-analytics_card',
              width,
              nestedDropdownClassName
            )}
            style={animatedStyle}>
            <FlatList
              data={options?.data}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              showsVerticalScrollIndicator={false} // Optional: hide scrollbar
            />
          </Animated.View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  // dropdownContainer: {
  //   position: 'absolute',
  //   top: 50, // Adjust this to position the dropdown below the button
  //   width: '90%', // Same width as the button
  //   borderRadius: 5,
  //   zIndex: 2, // Ensure dropdown is above the overlay
  // },
});
