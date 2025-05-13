import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const Notifications = () => {
  const notifications = [
    {
      id: '1',
      title: 'New message from Sarah',
      description: 'Interested in your iPhone 13',
      time: '2m ago',
      type: 'message',
    },
    {
      id: '2',
      title: 'New offer received',
      description: '$450 for Gaming Console',
      time: '15m ago',
      type: 'offer',
    },
    {
      id: '3',
      title: 'Price drop alert',
      description: 'MacBook Pro price reduced by 10%',
      time: '1h ago',
      type: 'alert',
    },
  ];

  const NotificationItem = ({ item }: any) => {
    const bgColor =
      item.type === 'message'
        ? 'bg-orange-50'
        : item.type === 'offer'
          ? 'bg-orange-50'
          : 'bg-gray-100';

    const iconColor =
      item.type === 'message' ? '#f97316' : item.type === 'offer' ? '#f97316' : '#6b7280';

    return (
      <TouchableOpacity className={`mb-3 flex-row items-center rounded-xl p-4 ${bgColor}`}>
        <View className="mr-3 rounded-full bg-white p-2">
          {/* {item.type === 'message' && <MessageCircle size={20} color={iconColor} />}
          {item.type === 'offer' && <Tag size={20} color={iconColor} />}
          {item.type === 'alert' && <Bell size={20} color={iconColor} />} */}
        </View>

        <View className="flex-1">
          <Text className="font-semibold text-gray-800">{item.title}</Text>
          <Text className="mt-1 text-gray-500">{item.description}</Text>
        </View>

        <Text className="ml-2 text-xs text-gray-400">{item.time}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="bg-orange-500 px-4 py-4">
        <Text className="text-lg font-bold text-white">Notifications</Text>
      </View>

      <View className="mb-2 mt-4 px-4">
        <Text className="font-semibold text-gray-500">Today</Text>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NotificationItem item={item} />}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />
    </SafeAreaView>
  );
};

export default Notifications;
