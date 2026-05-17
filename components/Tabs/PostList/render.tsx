import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
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

  const regionalSpec = item?.properties?.find(
    (p: any) => p.attributeKey === 'regional_specification'
  )?.selectedValue?.value;
  console.log('item?.properties', item?.properties);
  const mileage = item?.properties?.find((p: any) => p.attributeKey === 'mileage')?.selectedValue
    ?.value;

  return (
    <TouchableOpacity
      className="mb-4 w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm shadow-slate-200"
      onPress={() => {
        router.push({
          pathname: routes.tabs.singlePost(item?.uuid),
          params: { title: `${item?.title}` },
        } as Href);
      }}>
      {/* Image Section */}
      <View className="relative h-56 w-full overflow-hidden bg-gray-50">
        <Image source={{ uri: item?.file?.[0] }} className="h-full w-full" resizeMode="cover" />
        {user?.uuid && <AddToFavourite item={item} />}
      </View>

      {/* Details Section */}
      <View className="gap-2 p-4">
        <View className="flex-row items-start justify-between">
          <View className="flex-1">
            <Text
              className="font-poppinsMedium text-xl leading-snug text-gray-900"
              numberOfLines={2}>
              {item?.title}
            </Text>
            <Text className=" text-base font-bold text-orange-500">
              {toCurrency(item?.price || 0)}
            </Text>
          </View>

          {(regionalSpec || mileage) && (
            <View className="ml-2 mt-1 flex-row items-center gap-1.5">
              {regionalSpec && (
                <View className="flex-row items-center rounded-lg border border-[#e1f2e8] bg-[#f3faf6] px-2.5 py-1">
                  <Ionicons name="shield-checkmark" size={14} color="#16a34a" />
                  <Text className="ml-1.5 text-[11px] font-semibold text-green-600">{regionalSpec}</Text>
                </View>
              )}
              {mileage && (
                <View className="flex-row items-center rounded-lg border border-[#d2e3fc] bg-[#f4f8fe] px-2.5 py-1">
                  <MaterialCommunityIcons name="speedometer" size={14} color="#2563eb" />
                  <Text className="ml-1.5 text-[11px] font-semibold text-blue-600">{mileage} km</Text>
                </View>
              )}
            </View>
          )}
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
