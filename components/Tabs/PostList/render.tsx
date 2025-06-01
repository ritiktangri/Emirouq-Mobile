import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { Href, useRouter } from 'expo-router';
import { routes } from '~/utils/routes';
import AddToFavourite from '../Dashboard/AddToFavourite';
import { useAuth } from '~/context/AuthContext';

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

      <View className="p-4">
        <View className="mb-1 flex-row items-center justify-between">
          <Text className="w-[98%] text-sm font-semibold text-gray-900">{item?.title}</Text>
        </View>
        <Text className="mb-2 text-base font-bold text-orange-500">${item?.price || 0}</Text>

        <View className="flex-row items-center">
          <Entypo name="location-pin" size={16} color="#6b7280" />
          <Text className="ml-1 text-xs text-gray-500">{item?.location?.name || 'N/A'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Render;
