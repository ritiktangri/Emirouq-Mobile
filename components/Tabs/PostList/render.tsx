import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { Href, useRouter } from 'expo-router';
import { routes } from '~/utils/routes';
import AddToFavourite from '../Dashboard/AddToFavourite';
import { useAuth } from '~/context/AuthContext';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { toCurrency } from '~/utils/helper';

dayjs.extend(relativeTime);

const Render = ({ item }: any) => {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <TouchableOpacity
      className="mb-2 w-full flex-row gap-3 overflow-hidden rounded-2xl border border-gray-200 bg-white p-3 shadow-sm shadow-slate-200"
      onPress={() => {
        router.push({
          pathname: routes.tabs.singlePost(item?.uuid),
          params: { title: `${item?.title}` },
        } as Href);
      }}>
      {/* Image Section */}
      <View className="relative h-32 w-32 shrink-0 overflow-hidden rounded-xl bg-gray-50">
        <Image source={{ uri: item?.file?.[0] }} className="h-full w-full" resizeMode="cover" />
        {user?.uuid && <AddToFavourite item={item} />}
      </View>

      {/* Details Section */}
      <View className=" flex-1  gap-2">
        <View>
          <Text className="font-poppinsMedium text-xl leading-snug text-gray-900" numberOfLines={2}>
            {item?.title}
          </Text>
          <Text className=" text-base font-bold text-orange-500">
            {toCurrency(item?.price || 0)}
          </Text>
        </View>

        <View className="flex-row items-center gap-2">
          <Entypo name="location" size={16} color="#6b7280" />
          <Text className=" flex-1 text-sm text-gray-500">{item?.location?.name || 'N/A'}</Text>
        </View>
        <View className="flex-row items-center gap-2">
          <Ionicons name="time-outline" size={16} color="#9ca3af" />
          <Text className=" text-sm text-gray-700">
            {item?.createdAt ? dayjs(item?.createdAt).fromNow() : 'Now'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Render;
