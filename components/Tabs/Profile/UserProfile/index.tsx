/* eslint-disable import/order */
import {
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Alert,
} from 'react-native';
import React from 'react';
import { useAuth } from '~/context/AuthContext';
import { Image as ExpoImage } from 'expo-image';
import {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { useLocale } from '~/context/LocaleContext';
import { arabic, english } from '~/image';
import { i18n } from '~/utils/i18n';
import { Text } from '~/components/common/Text';
import { Href, useRouter } from 'expo-router';
import { routes } from '~/utils/routes';
import { View } from '~/components/common/View';
import { useAuth as ClerkUseAuth } from '@clerk/clerk-expo';
import { queryClient } from '~/app/_layout';
import { useLocation } from '~/context/LocationContext';
import { useGetMySubscriptions } from '~/hooks/stripe/query';

const UserProfile = () => {
  const { signOut } = ClerkUseAuth();
  const { address }: any = useLocation();
  const { user } = useAuth();
  const { data: subscriptionsResponse, isLoading: isSubscriptionsLoading }: any =
    useGetMySubscriptions(user?.uuid);
  const { locale } = useLocale();
  const router = useRouter();
  const profileImage = {
    uri:
      user?.profileImage ||
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D',
  };

  const { logout } = useAuth();
  const subscriptions = subscriptionsResponse?.data ?? [];
  const subscriptionCount = subscriptions.length;

  const formatCount = (value: any) => {
    const numericValue = Number(value);
    return Number.isFinite(numericValue) ? numericValue : '--';
  };

  const formatStatus = (value: any) =>
    String(value || 'inactive')
      .replace(/[_-]/g, ' ')
      .split(' ')
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  const isActiveStatus = (value: any) =>
    ['active', 'trialing'].includes(String(value || '').toLowerCase());

  const activeSubscriptionCount = subscriptions.filter((subscription: any) =>
    isActiveStatus(subscription?.status)
  ).length;

  const getStatusTone = (value: any) => {
    const status = String(value || '').toLowerCase();
    if (status === 'active') {
      return {
        accent: 'bg-emerald-400',
        badge: 'bg-emerald-50',
        text: 'text-emerald-700',
      };
    }
    if (status === 'trialing') {
      return {
        accent: 'bg-amber-400',
        badge: 'bg-amber-50',
        text: 'text-amber-700',
      };
    }
    return {
      accent: 'bg-slate-300',
      badge: 'bg-slate-100',
      text: 'text-slate-600',
    };
  };

  const getProgressWidth = (allowed: any, used: any) => {
    const allowedNumber = Number(allowed);
    const usedNumber = Number(used);
    if (!Number.isFinite(allowedNumber) || allowedNumber <= 0 || !Number.isFinite(usedNumber)) {
      return '0%';
    }

    return `${Math.min(100, Math.round((usedNumber / allowedNumber) * 100))}%`;
  };

  const addressStr = `${address?.name ? `${address?.name},` : ''} ${address?.district ? `${address?.district},` : ''} ${address?.city ? `${address?.city},` : ''} ${address?.country || ''}`;
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="">
          <View className="flex-col items-center gap-y-1 rounded-lg bg-white py-4">
            {profileImage?.uri || user?.profileImage ? (
              <View className="relative h-[80px] w-[80px] rounded-full ">
                <ExpoImage
                  source={{ uri: profileImage?.uri || user?.profileImage }}
                  contentFit="cover"
                  placeholder={{ blurhash: 'LEHV6nWB2yk8pyo0adR*.7kCMdnj' }}
                  transition={1000}
                  style={{
                    height: '100%',
                    width: '100%',
                    borderRadius: 100,
                  }}
                />
              </View>
            ) : (
              <FontAwesome name="user-circle-o" size={80} color="gray" />
            )}
            <View className="flex flex-col items-center gap-y-2">
              <Text className="text-center text-lg font-semibold">{`${user?.firstName} ${user?.lastName || ''}`}</Text>
              <Text className="text-center text-gray-600">{user?.email}</Text>
              {address && (
                <View className="flex-row items-center justify-center ">
                  <EvilIcons name="location" size={18} color="#4b5563" />
                  <Text className="text-center text-gray-600">{addressStr}</Text>
                </View>
              )}
            </View>
          </View>

          {/* STATS */}
          {/* <View className="mt-2 flex-row justify-between rounded-lg bg-white px-3 py-3">
            <View className="flex items-center">
              <Text className="text-xl font-semibold">45</Text>
              <Text>Ads Posted</Text>
            </View>
            <View className="flex items-center">
              <Text className="text-xl font-semibold">38</Text>
              <Text>Items Sold</Text>
            </View>
            <View className="flex items-center">
              <Text className="text-xl font-semibold">90%</Text>
              <Text>Response Rate</Text>
            </View>
          </View> */}
          {/* PERSONAL INFORMATION */}
          <View className="mt-3 overflow-hidden rounded-[28px] bg-white shadow-[0px_12px_30px_rgba(15,23,42,0.04)]">
            <View className="px-5 py-5">
              <Text className="text-lg font-semibold text-slate-900">
                {i18n.t('profile.personalInformation')}
              </Text>
              <View className="mt-4">
                <View direction={locale} className="items-start gap-3 py-3">
                  <AntDesign name="mobile1" size={24} color="gray" />
                  <View className="w-full flex-col border-b border-slate-100 pb-3">
                    <Text placement={locale} className="text-sm text-slate-500">
                      {i18n.t('profile.phone')}
                    </Text>
                    <Text placement={locale} className="text-base text-slate-900">
                      {user?.phoneNumber || '--'}
                    </Text>
                  </View>
                </View>
                <View direction={locale} className="items-start gap-3 py-3">
                  <Fontisto name="email" size={24} color="gray" />
                  <View className="w-full flex-col border-b border-slate-100 pb-3">
                    <Text placement={locale} className="text-sm text-slate-500">
                      {i18n.t('profile.email')}
                    </Text>
                    <Text placement={locale} className="text-base text-slate-900">
                      {user?.email}
                    </Text>
                  </View>
                </View>
                {/* <View direction={locale} className="items-start gap-3 py-3">
                <EvilIcons name="location" size={24} color="gray" />
                <View className="flex-col">
                  <Text placement={locale} className="text-sm text-slate-500">
                    {i18n.t('profile.location')}
                  </Text>
                  <Text placement={locale} className="text-base text-slate-900">
                    {addressStr}
                  </Text>
                </View>
              </View> */}
              </View>
            </View>
          </View>
          {/* ACCOUNT SETTINGS */}
          <View className="my-3 overflow-hidden rounded-[28px] bg-white shadow-[0px_12px_30px_rgba(15,23,42,0.04)]">
            <View className="px-5 py-5">
              <Text placement={locale} className="text-lg font-semibold text-slate-900">
                {i18n.t('profile.accountSettings')}
              </Text>
            </View>
            <View className="px-3 pb-4">
              <TouchableOpacity
                onPress={() => {
                  router.push({
                    pathname: routes.tabs.profile['select-language'],
                    params: {
                      headerTitle: 'profile.language',
                    },
                  } as Href);
                }}
                className="mb-2 rounded-[18px] bg-slate-50/80 px-3 py-3">
                <View direction={locale} className="w-full justify-between">
                  <View direction={locale} className="flex-1">
                    <Image
                      source={locale === 'ar' ? arabic : english}
                      className="h-8 w-8 rounded-full"
                    />
                    <Text className="font-poppinsMedium">{i18n.t('profile.language')}</Text>
                  </View>

                  <View direction={locale} className="">
                    <Text className="font-poppinsMedium">
                      {locale === 'ar' ? 'العربية' : 'English'}
                    </Text>
                    <Ionicons
                      name={locale === 'ar' ? 'chevron-back-outline' : 'chevron-forward-outline'}
                      size={20}
                      color="gray"
                    />
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-row items-center justify-between rounded-[18px] bg-slate-50/80 px-3 py-3"
                onPress={() => {
                  router.push(routes.tabs.help_support as Href);
                }}>
                <View className="flex-row items-center gap-x-2">
                  <Feather name="help-circle" size={20} color="gray" />
                  <Text className="text-slate-900">Help & Support</Text>
                </View>
                <Entypo name="chevron-right" size={20} color="#64748b" />
              </TouchableOpacity>
            </View>
            {/* <View className="my-3 flex-row items-center justify-between">
              <View className="flex-row  items-center gap-x-2">
                <Ionicons name="notifications-outline" size={20} color="gray" />
                <Text className="">Direct Messages</Text>
              </View>
              <Switch value={true} />
            </View>
            <View className="my-3 flex-row items-center justify-between">
              <View className="flex-row  items-center gap-x-2">
                <Feather name="lock" size={20} color="gray" />
                <Text className="">Two Factor Authentication</Text>
              </View>
              <Switch value={true} />
            </View> */}
          </View>
          {/* SUBSCRIPTIONS */}
          <View className="mt-3 overflow-hidden rounded-[32px] bg-white shadow-[0px_16px_40px_rgba(15,23,42,0.05)]">
            <View className="bg-[#FFF7F3] px-5 py-5">
              <View className="flex-row items-start gap-4">
                <View className="h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-[0px_8px_18px_rgba(15,23,42,0.04)]">
                  <MaterialCommunityIcons name="credit-card-outline" size={22} color="#FF5722" />
                </View>
                <View className="flex-1">
                  <Text className="text-[18px] font-semibold text-slate-900">My Subscriptions</Text>
                  <Text className="mt-1 text-sm text-slate-500">
                    Category-wise plans on your account
                  </Text>
                </View>
              </View>

              <View className="mt-4 flex-row flex-wrap gap-2">
                <View className="rounded-full bg-white/85 px-3 py-1.5">
                  <Text className="text-xs font-semibold text-slate-600">
                    {subscriptionCount} plan{subscriptionCount === 1 ? '' : 's'}
                  </Text>
                </View>
                <View className="rounded-full bg-emerald-50 px-3 py-1.5">
                  <Text className="text-xs font-semibold text-emerald-700">
                    {activeSubscriptionCount} active
                  </Text>
                </View>
              </View>
            </View>

            <View className="px-5 py-5">
              {isSubscriptionsLoading ? (
                <View className="rounded-[24px] bg-slate-50/80 p-4">
                  <Text className="text-sm text-slate-500">Loading subscriptions...</Text>
                </View>
              ) : subscriptions?.length ? (
                <View className="gap-y-4">
                  {subscriptions.map((subscription: any) => {
                    const categoryTitle =
                      subscription?.category?.title ||
                      subscription?.subscriptionPlan?.categoryId ||
                      'Category';
                    const planName = subscription?.subscriptionPlan?.name || '--';
                    const allowedPosts = formatCount(subscription?.subscriptionPlan?.numberOfAds);
                    const usedPosts = formatCount(subscription?.postsUsed);
                    const status = subscription?.status;
                    const statusTone = getStatusTone(status);
                    const allowedValue = Number(allowedPosts);
                    const usedValue = Number(usedPosts);
                    const showProgress =
                      Number.isFinite(allowedValue) &&
                      allowedValue > 0 &&
                      Number.isFinite(usedValue);
                    const progressWidth = showProgress
                      ? getProgressWidth(allowedValue, usedValue)
                      : '0%';

                    return (
                      <View
                        key={subscription?.uuid || subscription?.subscriptionId}
                        className="overflow-hidden rounded-[28px] bg-[#FCFCFE] shadow-[0px_10px_28px_rgba(15,23,42,0.05)]">
                        <View className={`h-1.5 w-full ${statusTone.accent}`} />
                        <View className="p-5">
                          <View className="flex-row items-start justify-between gap-3">
                            <View className="flex-1">
                              <Text className="text-[11px] font-bold uppercase tracking-[0.28em] text-slate-400">
                                Category
                              </Text>
                              <Text className="mt-1 text-[21px] font-semibold leading-tight text-slate-900">
                                {categoryTitle}
                              </Text>
                              <View className="mt-3 flex-row items-center gap-x-2">
                                <View className="rounded-full bg-slate-50 px-3 py-1.5">
                                  <Text className="text-xs font-semibold text-slate-600">
                                    {planName}
                                  </Text>
                                </View>
                              </View>
                            </View>

                            <View className={`rounded-full px-3 py-1.5 ${statusTone.badge}`}>
                              <Text className={`text-xs font-semibold ${statusTone.text}`}>
                                {formatStatus(status)}
                              </Text>
                            </View>
                          </View>

                          <View className="mt-4 flex-row gap-3">
                            <View className="flex-1 rounded-[22px] bg-[#FFF8F1] p-4">
                              <Text className="text-[10px] font-bold uppercase tracking-[0.24em] text-orange-400">
                                Allowed
                              </Text>
                              <Text className="mt-2 text-[26px] font-semibold leading-none text-orange-600">
                                {allowedPosts}
                              </Text>
                            </View>

                            <View className="flex-1 rounded-[22px] bg-[#F2F7FF] p-4">
                              <Text className="text-[10px] font-bold uppercase tracking-[0.24em] text-blue-400">
                                Used
                              </Text>
                              <Text className="mt-2 text-[26px] font-semibold leading-none text-blue-600">
                                {usedPosts}
                              </Text>
                            </View>
                          </View>

                          {showProgress ? (
                            <View className="mt-4">
                              <View className="mb-2 flex-row items-center justify-between">
                                <Text className="text-xs font-medium text-slate-500">
                                  Usage progress
                                </Text>
                                <Text className="text-xs font-semibold text-slate-700">
                                  {usedPosts}/{allowedPosts}
                                </Text>
                              </View>
                              <View className="h-2 overflow-hidden rounded-full bg-slate-100">
                                <View
                                  className="h-full rounded-full bg-orange-400"
                                  style={{ width: progressWidth }}
                                />
                              </View>
                            </View>
                          ) : null}
                        </View>
                      </View>
                    );
                  })}
                </View>
              ) : (
                <View className="rounded-[24px] bg-slate-50/80 p-4">
                  <Text className="text-sm text-slate-500">No subscriptions found.</Text>
                </View>
              )}
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              router.navigate({
                pathname: routes.tabs.create_profile,
                params: {
                  isEdit: true,
                },
              } as unknown as Href);
            }}
            className="my-2 flex-row items-center justify-center gap-x-3 rounded-xl border-2 border-primary py-2">
            <Feather name="edit-2" size={16} color="#FF5722" />
            <Text className="font-semibold text-primary">{i18n.t('profile.edit_profile')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                'Confirm Logout',
                'Are you sure you want to log out?',
                [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                  {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: () => {
                      logout(() => {
                        signOut();
                        queryClient.clear();
                      });
                    },
                  },
                ],
                { cancelable: true }
              )
            }
            className="my-2 flex-row items-center justify-center gap-x-3 rounded-xl border-2 border-red-500 py-2">
            <Ionicons name="log-out" size={20} color="red" />
            <Text className="font-semibold text-red-500">{i18n.t('profile.logout')}</Text>
          </TouchableOpacity>
          <View className="mt-6 rounded-t-xl border-t border-gray-300 p-2">
            <View className="mb-2 flex-row items-center justify-center gap-x-2">
              <Feather name="mail" size={18} color="#4B5563" />
              <Text className="text-sm font-medium text-gray-700">Support@emirouq.ae</Text>
            </View>
            <View className="flex-row items-center justify-center gap-x-2">
              <Feather name="clock" size={18} color="#4B5563" />
              <Text className="text-sm font-medium text-gray-700">Support Hours: 9 AM - 6 PM</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default UserProfile;
