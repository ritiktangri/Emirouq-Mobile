import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { Href, useRouter } from 'expo-router';
import { routes } from '~/utils/routes';
import AddToFavourite from '../Dashboard/AddToFavourite';
import { useAuth } from '~/context/AuthContext';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const Render = ({ item, index }: any) => {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <TouchableOpacity
      className={` ${index % 2 === 0 ? 'mr-2' : ''} w-[49%] overflow-hidden rounded-2xl border-[0.4px] border-gray-300 bg-white shadow-sm shadow-slate-50`}
      onPress={() => {
        router.push({
          pathname: routes.tabs.singlePost(item?.uuid),
          params: {
            title: `${item?.title}`,
          },
        } as Href);
      }}>
      <View className="overflow-hidden rounded-t-2xl">
        <Image source={{ uri: item?.file?.[0] }} className="h-44 w-full" resizeMode="cover" />
      </View>
      {user?.uuid && <AddToFavourite item={item} />}

      <View className="p-2">
        <View className="mb-1 flex-row items-center justify-between">
          <Text className="flex-1 font-interMedium text-sm text-gray-900" numberOfLines={2}>
            {item?.title}
          </Text>
          {/* Timestamp */}
          <View className="ml-1 flex-row items-center">
            <Entypo name="clock" size={12} color="#9ca3af" />
            <Text className="ml-0.5 text-[10px] text-gray-400">
              {item?.createdAt ? dayjs(item?.createdAt).fromNow() : 'Now'}
            </Text>
          </View>
        </View>
        <Text className="mb-2 text-base font-bold text-orange-500">AED {item?.price || 0}</Text>

        <View className="flex-row p-1 ">
          <Entypo name="location-pin" size={16} color="#6b7280" />
          <Text className="ml-1 text-xs text-gray-500">{item?.location?.name || 'N/A'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Render;
