/* eslint-disable import/order */
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { DefaultText as Text } from '~/components/common/DefaultText';

const SectionHeading = () => {
  return (
    <View className="mx-4 mt-3 flex-1">
      <View className="flex-row  items-center">
        <Text className="flex-1 font-poppinsMedium text-lg uppercase text-black dark:text-dashboard_card_text">
          Your Statistics
        </Text>
        {/* <TouchableOpacity className="flex-row items-center rounded-full bg-primary p-2  ">
          <SimpleLineIcons name="refresh" size={14} color={theme.colors.white} />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default SectionHeading;
