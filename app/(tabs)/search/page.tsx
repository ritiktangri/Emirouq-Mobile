import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { cn } from '~/utils/helper';

export default function Page() {
  const [isMonthly, setIsMonthly] = useState(true);
  // const colorScheme: any = useColorScheme();
  return (
    <View className={cn('flex-1 bg-default_light_bg dark:bg-black')}>
      <SafeAreaView className="flex-1 bg-gray-50">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerClassName="pt-10 pb-6 px-6 items-center">
          {/* --- Header --- */}
          <Text className="mb-3 text-center text-3xl font-bold text-gray-800">
            Choose Your Subscription Plan
          </Text>
          <Text className="mb-8 text-center text-base leading-relaxed text-gray-600">
            Select a plan that fits your needs. Longer plans offer better value.
          </Text>

          <View className="mb-10 flex-row self-center rounded-full bg-gray-200 p-1">
            <TouchableOpacity
              // onPress={() => setIsMonthly(true)}
              className={`rounded-full px-8 py-2 ${isMonthly ? 'bg-primary shadow' : ''}`}
              activeOpacity={0.7}>
              <Text className={`font-semibold ${isMonthly ? 'text-white' : 'text-gray-700'}`}>
                Monthly
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              // onPress={() => setIsMonthly(false)}
              className={`rounded-full px-8 py-2 ${!isMonthly ? 'bg-primary shadow' : ''}`}
              activeOpacity={0.7}>
              <Text className={`font-semibold ${!isMonthly ? 'text-white' : 'text-gray-700'}`}>
                Yearly
              </Text>
            </TouchableOpacity>
          </View>

          <View className="w-full rounded-2xl border border-gray-200 bg-white p-6">
            <View className="mb-6 flex-row items-start justify-between">
              <View>
                <View className="mb-2 self-start rounded-full bg-orange-100 px-3 py-1">
                  <Text className="text-xs font-medium text-orange-600">
                    {isMonthly ? '1 Month' : '12 Months'}
                  </Text>
                </View>
                <Text className="text-xl font-bold text-gray-800">Basic Plan</Text>
              </View>

              <View className="items-end">
                <Text className="text-3xl font-bold text-gray-800">
                  {isMonthly ? '$9.99' : '$99.99'}
                </Text>
                <Text className="text-sm text-gray-500">
                  {isMonthly ? 'per month' : 'per year'}
                </Text>
              </View>
            </View>

            <View className="mb-6">
              <View className="mb-3 flex-row items-center">
                <Ionicons name="checkmark-circle" size={20} color="#F97316" />
                <Text className="ml-2 text-base text-gray-700">10 ads per month</Text>
              </View>
              <View className="flex-row items-center">
                <Ionicons name="checkmark-circle" size={20} color="#F97316" />
                <Text className="ml-2 text-base text-gray-700">Basic ad visibility</Text>
              </View>
            </View>

            <TouchableOpacity
              className="mt-4 rounded-lg border-2 border-primary bg-white py-3"
              activeOpacity={0.7}
              onPress={() =>
                console.log('Selected Plan:', isMonthly ? 'Monthly Basic' : 'Yearly Basic')
              }>
              <Text className="text-center text-lg font-semibold text-primary">Select Plan</Text>
            </TouchableOpacity>
          </View>
          <View className="mt-6 w-full rounded-2xl border border-gray-200 bg-white p-6">
            <View className="mb-6 flex-row items-start justify-between">
              <View>
                <View className="mb-2 self-start rounded-full bg-green-100 px-3 py-1">
                  <Text className="text-xs font-medium text-green-600">
                    {isMonthly ? '1 Month' : '12 Months'}
                  </Text>
                </View>
                <Text className="text-xl font-bold text-gray-800">Value Plan</Text>
              </View>

              <View className="items-end">
                <Text className="text-3xl font-bold text-gray-800">
                  {isMonthly ? '$24.99' : '$55.99'}
                </Text>
                <Text className="text-sm text-gray-500">
                  {isMonthly ? 'per month' : 'per year'}
                </Text>
              </View>
            </View>

            <View className="mb-6">
              <View className="mb-3 flex-row items-center">
                <Ionicons name="checkmark-circle" size={20} color="green" />
                <Text className="ml-2 text-base text-gray-700">10 ads per month</Text>
              </View>
              <View className="flex-row items-center">
                <Ionicons name="checkmark-circle" size={20} color="green" />
                <Text className="ml-2 text-base text-gray-700">Basic ad visibility</Text>
              </View>
            </View>

            <TouchableOpacity
              className="mt-4 rounded-lg border-2 border-green-500 bg-white py-3"
              activeOpacity={0.7}
              onPress={() =>
                console.log('Selected Plan:', isMonthly ? 'Monthly Basic' : 'Yearly Basic')
              }>
              <Text className="text-center text-lg font-semibold text-green-500">Select Plan</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
