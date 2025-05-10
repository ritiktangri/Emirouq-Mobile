/* eslint-disable import/order */
import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { getRelativeTime } from '~/utils/helper';
import { Href, useRouter } from 'expo-router';
import { routes } from '~/utils/routes';
import { i18n } from '~/utils/i18n';
const status: any = {
  active: 'Active',
  draft: 'Draft',
  pending: 'Pending',
  inactive: 'Inactive',
  expired: 'Expired',
};

const Render = ({ item }: any) => {
  const router = useRouter();
  return (
    <View className="mb-4 rounded-lg border-b-[0.5px] border-gray-300 py-2">
      <TouchableOpacity
        onPress={() => {
          router.push({
            pathname: routes.tabs.singlePost(item?.uuid),
            params: {
              title: `${item?.title}`,
            },
          } as Href);
        }}
        className="flex-row  gap-4">
        <View className=" h-[80px] w-[80px]">
          <Image
            source={{ uri: item?.file?.[0] }}
            style={{
              height: '100%',
              width: '100%',
              borderRadius: 10,
            }}
            className=" h-24 w-24 rounded-lg"
          />
        </View>
        <View className="flex-1">
          <Text className="text-lg font-semibold">{item?.title}</Text>
          <Text className="text-sm text-gray-500">
            {item?.category?.title} • {item.location?.name}
          </Text>
          <Text
            className={`mt-1 self-start rounded-full px-2 py-1  ${
              item.status === 'active'
                ? 'bg-green-100 text-green-600'
                : item.status === 'draft'
                  ? 'bg-yellow-100 text-yellow-600'
                  : 'bg-red-100 text-red-600'
            }`}>
            {status[item.status]}
          </Text>
          <View className="mt-2 flex-row items-center">
            <Ionicons name="eye-outline" size={16} color="gray" />
            <Text className="ml-1 text-sm text-gray-500">{item.views || 0}</Text>
            <MaterialIcons name="access-time" size={16} color="gray" className="ml-4" />
            <Text className="ml-1 text-sm text-gray-500">{getRelativeTime(item?.createdAt)}</Text>
          </View>
        </View>
      </TouchableOpacity>

      <View className="mt-4 flex-row justify-end">
        <TouchableOpacity
          onPress={() => {
            console.log('item', item);
            // router.push({
            //   pathname: routes.tabs.post as Href,
            //   params: {
            //     data: JSON.stringify(item),
            //   },
            // });
            // router.push(routes.tabs.post as Href);
            // router.setParams({ data: JSON.stringify(item) });
          }}
          className="mr-2 rounded-lg border border-primary px-4 py-2">
          <Text className="text-primary">{i18n.t('profile.edit')}</Text>
        </TouchableOpacity>
        <TouchableOpacity className="rounded-lg border border-red-500 px-4 py-2">
          <Text className="text-red-500">{i18n.t('profile.delete')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Render;
