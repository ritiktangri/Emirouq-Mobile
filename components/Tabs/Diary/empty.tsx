import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { DefaultText as Text } from '~/components/common/DefaultText';

const EmptyState = () => {
  return (
    <View className="h-[300px] flex-1 items-center justify-center bg-black  px-5">
      <Text className="mb-2 text-center font-poppinsMedium text-xl font-semibold text-white">
        No Trades Found
      </Text>
      <Text className="mb-5 text-center text-base text-dashboard_card_text">
        Please select the filters to view the trades
      </Text>
      <TouchableOpacity className="rounded bg-primary px-4 py-2">
        <Text className="font-medium text-white">+ Add Trades</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmptyState;
