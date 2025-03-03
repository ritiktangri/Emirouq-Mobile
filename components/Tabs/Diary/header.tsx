import { View, TouchableOpacity } from 'react-native';
import React from 'react';
import { CompactSVG, ExpandSVG } from '~/svgs/diary';
import { DefaultText as Text } from '~/components/common/DefaultText';

const Header = () => {
  return (
    <View className="flex-1 flex-row  items-center">
      <View className="flex-1">
        <Text className="font-poppinsMedium text-2xl font-bold dark:text-white">Trading Diary</Text>
      </View>
      {/* <View className="flex-row gap-2">
        <TouchableOpacity className="">
          <ExpandSVG />
        </TouchableOpacity>
        <TouchableOpacity className="">
          <CompactSVG />
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default Header;
