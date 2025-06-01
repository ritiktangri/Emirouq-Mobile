import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { i18n } from '~/utils/i18n';
import { cn } from '~/utils/helper';
import { useRouter } from 'expo-router';

const Notifications = () => {
  const router = useRouter();
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
    {
      id: '4',
      title: 'New message from Sarah',
      description: 'Interested in your iPhone 13',
      time: '2m ago',
      type: 'message',
    },
    {
      id: '5',
      title: 'New offer received',
      description: '$450 for Gaming Console',
      time: '15m ago',
      type: 'offer',
    },
    {
      id: '6',
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
          {item.type === 'message' && <AntDesign name="mail" size={20} color={iconColor} />}
          {item.type === 'offer' && <AntDesign name="paperclip" size={20} color={iconColor} />}
          {item.type === 'alert' && <AntDesign name="hearto" size={20} color={iconColor} />}
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
    <View className="flex-1 bg-white">
      <SafeAreaView edges={['top']} className={cn('flex-row rounded-b-xl', 'bg-primary')}>
        <View className="flex-row items-center justify-between bg-primary p-4">
          <View className="w-[10%]">
            <Ionicons name="chevron-back" size={24} color="white" onPress={() => router.back()} />
          </View>
          <View className="w-[80%] items-center justify-center bg-primary">
            <Text className=" text-center text-2xl font-semibold capitalize text-white">
              {i18n.t('notification.title')}
            </Text>
          </View>
          <View className="w-[10%]" />
        </View>
      </SafeAreaView>
      <View className="mt-4 flex-1 bg-white">
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <NotificationItem item={item} />}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        />
      </View>
    </View>
  );
};

export default Notifications;
