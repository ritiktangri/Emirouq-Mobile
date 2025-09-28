/* eslint-disable import/order */
import { FontAwesome, Ionicons, Feather } from '@expo/vector-icons';
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
// Assuming you have an ExpoImage component or replace with standard Image
import { Image as ExpoImage } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalSearchParams, useRouter } from 'expo-router';

import { useGetSingleUser } from '~/hooks/auth/query';

import dayjs from 'dayjs';

import { useGetPosts } from '~/hooks/post/query';

const AdItem = ({ item }: any) => {
  return (
    <View className="mb-4 rounded-lg bg-white p-4">
      <View className="flex-row items-start">
        <Image source={{ uri: item?.file?.[0] }} className="mr-4 h-24 w-24 rounded-lg" />
        <View className="flex-1">
          <Text className="text-lg font-semibold">{item?.title}</Text>
          <Text className="text-sm text-gray-500">
            {item?.category?.title} • {item?.location?.name}
          </Text>
          {/* Status (only if you want to show it on public profiles) */}
          <View style={{ alignSelf: 'flex-start' }}>
            <Text
              className={`mt-1 rounded-full px-2 py-1 text-xs ${
                item?.status === 'active'
                  ? 'bg-green-100 text-green-600'
                  : item?.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-600'
                    : 'bg-red-100 text-red-600'
              }`}>
              {item?.status?.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>
      <View className="mt-2 flex-row items-center">
        <Ionicons name="heart" size={16} color="gray" />
        <Text className="ml-1 text-xs text-gray-500">{item?.likes?.length || 0}</Text>
        <Ionicons name="time-outline" size={16} color="gray" className="ml-4" />
        <Text className="ml-1 text-xs text-gray-500">
          {dayjs(item?.createdAt).fromNow() || 'N/A'}
        </Text>
      </View>
    </View>
  );
};

const SingleUserProfile = ({ adsData }: any) => {
  const router = useRouter();
  const params = useGlobalSearchParams();
  const { data }: any = useGetSingleUser(params.userId);
  let user = data?.data;
  const { isLoading, data: posts }: any = useGetPosts('', 'active', user?.uuid);
  const profileImageSource = user?.profileImage ? { uri: user.profileImage } : null;

  const i18n = {
    t: (key: any) => {
      switch (key) {
        case 'profile.adsPosted':
          return 'Ads Posted';
        case 'profile.itemsSold':
          return 'Items Sold';
        case 'profile.responseRate':
          return 'Response Rate';
        case 'profile.memberSince':
          return 'Member Since';
        case 'profile.contactSeller':
          return 'Contact Seller';
        default:
          return key;
      }
    },
  };
  if (isLoading) {
    return <ActivityIndicator color={'#FF5722'} />;
  }
  return (
    <SafeAreaView className="flex-1 bg-white">
      <TouchableOpacity
        className="ml-4"
        onPress={() => {
          router.back();
        }}>
        <Feather name="chevron-left" size={24} color="black" />
      </TouchableOpacity>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        className="bg-gray-100">
        <View className="mb-2 flex-col items-center gap-y-1 rounded-b-lg bg-white pb-6 pt-2">
          {profileImageSource ? (
            <View className="relative h-24 w-24 overflow-hidden rounded-full">
              <ExpoImage
                source={profileImageSource}
                contentFit="cover"
                placeholder={{ blurhash: 'LEHV6nWB2yk8pyo0adR*.7kCMdnj' }}
                transition={1000}
                style={{
                  height: '100%',
                  width: '100%',
                  borderRadius: 9999,
                }}
              />
            </View>
          ) : (
            <FontAwesome name="user-circle-o" size={96} color="gray" />
          )}

          <View className="mt-3 flex flex-col items-center gap-y-2">
            <Text className="text-center text-2xl font-bold text-gray-800">
              {user?.firstName} {user?.lastName || ''}
            </Text>
            <View className="flex-row items-center justify-center">
              <Text className="ml-1 text-center text-gray-600">{user?.email || 'N/A'}</Text>
            </View>
            <Text className="mt-1 text-center text-sm text-gray-500">
              {i18n.t('profile.memberSince')}:{' '}
              {dayjs(user?.createdAt).format('DD/MM/YYYY') || 'N/A'}
            </Text>
          </View>
        </View>

        {/* STATS - Reduced for Public View */}
        <View className="mx-4 mt-2 flex-row justify-around rounded-lg bg-white px-3 py-4">
          <View className="flex items-center">
            <Text className="text-xl font-bold text-gray-800">
              {posts?.pages?.[0]?.data?.length}
            </Text>
            <Text className="text-sm text-gray-600">{i18n.t('profile.adsPosted')}</Text>
          </View>
          <View className="flex items-center">
            <Text className="text-xl font-bold text-gray-800">0</Text>
            <Text className="text-sm text-gray-600">{i18n.t('profile.itemsSold')}</Text>
          </View>
          <View className="flex items-center">
            <Text className="text-xl font-bold text-gray-800">90%</Text>
            <Text className="text-sm text-gray-600">{i18n.t('profile.responseRate')}</Text>
          </View>
        </View>

        {/* <TouchableOpacity className="mx-4 mt-4 items-center rounded-lg bg-primary py-3">
          <Text className="text-lg font-semibold text-white">
            {i18n.t('profile.contactSeller')}
          </Text>
        </TouchableOpacity> */}

        <View className="mt-4 px-4">
          <Text className="mb-4 text-xl font-bold text-gray-800">Ads by {user?.firstName}</Text>
          {posts?.pages?.[0]?.data && posts?.pages?.[0]?.data?.length > 0 ? (
            <FlatList
              data={posts?.pages?.[0]?.data}
              renderItem={({ item }) => <AdItem item={item} />}
              keyExtractor={(item, index) => index?.toString()}
              scrollEnabled={false}
              ListEmptyComponent={() => (
                <View className="items-center py-10">
                  <Text className="text-lg text-gray-500">No ads posted yet.</Text>
                </View>
              )}
            />
          ) : (
            <View className="items-center py-10">
              <Text className="text-lg text-gray-500">No ads posted by this user yet.</Text>
            </View>
          )}
        </View>

        <View className="h-10"></View>
      </ScrollView>
    </SafeAreaView>
  );
};

const App = () => {
  const exampleUser = {
    firstName: 'Jane',
    lastName: 'Doe',
    profileImage:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    memberSince: 'Jan 2023',
  };

  const exampleAdsData = [
    {
      id: 1,
      imageUrl:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Vintage Camera Lens',
      category: 'Electronics',
      location: 'New York, NY',
      status: 'Active',
      views: 789,
      timeAgo: '1d ago',
    },
    {
      id: 2,
      imageUrl:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Handmade Wooden Chair',
      category: 'Furniture',
      location: 'Los Angeles, CA',
      status: 'Active',
      views: 456,
      timeAgo: '3d ago',
    },
    {
      id: 3,
      imageUrl:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Rare Comic Book Collection',
      category: 'Collectibles',
      location: 'Chicago, IL',
      status: 'Pending',
      views: 123,
      timeAgo: '5d ago',
    },
  ];

  return (
    <View className="flex-1">
      <SingleUserProfile user={exampleUser} adsData={exampleAdsData} />
    </View>
  );
};

export default App;
