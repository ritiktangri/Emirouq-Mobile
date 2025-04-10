import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { i18n } from '~/utils/i18n';

const UnlockFeature = () => {
  return (
    <View className="p-4">
      <LinearGradient
        className="rounded-xl"
        colors={['#f1f5ff', '#ffffff']}
        style={{
          borderRadius: 5,
        }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}>
        <View className=" p-3">
          <Text className="mb-1 text-lg font-semibold text-gray-900">
            {i18n.t('home.unlock_full_features')}
          </Text>

          <Text className="mb-4 text-gray-600">{i18n.t('home.unlock_card_description')}</Text>
          <View className="flex-row items-center gap-x-4">
            <TouchableOpacity className="rounded-lg bg-primary px-4 py-2">
              <Text className="font-medium text-white"> {i18n.t('home.create_profile')}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text className="font-medium text-primary"> {i18n.t('home.view_plans')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default UnlockFeature;
