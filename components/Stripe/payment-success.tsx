/* eslint-disable import/order */
import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { useCheckSubscription } from '~/hooks/stripe/query';
import { Href, router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { routes } from '~/utils/routes';

const PaymentSuccess = () => {
  const { id } = useLocalSearchParams();
  const { data } = useCheckSubscription(id, 100);
  console.log(data, 'data', id);
  return (
    <View className="flex-1 bg-white p-6">
      {/* Success Icon */}
      <View className="mt-20 items-center justify-center">
        <View className="mb-6 h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <Ionicons name="checkbox-outline" size={40} color="#22c55e" strokeWidth={3} />
        </View>
      </View>

      {/* Success Message */}
      <View className="mt-6 items-center">
        <Text className="mb-2 text-2xl font-bold text-gray-900">Payment Successful!</Text>
        <Text className="mb-8 text-center text-base text-gray-600">
          Your subscription has been confirmed. You now have access to all premium features.
        </Text>
      </View>

      {/* Subscription Details */}
      <View className="mb-8 rounded-2xl bg-gray-50 p-6">
        <View className="mb-4 flex-row items-center">
          <Ionicons name="calendar" size={24} color="#4b5563" />
          <Text className="ml-3 font-medium text-gray-700">Your subscription details</Text>
        </View>
        <View className="border-t border-gray-200 pt-4">
          <Text className="mb-2 text-gray-600">Plan: Premium Monthly</Text>
          <Text className="mb-2 text-gray-600">Next billing date: March 14, 2024</Text>
          <Text className="text-gray-600">Amount: $9.99/month</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View className="mt-auto">
        <Pressable
          onPress={() => router.push(routes.tabs.home as Href)}
          className="mb-4 rounded-xl bg-green-600 py-4">
          <Text className="text-center text-lg font-semibold text-white">Start Exploring</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default PaymentSuccess;
