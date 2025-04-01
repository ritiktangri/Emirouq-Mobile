import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const SuccessView = () => {
  return (
    <View className="flex-1 bg-white px-6 py-3">
      {/* Success Icon */}
      <View className="mt-10 items-center">
        <View className="rounded-full bg-green-100 p-4">
          <FontAwesome name="check" size={30} color="green" className="opacity-60" />
        </View>
      </View>

      {/* Success Message */}
      <View className="mt-8 items-center">
        <Text className="text-2xl font-bold text-gray-800">Successfully Submitted!</Text>
        <Text className="mt-2 text-gray-600">Your ad has been submitted for review.</Text>
      </View>

      {/* Estimated Approval Time */}
      <View className=" mt-8 rounded-lg bg-gray-100 p-4">
        <View className="mb-2 flex-row items-center">
          <FontAwesome name="clock-o" size={20} color="gray" />
          <View className="ml-2">
            <Text className="text-gray-700">Estimated Approval Time</Text>
            <Text className="text-lg font-semibold text-gray-800">4 - 8 hours</Text>
          </View>
        </View>
      </View>

      {/* Status Tabs */}
      <View className="mt-8 flex-row justify-around">
        <Text className="border-b-2 border-green-500 font-semibold text-gray-700">Submitted</Text>
        <Text className="text-gray-500">In Review</Text>
        <Text className="text-gray-500">Approved</Text>
      </View>

      {/* Current Status */}
      <TouchableOpacity className=" mt-4 flex-row items-center justify-between rounded-lg bg-gray-100 p-4">
        <View>
          <Text className="font-semibold text-gray-700">Current Status</Text>
          <Text className="text-lg text-gray-800">In Review</Text>
        </View>
        <FontAwesome name="chevron-right" size={16} color="gray" />
      </TouchableOpacity>

      {/* Track Status Button */}
      <TouchableOpacity className="mt-8 items-center rounded-lg bg-green-500 p-4">
        <Text className="font-semibold text-white">Track Status</Text>
      </TouchableOpacity>

      {/* Return to Home Button */}
      <TouchableOpacity className="mt-6 items-center">
        <Text className="text-gray-600">Return to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SuccessView;
