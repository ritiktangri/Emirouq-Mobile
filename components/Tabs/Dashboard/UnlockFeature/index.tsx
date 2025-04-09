import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

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
          <Text className="mb-1 text-lg font-semibold text-gray-900">Unlock full features!</Text>

          <Text className="mb-4 text-gray-600">
            Complete your profile to access all marketplace features
          </Text>

          <View className="flex-row items-center gap-x-4">
            <TouchableOpacity className="rounded-lg bg-primary px-4 py-2">
              <Text className="font-medium text-white">Create Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text className="font-medium text-primary">View Plans</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default UnlockFeature;
