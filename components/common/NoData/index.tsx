import { View, Text } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import theme from '~/utils/theme';

const NoData = () => {
  return (
    <View className="flex h-64 items-center justify-center">
      <Ionicons
        name="warning-outline"
        size={44}
        color={theme.colors.dashboard_card_text}
        className="text-white"
      />
      <Text className="font-poppinsMedium text-xl dark:text-dashboard_card_text">
        No data available
      </Text>
      <Text className="font-poppinsMedium text-sm dark:text-dashboard_card_text">
        Please select different filters or date range
      </Text>
    </View>
  );
};

export default NoData;
