import { View, Text, TouchableOpacity, Modal, Image, FlatList } from 'react-native';
import React, { useState } from 'react';
import { cn } from '~/utils/helper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import AddTicket from './AddTicket';
import { Ionicons } from '@expo/vector-icons';
import { useGetSupportTickets } from '~/hooks/support/query';

const HelpSupport = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const { data: tickets, refetch }: any = useGetSupportTickets({});
  console.log('tickets', tickets);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const renderItem = ({ item }: any) => (
    <View className="mb-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm shadow-white">
      <Text className="mb-1 text-lg font-semibold text-[#FF5722]">{item.title}</Text>
      <Text className="mb-2 text-gray-700">{item.description}</Text>

      {item.attachments && (
        <Image
          source={{ uri: item.attachments[0]?.url }}
          className="mb-2 h-40 w-full rounded-xl"
          resizeMode="cover"
        />
      )}

      <View className="mt-2 flex-row items-center justify-between">
        <Text
          className={`rounded-full px-2 py-1 text-xs ${
            item.responded === false ? 'bg-green-100 text-green-700' : 'bg-gray-300 text-gray-700'
          }`}>
          {item.responded ? 'Closed' : 'Open'}
        </Text>
        <Text className="text-xs text-gray-500">{formatDate(item.createdAt)}</Text>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView edges={['top']} className={cn('flex-row rounded-b-xl', 'bg-primary')}>
        <View className="flex-row items-center justify-between bg-primary p-4">
          <View className="w-[10%]">
            <Ionicons name="chevron-back" size={24} color="white" onPress={() => router.back()} />
          </View>
          <View className="w-[80%] items-center justify-center bg-primary">
            <Text className=" text-center text-2xl font-semibold capitalize text-white">
              Help & Support
            </Text>
          </View>
          <View className="w-[10%]" />
        </View>
      </SafeAreaView>
      <View className="flex-1 bg-white p-4">
        <View className="my-2 flex-row items-center justify-between">
          <Text className="text-xl font-semibold">My Tickets</Text>
          <TouchableOpacity
            className="self-end rounded-xl bg-[#FF5722] px-3 py-2"
            onPress={() => setModalVisible(true)}>
            <Text className="font-semibold text-white">Create Ticket</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={tickets?.data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <AddTicket
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        refetchTickets={refetch}
      />
    </View>
  );
};

export default HelpSupport;
