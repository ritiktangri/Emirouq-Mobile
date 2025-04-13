import { View, Text, ScrollView, Image, Pressable } from 'react-native';
import React from 'react';
import { AntDesign, Entypo, SimpleLineIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const AdsDashboard = () => {
  const adsData = [
    {
      title: 'Summer Collection Sale',
      views: '5.2K',
      clicks: 820,
      growth: '+12%',
      image:
        'https://emirouq.s3.me-central-1.amazonaws.com/posts/IMG_0111-bf2e6c95-9443-42be-89af-793eaba7404f.jpg',
    },
    {
      title: 'New Arrivals Promotion',
      views: '4.8K',
      clicks: 756,
      growth: '+8%',
      image:
        'https://emirouq.s3.me-central-1.amazonaws.com/posts/IMG_0005-090b47ee-6a68-4b3e-9554-7faf2926e38b.jpg',
    },
    {
      title: 'Special Discount Event',
      views: '4.1K',
      clicks: 623,
      growth: '+5%',
      image:
        'https://emirouq.s3.me-central-1.amazonaws.com/posts/IMG_0111-bf2e6c95-9443-42be-89af-793eaba7404f.jpg',
    },
  ];

  return (
    <ScrollView className="bg-white p-2" showsVerticalScrollIndicator={false}>
      {/* Stats Section */}
      <View className="flex-row flex-wrap justify-between">
        <View className="mb-4 w-[48%] rounded-2xl bg-gray-100 p-4">
          <AntDesign name="eyeo" size={20} color="#FF5722" />
          <Text className="text-2xl font-bold">12,458</Text>
          <View className="mt-2 flex-row items-center justify-between">
            <Text className="text-gray-500">Total Views</Text>
            <Text className="mt-1 text-green-500">+15% ↑</Text>
          </View>
        </View>
        <View className="mb-4 w-[48%] rounded-2xl bg-gray-100 p-4">
          <Entypo name="bar-graph" size={20} color="#FF5722" />
          <Text className="text-2xl font-bold">2,845</Text>
          <View className="mt-2 flex-row items-center justify-between">
            <Text className="text-gray-500">Clicks</Text>
            <Text className="mt-1 text-green-500">+8% ↑</Text>
          </View>
        </View>
        <View className="mb-4 w-[48%] rounded-2xl bg-gray-100 p-4">
          <AntDesign name="mail" size={20} color="#FF5722" />
          <Text className="text-2xl font-bold">856</Text>
          <View className="mt-2 flex-row items-center justify-between">
            <Text className="text-gray-500">Messages</Text>
            <Text className="mt-1 text-green-500">+12% ↑</Text>
          </View>
        </View>
        <View className="mb-4 w-[48%] rounded-2xl bg-gray-100 p-4">
          <SimpleLineIcons name="graph" size={20} color="#FF5722" />
          <Text className="text-2xl font-bold">6.8%</Text>
          <View className="mt-2 flex-row items-center justify-between">
            <Text className="text-gray-500">Conversion</Text>
            <Text className="mt-1 text-green-500">+5% ↑</Text>
          </View>
        </View>
      </View>

      {/* Top Ads */}
      <Text className="mb-3 mt-2 text-lg font-semibold text-gray-800">Top Performing Ads</Text>

      <View className="gap-y-3">
        {adsData.map((ad, index) => (
          <View key={index} className="flex-row items-center rounded-xl bg-gray-100 p-3">
            <Image source={{ uri: ad.image }} className="mr-3 h-14 w-14 rounded-lg" />
            <View className="flex-1">
              <Text className="font-medium text-gray-800">{ad.title}</Text>
              <Text className="text-sm text-gray-500">
                {ad.views} views · {ad.clicks} clicks
              </Text>
            </View>
            <Text className="font-medium text-green-500">{ad.growth} ↑</Text>
          </View>
        ))}
      </View>

      {/* Promote CTA */}
      <LinearGradient
        colors={['#3b82f6', '#6366f1']}
        style={{
          borderRadius: 10,
          marginTop: 12,
        }}>
        <View className="rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 p-4">
          <Text className="mb-1 text-lg font-bold text-white">🚀 Boost Performance</Text>
          <Text className="mb-3 text-white">Reach 5x more customers</Text>
          <Pressable className="mt-2 w-full rounded-md bg-white px-4 py-2">
            <Text className="text-center font-semibold text-blue-600">Promote Ad</Text>
          </Pressable>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

export default AdsDashboard;
