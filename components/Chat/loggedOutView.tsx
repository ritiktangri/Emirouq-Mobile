import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Href, useRouter } from 'expo-router';
import { routes } from '~/utils/routes';

const LoggedOutView = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      <View className="mb-6">
        <Ionicons name="chatbubble-ellipses-outline" size={100} color="#94a3b8" />
      </View>
      <Text className="mb-2 text-center text-2xl font-semibold text-gray-800">
        Start chatting with sellers
      </Text>
      <Text className="mb-6 text-center text-gray-500">
        Log in or sign up to send and receive messages instantly.
      </Text>

      {/* <View className="flex-row gap-x-4">
        <TouchableOpacity
          className="rounded-full bg-primary px-6 py-3"
          onPress={() => router.push(routes.auth.auth as Href)}>
          <Text className="font-semibold text-white">Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="rounded-full border border-primary px-6 py-3"
          onPress={() => router.push(routes.auth.auth as Href)}>
          <Text className="font-semibold text-primary">Sign Up</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default LoggedOutView;
