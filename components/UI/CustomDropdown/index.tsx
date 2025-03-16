import { View, Text, Pressable, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { EvilIcons, MaterialIcons } from '@expo/vector-icons';

const CustomDropdown = ({ value, data, onChange, placeholder }: any) => {
  const [showDropdown, setShowDropdown] = useState<any>(false);
  return (
    <View>
      <Pressable
        className="flex-row items-center justify-between rounded-lg border border-gray-200 p-3"
        onPress={() => setShowDropdown(!showDropdown)}>
        <Text className="text-base text-gray-600">{value || placeholder}</Text>
        <MaterialIcons name="keyboard-arrow-down" size={20} color="gray" />
      </Pressable>
      {showDropdown && (
        <View className="absolute left-0 right-0 top-full z-10 mt-1 rounded-lg border border-gray-200 bg-white">
          <ScrollView className="max-h-64">
            {data?.map((item: any) => (
              <Pressable
                key={item}
                className={`border-b border-gray-100 p-3 ${value === item ? 'bg-primary-50' : ''}`}
                onPress={() => {
                  onChange(item);
                  setShowDropdown(false);
                }}>
                <Text
                  className={`text-base ${value === item ? 'text-primary-500' : 'text-gray-600'}`}>
                  {item}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default CustomDropdown;
