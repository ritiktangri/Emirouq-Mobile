/* eslint-disable import/order */
import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { Href, router, useGlobalSearchParams, useLocalSearchParams } from 'expo-router';
import { View } from '~/components/common/View';
import { Text } from '~/components/common/Text';
import Image from '~/components/common/Image';
import { getRelativeTime, toCurrency } from '~/utils/helper';
import { i18n } from '~/utils/i18n';
import { routes } from '~/utils/routes';
import { useAuth } from '~/context/AuthContext';
import { usePosts } from '~/context/PostContext';
import dayjs from 'dayjs';

const SinglePost = () => {
  const { id }: any = useLocalSearchParams();
  const [selectedImage, setSelectedImage] = useState({
    uri: '',
    index: 1,
  } as any);
  const { user } = useAuth();
  const { getSinglePost, singlePost, singlePostLoading } = usePosts();
  useEffect(() => {
    if (id) {
      getSinglePost(id, (res: any) => {
        setSelectedImage({
          uri: res?.file?.[0],
          index: 1,
        });
      });
    }
  }, [id]);

  if (singlePostLoading) {
    return <View className="flex-1 items-center justify-center bg-white" />;
  }
  return (
    <View className="flex-1 bg-white">
      <View className="flex-1">
        <ScrollView>
          <View className="mx-auto  h-[300px] w-[100%] px-3 py-3">
            <Image
              thumbnailSource={{
                uri: selectedImage?.uri,
              }}
              source={{
                uri: selectedImage?.uri,
              }}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 10,
              }}
              resizeMode="cover"
            />
          </View>

          <View className="absolute right-4 top-10 rounded-full bg-gray-800 px-3 py-1">
            <Text className="text-white">
              {selectedImage?.index}/{singlePost?.file?.length}
            </Text>
          </View>

          <View className="flex flex-row flex-wrap items-center gap-2 px-3 py-2">
            {/* {singlePost?.file?.map((uri: any, index: any) => (
              <TouchableOpacity
                key={index}
                className=""
                onPress={() =>
                  setSelectedImage({
                    uri,
                    index: index + 1,
                  })
                }>
                <Image
                  thumbnailSource={{
                    uri,
                  }}
                  source={{
                    uri,
                  }}
                  resizeMode="cover"
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 8,
                  }}
                />
              </TouchableOpacity>
            ))} */}
          </View>

          {/* Product Details */}
          <View className="p-4">
            <Text className="mb-2 text-2xl font-bold">{singlePost?.title}</Text>
            <Text className="text-2xl font-semibold text-red-600">
              {toCurrency(singlePost?.price)}
            </Text>
            {/* <View className="mt-1 flex-row items-center">
            <Feather name="map-pin" size={16} color="gray" />
            <Text className="ml-1 text-gray-600">New York, NY</Text>
          </View> */}
          </View>

          {/* Seller Info */}

          {user?.uuid !== singlePost?.userId ? (
            <View className="flex-row items-center px-4 py-2">
              <Image
                source={{
                  uri:
                    singlePost?.user?.profileImage ||
                    'https://static.vecteezy.com/system/resources/previews/000/439/863/non_2x/vector-users-icon.jpg',
                }}
                style={{ width: 60, height: 60, borderRadius: 10 }}
              />
              <View className="flex-1 ">
                <View className="flex-row items-center">
                  <Text className="mr-1 font-bold">
                    {singlePost?.user?.firstName} {singlePost?.user?.lastName}
                  </Text>
                  <FontAwesome name="check-circle" size={16} color="#e3350d" />
                </View>
                <View className="flex-row items-center">
                  <FontAwesome name="star" size={12} color="gold" />
                  <Text className="ml-1 text-gray-600">4.9 (234 reviews)</Text>
                </View>
                <Text className="text-gray-600">
                  Member since {dayjs(singlePost?.user?.createdAt)?.format('YYYY')}
                </Text>
              </View>
              <TouchableOpacity>
                <Text className="text-primary">View Profile {'>'}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <></>
          )}

          {/* Interaction Buttons */}
          <View className="mt-2 flex-row justify-around">
            <TouchableOpacity className="flex-row items-center">
              <Feather name="heart" size={20} color="gray" />
              <Text className="ml-1 text-gray-600">Like</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center">
              <Feather name="message-square" size={20} color="gray" />
              <Text className="ml-1 text-gray-600">Comment</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center">
              <Feather name="share" size={20} color="gray" />
              <Text className="ml-1 text-gray-600">Share</Text>
            </TouchableOpacity>
          </View>

          {/* Description */}
          <View className="p-4">
            <Text className="text-lg font-semibold">{i18n.t('post.description')}</Text>
            <Text className="mt-1 text-gray-700">{singlePost?.description}</Text>
            <View className="mt-2">
              <View className="flex-row justify-between border-b border-gray-300 py-1">
                <Text className="text-gray-600">{i18n.t('post.condition')}</Text>
                <Text className="text-gray-800">{singlePost?.condition}</Text>
              </View>
              <View className="flex-row justify-between border-b border-gray-300 py-1">
                <Text className="text-gray-600">{i18n.t('post.category')}</Text>
                <Text className="text-gray-800">{singlePost?.category?.title}</Text>
              </View>
              {/* <View className="flex-row justify-between border-b border-gray-300 py-1">
                <Text className="text-gray-600">Brand</Text>
                <Text className="text-gray-800">
                  {singlePost?.brand?.title}
                </Text>
              </View> */}
              <View className="flex-row justify-between py-1">
                <Text className="text-gray-600">Posted</Text>
                <Text className="text-gray-800">{getRelativeTime(singlePost?.createdAt)}</Text>
              </View>
            </View>
          </View>

          {/* Tags */}
          <View className="mt-2 flex-row flex-wrap px-4">
            <TouchableOpacity className="mb-2 mr-2 rounded-full bg-gray-200 px-3 py-1">
              <Text className="text-gray-700">Negotiable</Text>
            </TouchableOpacity>
            <TouchableOpacity className="mb-2 mr-2 rounded-full bg-gray-200 px-3 py-1">
              <Text className="text-gray-700">Free Shipping</Text>
            </TouchableOpacity>
            <TouchableOpacity className="mb-2 mr-2 rounded-full bg-gray-200 px-3 py-1">
              <Text className="text-gray-700">Warranty</Text>
            </TouchableOpacity>
          </View>

          {/* Similar Products */}
          <View className="p-4">
            <View className="mb-2 flex-row items-center py-2 ">
              <Text className="flex-1 font-poppinsMedium text-lg">Similar Products</Text>
              <TouchableOpacity>
                <Text className="font-poppinsMedium text-lg text-primary">View all {'>'}</Text>
              </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {/* {singlePost?.file?.map((uri: any, index: any) => (
                <TouchableOpacity key={index} className="mr-4">
                  <Image
                    thumbnailSource={{
                      uri,
                    }}
                    source={{
                      uri,
                    }}
                    resizeMode="cover"
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: 8,
                    }}
                  />
                  <Text className="mt-1 text-gray-800">iPhone 14 Pro Max</Text>
                  <Text className="text-gray-600">$1,099</Text>
                </TouchableOpacity>
              ))} */}
            </ScrollView>
          </View>
        </ScrollView>
      </View>

      {/* Chat Button */}
      {user?.uuid !== singlePost?.userId ? (
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: singlePost?.conversation?.uuid ? routes.chatScreen : routes.tabs.chat,
              params: {
                conversationId: singlePost?.conversation?.uuid,
                uuid: singlePost?.uuid,
                userId: singlePost?.userId,
              },
            } as Href)
          }
          className="mx-4 mb-2 flex-row items-center justify-center gap-2 rounded-lg bg-primary py-3">
          <Feather name="message-circle" size={20} color="white" />
          <Text className=" font-poppinsMedium text-lg text-white">Chat with Seller</Text>
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </View>
  );
};

export default SinglePost;
