import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import { i18n } from '~/utils/i18n';

export default function PriceRangeSlider() {
  const [value, setValue] = useState(10000);

  return (
    <View className="px-4 pt-6">
      <View className="mb-2 flex-row items-center justify-between">
        <Text className="text-base font-semibold">{i18n.t('home.price_range')}</Text>
        <Text className="text-sm text-gray-500">AED 0 - {value.toLocaleString()}</Text>
      </View>

      <View className="h-8 w-full justify-center">
        <Slider
          minimumValue={0}
          maximumValue={10000}
          step={100}
          value={value}
          onValueChange={(val) => setValue(val)}
          minimumTrackTintColor="#F97316"
          maximumTrackTintColor="#E5E7EB"
          thumbTintColor="#F97316"
          style={{ width: '100%' }}
        />
      </View>
    </View>
  );
}
