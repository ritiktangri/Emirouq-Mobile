import React from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import { i18n } from '~/utils/i18n';
import { debounce } from 'lodash';

export default function PriceRangeSlider({ value, onChange }: any) {
  return (
    <View className="px-4 pt-6">
      <View className="mb-2 flex-row items-center justify-between">
        <Text className="text-base font-semibold">{i18n.t('home.price_range')}</Text>
        <Text className="text-sm text-gray-500">
          AED {value?.[0]} - {value?.[1]}
        </Text>
      </View>

      <View className="h-8 w-full justify-center">
        <Slider
          minimumValue={0}
          maximumValue={9999}
          step={50}
          value={value[1]}
          onValueChange={(val) => {
            // onChange([value[0], val]); // updates global state immediately
          }}
          onSlidingComplete={(val) => {
            onChange([0, val]); // updates global state only once
          }}
          minimumTrackTintColor="#F97316"
          maximumTrackTintColor="#E5E7EB"
          thumbTintColor="#F97316"
          style={{ width: '100%' }}
        />
      </View>
    </View>
  );
}
