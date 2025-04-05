/* eslint-disable import/order */
import React from 'react';
import { TouchableOpacity, SafeAreaView } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { View } from '~/components/common/View';
import { Text } from '~/components/common/Text';
import { i18n } from '~/utils/i18n';

const SuccessView = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1   bg-white px-6 py-3 pt-10">
      <View className="flex-1 gap-4">
        <View className="mt-10 items-center">
          <View className="rounded-full bg-green-100 p-4">
            <FontAwesome name="check" size={30} color="green" className="opacity-60" />
          </View>
        </View>

        {/* Success Message */}
        <View className="mt-8 items-center">
          <Text className="text-2xl font-bold text-gray-800">{i18n.t('success_page.title')}</Text>
          <Text className="mt-2 text-gray-600">{i18n.t('success_page.description')}</Text>
        </View>

        {/* Estimated Approval Time */}
        <View className=" m-3 flex-row gap-4  rounded-lg bg-gray-100 p-4">
          <AntDesign name="clockcircleo" size={20} color="gray" />
          <View className="">
            <Text className="font-poppinsMedium text-black">
              {i18n.t('success_page.estimatedTime')}
            </Text>
            <Text className="text-lg font-semibold text-gray-500">
              {i18n.t('success_page.duration')}
            </Text>
          </View>
        </View>

        {/* Status Tabs */}
        <View className="mx-3 h-1 w-1/3 bg-green-400" />
        <View className=" flex-row justify-around">
          <Text className="font-poppinsSemiBold text-green-500">
            {i18n.t('success_page.filter.submitted')}
          </Text>
          <Text className="font-poppinsMedium text-gray-500">
            {i18n.t('success_page.filter.inReview')}
          </Text>
          <Text className="font-poppinsMedium text-gray-500">
            {i18n.t('success_page.filter.approved')}
          </Text>
        </View>

        {/* Current Status */}
        <TouchableOpacity className="mx-3 flex-row items-center  rounded-lg bg-gray-100 p-4">
          <View className="flex-1 gap-2">
            <Text className="text-xl font-semibold text-gray-700">
              {i18n.t('success_page.currentStatus')}
            </Text>
            <Text className="font-poppinsMedium text-lg text-gray-500">
              {i18n.t('success_page.inReview')}
            </Text>
          </View>
          <FontAwesome name="chevron-right" size={16} color="gray" />
        </TouchableOpacity>
      </View>
      <View className="mb-10">
        {/* Track Status Button */}
        <TouchableOpacity className="mx-3 items-center rounded-lg bg-green-500 p-4">
          <Text className="font-poppinsMedium text-lg text-white">
            {i18n.t('success_page.trackStatus')}
          </Text>
        </TouchableOpacity>

        {/* Return to Home Button */}
        <TouchableOpacity className="mt-6 items-center underline" onPress={() => router.back()}>
          <Text className="font-poppinsMedium text-gray-600 underline">
            {i18n.t('success_page.returnToHome')}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SuccessView;
