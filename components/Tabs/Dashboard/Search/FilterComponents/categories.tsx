import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useAuth } from '~/context/AuthContext';
import { useCategory } from '~/context/CategoryContext';
import { i18n } from '~/utils/i18n';

// const categories = ['All', 'Electronics', 'Vehicles', 'Property', 'Jobs', 'Services'];

export default function CategorySelector({ value, onChange }: any) {
  const { categories }: any = useCategory();

  return (
    <View className="px-4 pt-6">
      <Text className="mb-3 text-base font-semibold">{i18n.t('home.categories')}</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories?.map((cat: any) => {
          const isActive = cat?.uuid === value;

          return (
            <Pressable
              key={cat?.uuid}
              onPress={() => {
                if (isActive) {
                  onChange('');
                } else {
                  onChange(cat?.uuid);
                }
              }}
              className={`mr-3 rounded-full px-4 py-2 ${
                isActive ? 'bg-orange-500' : 'bg-gray-100'
              }`}>
              <Text className={`text-sm ${isActive ? 'text-white' : 'text-gray-700'}`}>
                {cat?.title}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}
