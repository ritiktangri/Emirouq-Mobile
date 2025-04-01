import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';

const AdsList = () => {
  const adData = [
    {
      id: 1,
      imageUrl:
        'https://media.istockphoto.com/id/1436061606/photo/flying-colorful-womens-sneaker-isolated-on-white-background-fashionable-stylish-sports-shoe.jpg?s=612x612&w=0&k=20&c=2KKjX9tXo0ibmBaPlflnJNdtZ-J77wrprVStaPL2Gj4=',
      title: 'Modern Apartment in Downtown',
      category: 'Real Estate',
      location: 'New York, NY',
      status: 'Active',
      views: 1234,
      timeAgo: '2d ago',
    },
    {
      id: 2,
      imageUrl:
        'https://worldbalance.com.ph/cdn/shop/files/WBBEATRIXLGRAY-BLUE_14.jpg?v=1737085372&width=1080',
      title: '2022 Tesla Model 3',
      category: 'Vehicles',
      location: 'Los Angeles, CA',
      status: 'Pending',
      views: 856,
      timeAgo: '5d ago',
    },
    {
      id: 3,
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8kCtzxFOS1QKoATEkQ91V6hBieEa4ZTKbITFh9cBCGTGO0xc2f68muywyosC9SkfcWrI&usqp=CAU',
      title: 'iPhone 14 Pro Max',
      category: 'Electronics',
      location: 'Miami, FL',
      status: 'Expired',
      views: 2341,
      timeAgo: '1w ago',
    },
    {
      id: 4,
      imageUrl:
        'https://worldbalance.com.ph/cdn/shop/files/WBBEATRIXLGRAY-BLUE_14.jpg?v=1737085372&width=1080',
      title: 'Gaming PC Setup',
      category: 'Electronics',
      location: 'Chicago, IL',
      status: 'Active',
      views: 1567,
      timeAgo: '3d ago',
    },
  ];
  return (
    <View className="flex-1">
      <FlatList
        data={adData}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <AdItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 10 }}
      />
    </View>
  );
};

export default AdsList;

const AdItem = ({ item }: any) => {
  return (
    <View className="mb-4 rounded-lg border-b-[0.5px] border-gray-300 py-2">
      <View className="flex-row items-start">
        <Image
          source={{ uri: item.imageUrl }}
          contentFit="fill"
          placeholder={{ blurhash: 'LEHV6nWB2yk8pyo0adR*.7kCMdnj' }}
          transition={1000}
          style={{
            height: 80,
            width: 80,
            borderRadius: 10,
            marginRight: 8,
          }}
          className="mr-4 h-24 w-24 rounded-lg"
        />
        <View className="flex-1">
          <Text className="text-lg font-semibold">{item.title}</Text>
          <Text className="text-sm text-gray-500">
            {item.category} • {item.location}
          </Text>
          <Text
            className={`mt-1 rounded-full px-2 py-1 text-xs ${
              item.status === 'Active'
                ? 'bg-green-100 text-green-600'
                : item.status === 'Pending'
                  ? 'bg-yellow-100 text-yellow-600'
                  : 'bg-red-100 text-red-600'
            }`}
            style={{
              alignSelf: 'flex-start',
            }}>
            {item.status}
          </Text>
          <View className="mt-2 flex-row items-center">
            <Ionicons name="eye-outline" size={16} color="gray" />
            <Text className="ml-1 text-xs text-gray-500">{item.views}</Text>
            <MaterialIcons name="access-time" size={16} color="gray" className="ml-4" />
            <Text className="ml-1 text-xs text-gray-500">{item.timeAgo}</Text>
          </View>
        </View>
      </View>

      <View className="mt-4 flex-row justify-end">
        <TouchableOpacity className="mr-2 rounded-lg border border-orange-500 px-4 py-2">
          <Text className="text-orange-500">Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity className="rounded-lg border border-red-500 px-4 py-2">
          <Text className="text-red-500">Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
