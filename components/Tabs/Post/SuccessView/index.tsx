/* eslint-disable import/order */
import React from 'react';
import { TouchableOpacity, SafeAreaView } from 'react-native';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { View } from '~/components/common/View';
import { Text } from '~/components/common/Text';
import { i18n } from '~/utils/i18n';
import { routes } from '~/utils/routes';
import { Href } from 'expo-router';
import { cn } from '~/utils/helper';

const STEPS = [
  { key: 'submitted', done: true },
  { key: 'inReview', done: false, active: true },
  { key: 'approved', done: false, active: false },
] as const;

const SuccessView = () => {
  const router = useRouter();

  const goToStatus = () =>
    router.push({
      pathname: routes.tabs.profile.profile,
      params: { tab: 'manageAds' },
    } as Href);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-between px-6 py-6">
        <View className="flex-1">
          {/* Success badge */}
          <View className="mt-6 items-center">
            <View className="items-center justify-center rounded-full bg-primary/10 p-5">
              <View
                className="h-14 w-14 items-center justify-center rounded-full bg-primary"
                style={{
                  shadowColor: '#FF5722',
                  shadowOpacity: 0.3,
                  shadowRadius: 10,
                  shadowOffset: { width: 0, height: 4 },
                  elevation: 4,
                }}>
                <FontAwesome name="check" size={24} color="#fff" />
              </View>
            </View>
          </View>

          {/* Success Message */}
          <View className="mt-6 items-center px-4">
            <Text className="text-center text-2xl font-bold text-gray-900">
              {i18n.t('success_page.title')}
            </Text>
            <Text className="mt-2 text-center text-base leading-6 text-gray-500">
              {i18n.t('success_page.description')}
            </Text>
          </View>

          {/* Estimated Approval Time */}
          <View className="mt-8 flex-row items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-4">
            <View className="h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <AntDesign name="clockcircleo" size={18} color="#FF5722" />
            </View>
            <View className="flex-1">
              <Text className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                {i18n.t('success_page.estimatedTime')}
              </Text>
              <Text className="text-base font-bold text-gray-800">
                {i18n.t('success_page.duration')}
              </Text>
            </View>
          </View>

          {/* Stepper */}
          <View className="mt-8 px-2">
            <View className="flex-row items-center">
              {STEPS.map((step, index) => (
                <React.Fragment key={step.key}>
                  <View
                    className={cn(
                      'h-8 w-8 items-center justify-center rounded-full',
                      step.done
                        ? 'bg-primary'
                        : step.active
                          ? 'border-2 border-primary bg-white'
                          : 'border-2 border-gray-200 bg-white'
                    )}>
                    {step.done ? (
                      <Ionicons name="checkmark" size={16} color="#fff" />
                    ) : (
                      <View
                        className={cn(
                          'h-2.5 w-2.5 rounded-full',
                          step.active ? 'bg-primary' : 'bg-gray-200'
                        )}
                      />
                    )}
                  </View>
                  {index < STEPS.length - 1 && (
                    <View
                      className={cn(
                        'h-0.5 flex-1',
                        STEPS[index + 1].done || STEPS[index + 1].active
                          ? 'bg-primary'
                          : 'bg-gray-200'
                      )}
                    />
                  )}
                </React.Fragment>
              ))}
            </View>
            <View className="mt-2 flex-row justify-between">
              {STEPS.map((step) => (
                <Text
                  key={step.key}
                  className={cn(
                    'text-xs',
                    step.done
                      ? 'font-poppinsSemiBold text-primary'
                      : step.active
                        ? 'font-poppinsSemiBold text-gray-800'
                        : 'font-poppinsMedium text-gray-400'
                  )}>
                  {i18n.t(`success_page.filter.${step.key}`)}
                </Text>
              ))}
            </View>
          </View>

          {/* Current Status */}
          <TouchableOpacity
            onPress={goToStatus}
            className="mt-8 flex-row items-center rounded-2xl border border-gray-100 bg-white p-4"
            style={{
              shadowColor: '#0F172A',
              shadowOpacity: 0.05,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 2 },
              elevation: 1,
            }}>
            <View className="flex-1 gap-1">
              <Text className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                {i18n.t('success_page.currentStatus')}
              </Text>
              <Text className="text-lg font-bold text-gray-800">
                {i18n.t('success_page.inReview')}
              </Text>
            </View>
            <View className="h-8 w-8 items-center justify-center rounded-full bg-gray-50">
              <FontAwesome name="chevron-right" size={13} color="#9CA3AF" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Actions */}
        <View className="mt-6">
          <TouchableOpacity
            className="items-center rounded-xl bg-primary py-4"
            style={{
              shadowColor: '#FF5722',
              shadowOpacity: 0.25,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 3 },
              elevation: 2,
            }}
            onPress={goToStatus}>
            <Text className="text-base font-bold text-white">
              {i18n.t('success_page.trackStatus')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="mt-4 items-center py-2" onPress={() => router.back()}>
            <Text className="font-poppinsMedium text-gray-500">
              {i18n.t('success_page.returnToHome')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SuccessView;
