import { Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Href, useRouter } from 'expo-router';
import React, { useRef } from 'react';
import { Platform, View, Text } from 'react-native';
import { Pressable } from 'react-native-gesture-handler';

import AddToFavourite from '../Dashboard/AddToFavourite';
import ImageSlider from '../Post/SinglePost/imageSlider';

import { width } from '~/constants/Colors';
import { useAuth } from '~/context/AuthContext';
import { toCurrency } from '~/utils/helper';
import { routes } from '~/utils/routes';

dayjs.extend(relativeTime);

const Render = ({ item }: any) => {
  const router = useRouter();
  const { user } = useAuth();
  const swipeInProgressRef = useRef(false);
  const lastSwipeAtRef = useRef(0);

  const regionalSpec = item?.properties?.find(
    (p: any) => p.attributeKey === 'regional_specification'
  )?.selectedValue?.value;
  const mileage = item?.properties?.find((p: any) => p.attributeKey === 'mileage')?.selectedValue
    ?.value;

  const handleSwipeStart = () => {
    swipeInProgressRef.current = true;
    lastSwipeAtRef.current = Date.now();
  };

  const handleSwipeEnd = () => {
    swipeInProgressRef.current = false;
    lastSwipeAtRef.current = Date.now();
  };

  return (
    <Pressable
      className="mb-4 w-full overflow-hidden rounded-2xl border border-gray-800 bg-white shadow-sm shadow-slate-200"
      style={[
        {
          borderWidth: 1,
          borderColor: '#E5E7EB',
          borderRadius: 16,
          backgroundColor: '#FFFFFF',
          overflow: 'hidden',
        },
        Platform.OS === 'android'
          ? { elevation: 0 }
          : {
              shadowColor: '#0F172A',
              shadowOpacity: 0.05,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 2 },
            },
      ]}
      onPress={() => {
        if (!(swipeInProgressRef.current || Date.now() - lastSwipeAtRef.current < 300)) {
          router.push({
            pathname: routes.tabs.singlePost(item?.uuid),
            params: { title: `${item?.title}` },
          } as Href);
        }
      }}>
      {/* Image Section */}
      <View className="relative w-full bg-gray-50">
        <ImageSlider
          images={item?.file || []}
          width={width - 16}
          height={224}
          containerStyle={{ width: width - 16, height: 224 }}
          onSwipeStart={handleSwipeStart}
          onSwipeEnd={handleSwipeEnd}
        />
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
                  <Text className="ml-1.5 text-[11px] font-semibold text-green-600">
                    {regionalSpec}
                  </Text>
                </View>
              )}
              {mileage && (
                <View className="flex-row items-center rounded-lg border border-[#d2e3fc] bg-[#f4f8fe] px-2.5 py-1">
                  <MaterialCommunityIcons name="speedometer" size={14} color="#2563eb" />
                  <Text className="ml-1.5 text-[11px] font-semibold text-blue-600">
                    {mileage} km
                  </Text>
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
    </Pressable>
  );
};

export default Render;
