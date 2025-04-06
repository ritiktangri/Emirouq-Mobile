import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { i18n } from '~/utils/i18n';
import { Href, useRouter } from 'expo-router';
import { routes } from '~/utils/routes';

const LoggedOutView = () => {
  const router = useRouter();

  const features = [
    { icon: <Ionicons name="pricetag" size={24} color="#f97316" />, label: 'Post Ads' },
    {
      icon: <Ionicons name="chatbubble-ellipses" size={24} color="#f97316" />,
      label: 'Chat with Sellers',
    },
    {
      icon: <MaterialIcons name="rate-review" size={24} color="#f97316" />,
      label: 'Leave Reviews',
    },
    {
      icon: <Ionicons name="shield-checkmark" size={24} color="#f97316" />,
      label: 'Secure Checkout',
    },
  ];

  return (
    <ScrollView showsVerticalScrollIndicator={false} className="flex-1 bg-white">
      <View className="mt-10 items-center px-4">
        <Text className="text-2xl font-bold text-gray-800">
          {i18n.t('profile.welcome_to_emirouq')}
        </Text>
        <Text className="mt-1 text-base text-gray-500"> {i18n.t('profile.login_or_signup')}</Text>
      </View>

      <View className="mt-6 items-center">
        <View className="h-24 w-24 items-center justify-center rounded-full bg-gray-200">
          <FontAwesome name="user" size={40} color="#aaa" />
        </View>
      </View>

      <View className="mt-8 flex-row justify-between gap-x-4 px-4">
        <TouchableOpacity
          onPress={() => router.push(routes.auth.auth as Href)}
          className="flex-1 items-center rounded-full bg-orange-500 py-3 shadow-sm shadow-orange-400">
          <Text className="text-base font-bold text-white">Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push(routes.auth.auth as Href)}
          className=" flex-1 items-center rounded-full border border-orange-500 py-3">
          <Text className="text-base font-bold text-orange-500">Sign Up</Text>
        </TouchableOpacity>
      </View>
      <View className="mt-10 px-6">
        <Text className="mb-4 text-xl font-bold text-gray-900">Why Sign Up?</Text>
        <View className="flex flex-col gap-y-4">
          {features.map((item, index) => (
            <View
              key={index}
              className="flex-row items-center gap-x-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <View className="rounded-full bg-orange-100 p-2">{item.icon}</View>
              <Text className="text-base font-medium text-gray-800">{item.label}</Text>
            </View>
          ))}
        </View>
      </View>
      {/* Guest Info */}
      <View className="mt-10 px-6">
        <Text className="text-center text-gray-400">
          You're browsing as a guest. Some features are limited.
        </Text>
      </View>

      {/* Footer Links */}
      <View className="mb-20 mt-10 px-6">
        <TouchableOpacity>
          <Text className="text-center text-gray-500 underline">Terms & Privacy Policy</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default LoggedOutView;
