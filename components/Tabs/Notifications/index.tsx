import { Ionicons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text } from '~/components/common/Text';
import { View } from '~/components/common/View';
import { useAuth } from '~/context/AuthContext';
import { useGetMyNotifications } from '~/hooks/notification/query';
import { cn } from '~/utils/helper';
import { i18n } from '~/utils/i18n';

dayjs.extend(relativeTime);

const getNotificationMeta = (item: any) => {
  const context = String(item?.contextType || item?.eventType || '').toLowerCase();

  if (context.includes('message')) {
    return {
      bubble: 'bg-orange-50',
      icon: 'chatbubble-ellipses-outline',
      iconColor: '#F97316',
    };
  }

  if (context.includes('offer')) {
    return {
      bubble: 'bg-amber-50',
      icon: 'pricetags-outline',
      iconColor: '#D97706',
    };
  }

  if (context.includes('payment') || context.includes('package') || context.includes('refund')) {
    return {
      bubble: 'bg-emerald-50',
      icon: 'card-outline',
      iconColor: '#059669',
    };
  }

  if (
    context.includes('verification') ||
    context.includes('security') ||
    context.includes('account')
  ) {
    return {
      bubble: 'bg-sky-50',
      icon: 'shield-checkmark-outline',
      iconColor: '#0284C7',
    };
  }

  if (context.includes('ad') || context.includes('favorite') || context.includes('saved')) {
    return {
      bubble: 'bg-fuchsia-50',
      icon: 'notifications-outline',
      iconColor: '#C026D3',
    };
  }

  return {
    bubble: 'bg-slate-100',
    icon: 'notifications-outline',
    iconColor: '#64748B',
  };
};

const formatContextLabel = (value: any) =>
  String(value || 'system')
    .replace(/_/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());

const Notifications = () => {
  const router = useRouter();
  const { user } = useAuth();

  const {
    data: notificationsResponse,
    isLoading,
    isFetching,
    refetch,
  }: any = useGetMyNotifications(user?.uuid, {
    limit: 50,
  });

  const notifications = notificationsResponse?.data ?? [];

  const renderEmptyState = () => {
    if (isLoading) {
      return (
        <View className="flex-1 items-center justify-center py-24">
          <ActivityIndicator size="large" color="#FF5722" />
          <Text className="mt-4 text-sm font-medium text-slate-500">Loading notifications...</Text>
        </View>
      );
    }

    return (
      <View className="flex-1 items-center justify-center px-8 py-24">
        <View className="mb-4 h-16 w-16 items-center justify-center rounded-[28px] bg-orange-50">
          <Ionicons name="notifications-off-outline" size={28} color="#FF5722" />
        </View>
        <Text className="text-center text-xl font-semibold text-slate-900">
          No notifications yet
        </Text>
        <Text className="mt-2 text-center text-sm leading-6 text-slate-500">
          You’ll see updates about messages, offers, payments, and account activity here.
        </Text>
      </View>
    );
  };

  const renderItem = ({ item }: any) => {
    const meta = getNotificationMeta(item);
    const isUnread = !item?.isRead;
    const timeLabel = item?.createdAt ? dayjs(item.createdAt).fromNow() : '--';
    const contextLabel = formatContextLabel(item?.contextType || item?.eventType);

    return (
      <View
        className={cn(
          'mb-2 rounded-2xl border border-slate-100 bg-white px-5 py-4',
          isUnread ? 'bg-blue-50/30' : '' // Subtle background tint for unread
        )}>
        <View className="flex-row items-start gap-4">
          {/* Icon Container with Relative positioning for Unread Dot */}
          <View className="relative">
            <View className={`h-11 w-11 items-center justify-center rounded-full ${meta.bubble}`}>
              <Ionicons name={meta.icon as any} size={20} color={meta.iconColor} />
            </View>

            {/* Unread Indicator - Attached to Icon */}
            {isUnread && (
              <View className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-primary" />
            )}
          </View>

          {/* Main Content Area */}
          <View className="flex-1">
            {/* Header: Title and Time inline */}
            <View className="mb-1 flex-row items-start justify-between">
              <Text
                className={cn(
                  'flex-1 pr-2 text-[15px] font-semibold text-slate-900',
                  !isUnread && 'text-slate-700'
                )}
                numberOfLines={1}>
                {item?.title || 'Notification'}
              </Text>

              <Text className="mt-0.5 text-xs font-medium text-slate-400">{timeLabel}</Text>
            </View>

            {/* Message Body */}
            <Text className="mb-2.5 text-[13px] leading-5 text-slate-500" numberOfLines={2}>
              {item?.message || '--'}
            </Text>

            {/* Footer / Context Label */}
            {contextLabel && (
              <View className="self-start rounded-md bg-slate-100 px-2 py-1">
                <Text className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  {contextLabel}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-[#F8FAFC]">
      <SafeAreaView edges={['top']} className="bg-primary">
        <View className="px-4 pb-5 pt-3">
          <View className="flex-row items-center justify-between">
            <TouchableOpacity
              onPress={() => router.back()}
              className="h-11 w-11 items-center justify-center rounded-2xl bg-white/15">
              <Ionicons name="chevron-back" size={24} color="white" />
            </TouchableOpacity>

            <View className="flex-1 items-center px-3">
              <Text className="text-[26px] font-semibold text-white">
                {i18n.t('notification.title')}
              </Text>
              <Text className="mt-1 text-xs text-orange-100">Recent updates from your account</Text>
            </View>

            <View className="h-11 w-11" />
          </View>
        </View>
      </SafeAreaView>

      <FlatList
        data={notifications}
        keyExtractor={(item, index) => String(item?.uuid || item?._id || item?.id || index)}
        renderItem={renderItem}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: 24,
        }}
        refreshControl={
          <RefreshControl
            refreshing={isFetching && !isLoading}
            onRefresh={refetch}
            colors={['#FF5722']}
            tintColor="#FF5722"
          />
        }
        ListHeaderComponent={
          notifications.length > 0 ? (
            <View className="mb-4 overflow-hidden rounded-[28px] bg-white shadow-[0px_12px_30px_rgba(15,23,42,0.05)]">
              <View className="flex-row items-center gap-3 px-4 py-4">
                <View className="h-11 w-11 items-center justify-center rounded-2xl bg-orange-50">
                  <Ionicons name="notifications-outline" size={20} color="#FF5722" />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-semibold text-slate-900">Latest activity</Text>
                  <Text className="mt-1 text-sm leading-6 text-slate-500">
                    Messages, offers, payments, and account updates appear here.
                  </Text>
                </View>
              </View>
            </View>
          ) : null
        }
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Notifications;
