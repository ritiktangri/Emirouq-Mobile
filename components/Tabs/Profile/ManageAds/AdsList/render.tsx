/* eslint-disable import/order */
import { View, Text, TouchableOpacity, Image, Alert, Modal, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { getRelativeTime } from '~/utils/helper';
import { Href, useRouter } from 'expo-router';
import { routes } from '~/utils/routes';
import { i18n } from '~/utils/i18n';
import { usePosts } from '~/context/PostContext';
import { useTheme } from '~/context/ThemeContext';
const status: any = {
  active: 'Active',
  draft: 'Draft',
  pending: 'Pending',
  inactive: 'Inactive',
  expired: 'Expired',
};

const Render = ({ item, refetch }: any) => {
  const router = useRouter();
  const { deletePost, btnLoading }: any = usePosts();
  const { showToast }: any = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const regionalSpec = item?.properties?.find(
    (p: any) => p.attributeKey === 'regional_specification'
  )?.selectedValue?.value;
  const mileage = item?.properties?.find((p: any) => p.attributeKey === 'mileage')?.selectedValue
    ?.value;

  const onDeletePost = () => {
    if (btnLoading) return;
    deletePost(
      item?.uuid,
      () => {
        showToast('Post deleted!', 'success');
        setModalVisible(false);
        refetch();
      },
      (err: any) => {}
    );
  };

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
        className="flex-col gap-2">
        <View className="h-44 w-full overflow-hidden rounded-t-lg">
          <Image
            source={{ uri: item?.file?.[0] }}
            style={{
              height: '100%',
              width: '100%',
            }}
            className="h-full w-full"
          />
        </View>
        <View className="flex-1 px-2">
          <View className="flex-row items-start justify-between">
            <View className="flex-1">
              <Text className="text-lg font-semibold">{item?.title}</Text>
              <Text className="text-sm text-gray-500">
                {item?.category?.title} • {item.location?.name}
              </Text>
            </View>

            {(regionalSpec || mileage) && (
              <View className="ml-2 mt-1 flex-row items-center gap-1.5">
                {regionalSpec && (
                  <View className="rounded-md bg-gray-100 px-2 py-0.5">
                    <Text className="text-[10px] font-medium text-gray-600">{regionalSpec}</Text>
                  </View>
                )}
                {mileage && (
                  <View className="rounded-md bg-gray-100 px-2 py-0.5">
                    <Text className="text-[10px] font-medium text-gray-600">{mileage} km</Text>
                  </View>
                )}
              </View>
            )}
          </View>

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
            router.push({
              pathname: routes.tabs.post,
              params: {
                postId: item?.uuid,
                title: `${item?.title}`,
              },
            } as Href);
          }}
          className="mr-2 rounded-lg border border-primary px-4 py-2">
          <Text className="text-primary">{i18n.t('profile.edit')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="rounded-lg border border-red-500 px-4 py-2"
          onPress={() => {
            setModalVisible(true);
            // Alert.alert('Delete Post', 'Are you sure you want to delete this post?', [
            //   {
            //     text: 'Confirm',
            //     onPress: () => setModalVisible(true),
            //   },
            //   {
            //     text: 'Cancel',
            //     style: 'destructive',
            //   },
            // ]);
          }}>
          <Text className="text-red-500">{i18n.t('profile.delete')}</Text>
        </TouchableOpacity>
      </View>
      <Modal
        transparent
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => {
          if (!btnLoading) setModalVisible(false);
        }}>
        <View className=" absolute left-[10%] top-[40%] h-[18%] w-[85%] max-w-md rounded-2xl bg-white p-6 shadow-xl">
          <Text className="mb-2 text-xl font-bold text-gray-900">Delete Post</Text>
          <Text className="mb-6 text-gray-700">Are you sure you want to delete this post?</Text>

          <View className="flex-row items-center justify-end gap-x-4">
            <TouchableOpacity
              disabled={btnLoading}
              onPress={() => {
                setModalVisible(false);
              }}>
              <Text className="font-medium text-gray-600">Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity className="rounded-lg bg-red-500 px-4 py-2" onPress={onDeletePost}>
              {btnLoading ? (
                <ActivityIndicator className="text-white" />
              ) : (
                <Text className="font-semibold text-white">Confirm</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Render;
