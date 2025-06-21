import { View, Text } from 'react-native';
import React from 'react';
import CustomBottomSheet from '~/components/CustomBottomSheet';
import { screenHeight } from '~/utils/helper';

const SubscriptionDropdownList = ({ visible, setVisible }: any) => {
  return (
    <CustomBottomSheet
      visible={visible}
      setVisible={setVisible}
      bottomSheetHeight={screenHeight * 0.8}
      showIndicator>
      <View className="flex-1 bg-white px-4 py-6">
        <Text className="mb-3 text-center text-lg font-semibold text-gray-900">Comments</Text>
      </View>
    </CustomBottomSheet>
  );
};

export default SubscriptionDropdownList;
