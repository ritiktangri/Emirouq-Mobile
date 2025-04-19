import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { i18n } from '~/utils/i18n';

export default function LocationInput() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="px-4 pt-6">
      <Text className="mb-2 text-base font-semibold">{i18n.t('home.location')}</Text>

      <Pressable
        className={`flex-row items-center rounded-md border px-3 py-3 ${
          isFocused ? 'border-blue-500' : 'border-gray-300'
        }`}
        onPress={() => {
          // You can open location modal or dropdown here
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}>
        <MaterialIcons
          name="location-on"
          size={20}
          color={isFocused ? '#3B82F6' : '#9CA3AF'} // Blue if focused, gray otherwise
          style={{ marginRight: 8 }}
        />
        <Text className="text-gray-400">Select location</Text>
      </Pressable>
    </View>
  );
}
