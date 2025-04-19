import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { i18n } from '~/utils/i18n';
// No need to import `styled` if you're using className directly with NativeWind v4+

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'relevant', label: 'Most Relevant' },
];

const SortByOptions = ({ initialSelection = 'newest' }) => {
  const [selectedOption, setSelectedOption] = useState(initialSelection);

  const handleSelect = (value: any) => {
    setSelectedOption(value);
  };

  return (
    <View className="rounded-lg bg-white p-4">
      <Text className="mb-4 text-xl font-bold text-gray-800">{i18n.t('home.sortBy')}</Text>
      {SORT_OPTIONS.map((option) => (
        <TouchableOpacity
          key={option.value}
          onPress={() => handleSelect(option.value)}
          className="my-1 flex-row items-center py-2"
          activeOpacity={0.7}>
          <View
            className={`mr-3 flex h-6 w-6 items-center justify-center rounded-full border-2 ${
              selectedOption === option.value ? 'border-orange-500' : 'border-gray-300'
            }`}>
            {selectedOption === option.value && (
              <View className="h-3 w-3 rounded-full bg-orange-500" />
            )}
          </View>

          <Text className="flex-1 text-base text-gray-700">{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default SortByOptions;
