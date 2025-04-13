/* eslint-disable import/order */
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import CheckoutScreen from '~/components/Stripe/checkout';
import { useGetPlans } from '~/hooks/stripe/query';
import { cn, toCurrency } from '~/utils/helper';

export default function Page() {
  const [isMonthly, setIsMonthly] = useState(true);
  const { data, isLoading }: any = useGetPlans();

  return (
    <View className={cn('flex-1 bg-default_light_bg p-3 dark:bg-black')}>
      <SafeAreaView className="flex-1 bg-gray-50">
        {/* --- Header --- */}
        <Text className="mb-3 text-center text-3xl font-bold text-gray-800">
          Choose Your Subscription Plan
        </Text>
        <Text className="mb-8 text-center text-base leading-relaxed text-gray-600">
          Select a plan that fits your needs. Longer plans offer better value.
        </Text>

        <FlatList
          data={data?.data}
          className="w-full"
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.uuid}
          ItemSeparatorComponent={() => <View className="my-2" />}
          renderItem={({ item }) => (
            <View className="w-full rounded-2xl border border-gray-200 bg-white p-6">
              <View className="mb-6 flex-row items-start justify-between">
                <View>
                  <View className="mb-2 self-start rounded-full bg-orange-100 px-3 py-1">
                    <Text className="text-xs font-medium text-orange-600">
                      {item?.duration} days
                    </Text>
                  </View>
                  <Text className="text-xl font-bold text-gray-800">{item?.name} Plan</Text>
                </View>

                <View className="items-end">
                  <Text className="text-3xl font-bold text-gray-800">
                    {toCurrency(item?.amount)}
                  </Text>
                </View>
              </View>

              <View className="mb-6 gap-3">
                <View className="flex-row items-center">
                  <Ionicons name="checkmark-circle" size={20} color="#F97316" />
                  <Text className="ml-2 text-base text-gray-700">
                    <Text className="font-semibold text-primary">
                      {item?.numberOfAds > 1000 ? 'Unlimited' : item?.numberOfAds}{' '}
                    </Text>
                    ads{' '}
                    {item?.name !== 'Business' ? (
                      <Text>
                        for {item?.duration} {item?.duration > 1 ? 'days' : 'day'}
                      </Text>
                    ) : (
                      <></>
                    )}
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <Ionicons name="checkmark-circle" size={20} color="#F97316" />
                  <Text className="ml-2 text-base text-gray-700">
                    <Text className="font-semibold text-primary">{item?.featuredAdBoosts}</Text>{' '}
                    Featured Ads
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <Ionicons name="checkmark-circle" size={20} color="#F97316" />
                  {item?.additionalBenefits?.map((item: any) => (
                    <View key={item}>
                      <Text className="font-semibold text-primary">{item}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <CheckoutScreen id={item?.uuid} item={item} />
            </View>
          )}
        />
      </SafeAreaView>
    </View>
  );
}
