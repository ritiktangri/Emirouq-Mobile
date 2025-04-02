import { View, TouchableOpacity, Linking } from 'react-native';
import React from 'react';
import { AntDesign, FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import { TwitterSVG } from '~/svgs/drawer';
import { Text } from '~/components/common/Text';
const Footer = () => {
  return (
    <View className=" mt-auto ">
      <Text className=" font-poppinsMedium text-lg text-tertiary">
        "Track your trades, analyze your performance, and improve your strategy."
      </Text>
      <Text className=" mt-2 text-base text-tertiary">
        Maximize your trading potential with our powerful journaling tools.
      </Text>
      <View className="mt-4 flex-row gap-4">
        <TouchableOpacity
          className=" h-12 w-12 flex-row items-center justify-center rounded-full border-[1px] border-gray-700"
          onPress={() => Linking.openURL('https://www.instagram.com/officialtradelizer/')}>
          <AntDesign name="instagram" size={24} className=" dark:!text-white" />
        </TouchableOpacity>

        <TouchableOpacity
          className=" h-12 w-12 flex-row items-center justify-center rounded-full border-[1px] border-gray-700"
          onPress={() => Linking.openURL('https://x.com/tradelizerapp')}>
          <FontAwesome6 name="x-twitter" size={24} className=" dark:!text-white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Footer;
