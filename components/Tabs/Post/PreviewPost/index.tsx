/* eslint-disable import/order */
import { ScrollView, TouchableOpacity, Pressable, ActivityIndicator, Image } from 'react-native';
import React, { useState } from 'react';
import { Href, useGlobalSearchParams, useRouter } from 'expo-router';
import Swiper from 'react-native-swiper';

import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { routes } from '~/utils/routes';
import { toCurrency } from '~/utils/helper';
import { i18n } from '~/utils/i18n';
import { View } from '~/components/common/View';
import { Text } from '~/components/common/Text';
import { useLocale } from '~/context/LocaleContext';
import { usePosts } from '~/context/PostContext';
import { useTheme } from '~/context/ThemeContext';
const PreviewPost = () => {
  const params: any = useGlobalSearchParams();
  const data = params?.data ? JSON.parse(params?.data) : {};
  console.log(data?.images);
  const router: any = useRouter();
  const { showToast } = useTheme();
  const [selectFeature, setSelectFeature] = useState('');
  const { createPost, updatePost } = usePosts();
  const [saveLoading, setSaveLoading] = useState(false);
  const [draftLoading, setDraftLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { locale } = useLocale();
  if (!params?.data) {
    return;
  }

  const onSubmit = async (isDraft = false) => {
    if (data?.isEdit) {
      setSaveLoading(true);
      updatePost(
        {
          ...data,
          locationName: data?.location?.name,
          locationPlaceId: data?.location?.placeId,
          isDraft,
        },
        {
          id: data?.uuid,
        },
        () => {
          showToast('Ad updated successfully', 'success');
          router.push(routes.success as Href);
          setSaveLoading(false);
        },
        (err: any) => {
          showToast(err?.message, 'error');
          setSaveLoading(false);
        }
      );
    } else {
      if (isDraft) {
        setDraftLoading(true);
      } else {
        setSaveLoading(true);
      }
      createPost(
        {
          ...data,
          locationName: data?.location?.name,
          locationPlaceId: data?.location?.placeId,
          isDraft,
        },
        () => {
          if (!isDraft) {
            showToast('Ad created successfully', 'success');
            router.push(routes.success as Href);
          } else {
            showToast('Ad saved as draft successfully', 'success');
            router.push(routes.tabs.home as Href);
          }
          setDraftLoading(false);
          setSaveLoading(false);
        },
        (err: any) => {
          showToast(err?.message, 'error');
          setDraftLoading(false);
          setSaveLoading(false);
        }
      );
    }
  };

  return (
    <View className="flex-1">
      <ScrollView className="flex-1 bg-white">
        <View className="bg-blue-50 p-3">
          <Text placement={locale} className="flex-row items-center text-sm text-blue-500">
            <AntDesign name="infocirlceo" size={12} color="gray" />
            {i18n.t('previewAd.info')}
          </Text>
        </View>
        <View className="p-4">
          <View className="mb-4 h-64  w-full rounded-lg">
            <Swiper
              showsButtons={data?.images?.length > 1}
              dotStyle={{
                backgroundColor: 'rgba(0,0,0,.2)',
                width: 8,
                height: 8,
                borderRadius: 4,
                margin: 3,
              }}
              activeDotStyle={{
                backgroundColor: '#007bff',
                width: 10,
                height: 10,
                borderRadius: 5,
                margin: 3,
              }}>
              {[
                {
                  name: '1000055177.jpg',
                  type: 'image/jpeg',
                  uri: 'file:///data/user/0/host.exp.exponent/files/1000055177.jpg',
                  uuid: '1000055177.jpg',
                },
                {
                  name: '1000055175.jpg',
                  type: 'image/jpeg',
                  uri: 'file:///data/user/0/host.exp.exponent/files/1000055175.jpg',
                  uuid: '1000055175.jpg',
                },
                {
                  name: '1000055164.jpg',
                  type: 'image/jpeg',
                  uri: 'file:///data/user/0/host.exp.exponent/files/1000055164.jpg',
                  uuid: '1000055164.jpg',
                },
              ]?.map((image: any, index: any) => {
                return (
                  <Image
                    key={image?.uri}
                    source={{
                      uri: image?.uri,
                    }}
                    resizeMode="cover"
                    className="h-full w-full rounded-lg"
                  />
                );
              })}
            </Swiper>
          </View>

          {/* Title and Price */}
          <Text className="mb-2 text-4xl font-bold">{toCurrency(data?.price)}</Text>
          <Text className="mb-4 text-2xl font-semibold">{data?.title}</Text>

          {/* Location and Condition */}
          <View direction="row" className="mb-4  flex-wrap gap-x-2">
            <Text className="text-gray-600">{data?.categoryName}</Text>
            <View className="h-1 w-1 rounded-full bg-gray-400" />
            <Text className="text-gray-600">{data?.subCategoryName}</Text>
            <View className="h-1 w-1 rounded-full bg-gray-400" />
            <Text className="text-gray-600">{data?.location?.name}</Text>
          </View>
          {/* Description */}
          <View className="rounded-md bg-gray-50 p-2">
            <Text placement={locale} className="mb-2 text-lg">
              {i18n.t('previewAd.description')}
            </Text>
            <Text className="mb-3 text-gray-700">
              {data?.description?.length > 80 && !isExpanded
                ? `${data?.description?.slice(0, 80)}...`
                : data?.description}
            </Text>
            <Text
              placement={locale}
              className="text-primary"
              onPress={() => {
                setIsExpanded(!isExpanded);
              }}>
              {data?.description?.length > 80 && !isExpanded
                ? i18n.t('previewAd.readMore')
                : data?.description?.length > 80
                  ? i18n.t('previewAd.showLess')
                  : ''}
            </Text>
          </View>

          {/* Properties */}
          <Text placement={locale} className="mb-2 mt-3 text-lg font-semibold">
            {i18n.t('previewAd.properties')}
          </Text>
          {data?.properties.map((property: any, index: any) =>
            property?.value ? (
              <View direction="row" key={index} className="mb-2  ">
                <Text className="flex-1 text-gray-600">{property.name}:</Text>
                <Text className="text-gray-800">{property.value}</Text>
              </View>
            ) : (
              <View key={index} className=" " />
            )
          )}

          {/* Sub Category and Time Period*/}
          {data?.timePeriod ? (
            <View className="flex flex-row items-center gap-x-2 rounded-md">
              <Text className="flex-1 text-gray-600">Time Period: </Text>
              <Text className="text-gray-800">{data?.timePeriod}</Text>
            </View>
          ) : (
            <></>
          )}

          {/* Add any other details if needed */}
          <View className="mt-4 w-full flex-row items-center rounded-md bg-gray-50 p-3">
            {/* Profile Image */}
            <View className="mr-3 h-16 w-16 overflow-hidden rounded-full">
              <Image
                source={{
                  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJv0Qn3rCm5JYUXMpQlekZ1n0NjVcCF5hrkA&s',
                }}
                className="h-full w-full"
                resizeMode="cover"
              />
            </View>

            {/* User Details */}
            <View className="flex-1">
              <Text className="text-lg font-semibold">John Doe</Text>
              <View className="flex-row items-center">
                <FontAwesome name="star" size={14} color="#6B7280" />
                <Text className="ml-1 text-sm text-gray-500">4.9 • 127 reviews</Text>
              </View>
            </View>

            {/* Icons */}
            <View className="flex-row items-center gap-x-4">
              <TouchableOpacity onPress={() => {}} className="ml-2">
                <FontAwesome name="phone" size={24} color="#6B7280" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}} className="ml-2">
                <FontAwesome name="comment-o" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>
          </View>
          <View className="mt-2 gap-3 bg-boostAd_bg p-4">
            <Text placement={locale} className="text-lg font-medium text-black">
              {i18n.t('previewAd.boostAdHeading')}
            </Text>
            <TouchableOpacity className="" onPress={() => setSelectFeature('featured')}>
              <View direction={locale}>
                <FontAwesome
                  name={selectFeature === 'featured' ? 'circle' : 'circle-thin'}
                  size={20}
                  className={selectFeature === 'featured' ? '!text-primary' : '!text-black'}
                />
                <View direction={locale} className="gap-2">
                  <Text className="font- ml-2 font-interMedium text-base text-black">
                    {i18n.t('previewAd.featuredAd')}
                  </Text>
                  <Text>-</Text>
                  <Text className="font-poppinsMedium">{toCurrency(5.99)}</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="" onPress={() => setSelectFeature('premium')}>
              <View direction={locale}>
                <FontAwesome
                  name={selectFeature === 'premium' ? 'circle' : 'circle-thin'}
                  size={20}
                  className={selectFeature === 'premium' ? '!text-primary' : '!text-black'}
                />

                <View direction={locale} className="gap-2">
                  <Text className="font- ml-2 font-interMedium text-base text-black">
                    {i18n.t('previewAd.premiumPlacement')}
                  </Text>
                  <Text>-</Text>
                  <Text className="font-poppinsMedium">{toCurrency(9.99)}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/*Action buttons */}
          <View className="mt-4 flex flex-col gap-y-3">
            <Pressable
              className="flex-1 flex-row items-center justify-center gap-1 gap-2 rounded-lg bg-primary py-4"
              onPress={() => {
                onSubmit(false);
              }}>
              {saveLoading ? <ActivityIndicator size="small" color="white" /> : <></>}
              <Text className="text-base font-semibold text-white">
                {i18n.t('previewAd.confirm')}
              </Text>
            </Pressable>
            {!data?.isEdit ? (
              <Pressable
                onPress={() => {
                  onSubmit(true);
                }}
                className="flex-1 flex-row items-center justify-center gap-2 rounded-lg bg-white py-4">
                {draftLoading ? <ActivityIndicator size="small" color="black" /> : <></>}

                <Text className="text-base font-semibold text-gray-700">
                  {i18n.t('previewAd.saveDraft')}
                </Text>
              </Pressable>
            ) : null}
            <Pressable
              className="flex-1 items-center rounded-lg border-[1px] border-primary py-4"
              onPress={() => router.back()}>
              <Text className="text-base font-semibold text-primary">
                {i18n.t('previewAd.edit')}
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PreviewPost;
