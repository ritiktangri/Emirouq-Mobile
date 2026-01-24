/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/order */
import React, { useCallback, useEffect, useState } from 'react';
import { Image, Linking, RefreshControl, ScrollView, Share, TouchableOpacity } from 'react-native';
import { AntDesign, Feather, FontAwesome, Ionicons } from '@expo/vector-icons';
import { Href, router, useGlobalSearchParams, useLocalSearchParams } from 'expo-router';
import { View } from '~/components/common/View';
import { Text } from '~/components/common/Text';
import { getRelativeTime, toCurrency } from '~/utils/helper';
import { i18n } from '~/utils/i18n';
import { routes } from '~/utils/routes';
import { useAuth } from '~/context/AuthContext';
import dayjs from 'dayjs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGetCountPost, useGetSimilarPosts, useGetSinglePosts } from '~/hooks/post/query';
import theme from '~/utils/theme';
import { queryClient } from '~/app/_layout';
import Loading from './loading';
import CommentSheet from './commentSheet';
import { useLikePost } from '~/hooks/post/mutation';
import { useLocale } from '~/context/LocaleContext';
import { useFetchPaymentSheet } from '~/hooks/stripe/query';
import { initPaymentSheet, presentPaymentSheet } from '@stripe/stripe-react-native';
import { useGetPostConversation } from '~/hooks/chats/query';
import { useTheme } from '~/context/ThemeContext';
import ImageCarousel from './imageCarousel';

const SinglePost = () => {
  const { id }: any = useLocalSearchParams();
  const { removeChatButton = false } = useGlobalSearchParams();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const likePost: any = useLikePost();
  const { locale } = useLocale();
  const [selectFeature, setSelectFeature] = useState('featured');
  const { showToast } = useTheme();
  // const [isLiked, setIsLiked] = useState(false);
  const [selectedImage, setSelectedImage] = useState({
    uri: '',
    index: 1,
  } as any);
  const { user, city } = useAuth();
  const { isLoading, data, refetch }: any = useGetSinglePosts(id);
  const { data: countViewPost }: any = useGetCountPost(id);

  const { data: similarPosts }: any = useGetSimilarPosts(data?.data?.category?.uuid, city);
  useEffect(() => {
    if (data?.data?.file?.length > 0) {
      //cache update
      setSelectedImage({
        uri: data?.data?.file?.[0],
        index: 1,
      });
    }
  }, [data]);

  const handleRefresh = useCallback(() => {
    queryClient.removeQueries({ queryKey: ['singlePost', id] });
    refetch();
  }, [queryClient, refetch, id]);

  const getConversationId: any = useGetPostConversation(id);

  const payload = {
    pathParams: {
      planId: data?.data?.postSubscription?.subscriptionPlan?.planId,
    },
    body: {
      amount: '5.99',
      metadata: {
        postId: id,
        isFeaturedAd: true,
      },
    },
  };
  const paymentSheet: any = useFetchPaymentSheet(payload);
  const initializePaymentSheet = async () => {
    const { paymentIntent, customer } = paymentSheet?.data;
    if (!paymentIntent || !customer) {
      return;
    }
    const { error } = await initPaymentSheet({
      merchantDisplayName: 'Emirouq',
      customerId: customer,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'Jane Doe',
      },
      returnURL: 'emirouq-mobile://payment-sheet',
    });
    if (error) {
      return;
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();
    if (error?.code === 'Canceled') {
      console.log('Payment canceled');
      return;
    }
    if (error) {
      return;
    }
    console.log('Payment successful');
    showToast('Payment successful', 'success');
    queryClient.invalidateQueries({ queryKey: ['singlePost', id] });
  };

  useEffect(() => {
    initializePaymentSheet();
  }, [paymentSheet?.data]);

  const onLikePost = () => {
    if (id) {
      queryClient.setQueryData(['singlePost', id], (oldData: any) => {
        const isIncluded = (oldData?.data?.likes || [])?.includes(user?.uuid);

        if (isIncluded) {
          // If the user already liked the post, remove their UUID from the likes array
          return {
            ...oldData,
            data: {
              ...oldData?.data,
              likes: oldData?.data?.likes?.filter((like: string) => like !== user?.uuid),
            },
          };
        }
        return {
          ...oldData,
          data: {
            ...oldData?.data,
            likes: [...(oldData?.data?.likes || []), user?.uuid],
          },
        };
      });

      likePost
        ?.mutateAsync({
          pathParams: { postId: id },
        })
        ?.then((res: any) => {
          console.log('res', res);
        })
        .catch((err: any) => {
          console.log('err', err);
          queryClient.setQueryData(['singlePost', id], (oldData: any) => {
            // If the mutation fails, revert the likes array to its previous state
          });
        });
    }
  };
  if (isLoading) {
    return (
      <View
        className="flex-1 bg-white  "
        style={{
          paddingTop: useSafeAreaInsets().top,
        }}>
        <View className="px-3 py-2">
          <Ionicons
            name="arrow-back"
            size={24}
            color="black"
            onPress={() => {
              router.back();
            }}
          />
        </View>
        <Loading />
      </View>
    );
  }
  return (
    <View
      className="flex-1 bg-white"
      style={{
        paddingTop: useSafeAreaInsets().top,
      }}>
      <View className="flex-1">
        <View className="px-3 pt-2">
          <Ionicons
            name="arrow-back"
            size={24}
            color="black"
            onPress={() => {
              router.back();
            }}
          />
        </View>

        <ScrollView
          className="mb-2"
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              colors={[theme.colors.primary]}
              refreshing={false}
              onRefresh={handleRefresh}
              tintColor={theme.colors.primary}
            />
          }>
          {/* <FlatList
            data={data?.data?.file}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            decelerationRate="fast"
            snapToInterval={Dimensions.get('screen').width} // each item is screen width
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const screenWidth = Dimensions.get('screen').width;
              const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);

              setSelectedImage({
                uri: data?.data?.file[index],
                index: index + 1,
              });
            }}
            renderItem={({ item }) => (
              <View style={{ width: Dimensions.get('screen').width, alignItems: 'center' }}>
                <Image
                  source={{ uri: item }}
                  style={{
                    width: '95%', // keeps border radius & margin
                    height: 300,
                    resizeMode: 'cover',
                    borderRadius: 10,
                  }}
                />
              </View>
            )}
          />

          <View className="absolute right-4 top-10 rounded-full bg-gray-800 px-3 py-1">
            <Text className="text-white">
              {selectedImage?.index}/{data?.data?.file?.length}
            </Text>
          </View> */}
          <ImageCarousel data={data} />

          {/* Product Details */}
          <View className="p-4">
            <Text className="mb-2 text-2xl font-bold">{data?.data?.title}</Text>

            <Text className="text-2xl font-semibold text-primary">
              {toCurrency(data?.data?.price)}
            </Text>

            <View className="mt-1 flex-row items-center">
              <Feather name="map-pin" size={16} color="gray" />
              <Text className="ml-1 text-gray-600">
                {data?.data?.location?.name || 'New York, NY'}
              </Text>
            </View>

            {/* 👇 Add Views Count */}
            <View className="mt-2 flex-row items-center">
              <Feather name="eye" size={16} color="gray" />
              <Text className="ml-1 text-gray-600">{countViewPost?.totalViews || 0} view(s)</Text>
            </View>
          </View>

          {/* Seller Info */}

          {user?.uuid !== data?.data?.userId ? (
            <View className="px-4 py-2">
              <View className="flex-row items-center">
                <Image
                  source={{
                    uri:
                      data?.data?.user?.profileImage ||
                      'https://static.vecteezy.com/system/resources/previews/000/439/863/non_2x/vector-users-icon.jpg',
                  }}
                  style={{ width: 50, height: 50, borderRadius: 10 }}
                />
                <View className="ml-2 flex-1">
                  <View className="flex-row items-center">
                    <Text className="mr-1 font-bold">
                      {data?.data?.user?.firstName} {data?.data?.user?.lastName}
                    </Text>
                    <FontAwesome name="check-circle" size={16} color="#FF5722" />
                  </View>
                  <View className="flex-row items-center">
                    <FontAwesome name="star" size={12} color="gold" />
                    <Text className="ml-1 text-sm text-gray-600">4.9 (234 reviews)</Text>
                  </View>
                </View>
                {user?.uuid ? (
                  <TouchableOpacity
                    onPress={() => {
                      router.push({
                        pathname: routes.tabs.single_user_profile,
                        params: {
                          userId: data?.data?.user?.uuid,
                        },
                      } as Href);
                    }}>
                    <Text className="text-primary">View Profile {'>'}</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
              <Text className="mt-1 text-sm text-gray-600">
                <AntDesign name="clockcircleo" size={12} color="#4b5563" /> Member since{' '}
                {dayjs(data?.data?.user?.createdAt)?.format('YYYY')}
              </Text>
            </View>
          ) : (
            <></>
          )}
          <View className="px-2 py-2">
            <View className="flex-row items-center self-start rounded-full border border-gray-100 bg-gray-50 px-4 py-2">
              {/* Likes Count */}
              <Text className="text-xs font-semibold text-gray-700">
                {data?.data?.likes?.length || 0}
                <Text className="font-medium text-gray-500">
                  {' '}
                  {data?.data?.likes?.length === 1 ? 'Like' : 'Likes'}
                </Text>
              </Text>

              {/* Vertical Divider */}
              <View className="mx-3 h-3 w-[1px] bg-gray-300" />

              {/* Comments Count */}
              <Text className="text-xs font-semibold text-gray-700">
                {data?.data?.comments?.length || 0}
                <Text className="font-medium text-gray-500">
                  {' '}
                  {data?.data?.comments?.length === 1 ? 'Comment' : 'Comments'}
                </Text>
              </Text>
            </View>
          </View>
          {/* Interaction Buttons */}
          {user?.uuid && (
            <View className="flex-row items-center justify-between border-t border-gray-50 bg-white px-6 py-2 shadow-sm">
              {/* --- Social Actions Group --- */}
              <View className="flex-row gap-6">
                {/* Like Button */}
                <TouchableOpacity
                  className="items-center justify-center gap-1.5"
                  onPress={onLikePost}>
                  {data?.data?.likes?.includes(user?.uuid) ? (
                    <AntDesign name="heart" size={22} color="#EF4444" />
                  ) : (
                    <Feather name="heart" size={22} color="#6B7280" />
                  )}
                  <Text className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                    Like
                  </Text>
                </TouchableOpacity>

                {/* Comment Button */}
                <TouchableOpacity
                  className="items-center justify-center gap-1.5"
                  onPress={() => setIsSheetOpen(true)}>
                  <Feather name="message-square" size={22} color="#6B7280" />
                  <Text className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                    Comment
                  </Text>
                </TouchableOpacity>

                {/* Share Button */}
                <TouchableOpacity
                  className="items-center justify-center gap-1.5"
                  onPress={async () => {
                    try {
                      await Share.share({
                        message: 'Check out this app: https://emirouq.ae',
                      });
                    } catch (error) {}
                  }}>
                  <AntDesign name="sharealt" size={22} color="#6B7280" />
                  <Text className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                    Share
                  </Text>
                </TouchableOpacity>
              </View>

              {/* --- Divider --- */}
              {data?.data?.user?.phoneNumber && <View className="h-8 w-[1px] bg-gray-200" />}

              {/* --- Contact Actions Group --- */}
              <View className="flex-row gap-5">
                {/* WhatsApp Chat */}
                {data?.data?.user?.phoneNumber && (
                  <TouchableOpacity
                    className="items-center justify-center gap-1"
                    onPress={async () => {
                      const phoneNumber = `${data?.data?.user?.countryCode || '+971'}${data?.data?.user?.phoneNumber}`;
                      const message = encodeURIComponent('Check out this app: https://emirouq.ae');
                      const url = `whatsapp://send?phone=${phoneNumber}&text=${message}`;
                      const canOpen = await Linking.canOpenURL(url);
                      if (canOpen) {
                        Linking.openURL(url);
                      } else {
                        alert('WhatsApp is not installed');
                      }
                    }}>
                    {/* Icon Container for Emphasis */}
                    <View className="h-10 w-10 items-center justify-center rounded-full bg-green-50">
                      <FontAwesome name="whatsapp" size={20} color="#16A34A" />
                    </View>
                    <Text className="text-[10px] font-bold uppercase tracking-widest text-green-700">
                      Chat
                    </Text>
                  </TouchableOpacity>
                )}

                {/* Phone Call */}
                {data?.data?.user?.phoneNumber && (
                  <TouchableOpacity
                    className="items-center justify-center gap-1"
                    onPress={async () => {
                      const phoneNumber = `${data?.data?.user?.countryCode || '+971'}${data?.data?.user?.phoneNumber}`;
                      const url = `tel:${phoneNumber}`;
                      const canOpen = await Linking.canOpenURL(url);
                      if (canOpen) {
                        Linking.openURL(url);
                      } else {
                        alert('Unable to open dialer');
                      }
                    }}>
                    {/* Icon Container for Emphasis */}
                    <View className="h-10 w-10 items-center justify-center rounded-full bg-blue-50">
                      <Feather name="phone-call" size={18} color="#2563EB" />
                    </View>
                    <Text className="text-[10px] font-bold uppercase tracking-widest text-blue-700">
                      Call
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
          {/* Description */}
          <View className="bg-white px-6 py-6 pb-24">
            {/* --- Specifications Grid --- */}
            <View>
              <View className="mb-4 flex-row items-center justify-between">
                <Text className="font-serif text-lg font-bold text-gray-900">Details & Specs</Text>
                <Text className="text-xs font-medium uppercase tracking-widest text-gray-400">
                  Updated {getRelativeTime(data?.data?.createdAt)}
                </Text>
              </View>

              {/* Grid Container */}
              <View className="flex-row flex-wrap justify-between">
                {/* 1. Condition Card */}
                <View className="mb-3 w-[48%] rounded-2xl border border-gray-100 bg-gray-50 p-3.5">
                  <Text className="mb-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    {i18n.t('post.condition')}
                  </Text>
                  <Text className="text-sm font-semibold capitalize text-gray-900">
                    {data?.data?.condition || 'N/A'}
                  </Text>
                </View>

                {/* 2. Category Card */}
                <View className="mb-3 w-[48%] rounded-2xl border border-gray-100 bg-gray-50 p-3.5">
                  <Text className="mb-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    {i18n.t('post.category')}
                  </Text>
                  <Text className="text-sm font-semibold text-gray-900" numberOfLines={1}>
                    {data?.data?.category?.title || 'N/A'}
                  </Text>
                </View>

                {/* 3. Dynamic Properties Loop */}
                {(data?.data?.properties || []).map((property: any, index: number) => (
                  <View
                    key={index}
                    className="mb-3 w-[48%] rounded-2xl border border-gray-100 bg-gray-50 p-3.5">
                    <Text
                      className="mb-1 text-[10px] font-bold uppercase tracking-widest text-gray-400"
                      numberOfLines={1}>
                      {property.label}
                    </Text>

                    {property.selectedValue?.length > 0 && Array.isArray(property.selectedValue) ? (
                      <Text className="text-sm font-semibold leading-5 text-gray-900">
                        {property.selectedValue?.map((j: any) => j?.value).join(', ')}
                      </Text>
                    ) : (
                      <Text className="text-sm font-semibold leading-5 text-gray-900">
                        {property.selectedValue?.value || '-'}
                      </Text>
                    )}
                  </View>
                ))}
              </View>
            </View>
            {/* --- Description Section --- */}
            <View className="mb-8">
              <Text className="mb-3 font-serif text-lg font-bold text-gray-900">
                {i18n.t('post.description')}
              </Text>
              <Text className="text-base font-light leading-7 tracking-wide text-gray-600">
                {data?.data?.description}
              </Text>
            </View>
          </View>

          {/* Tags */}
          {/* <View className="mt-2 flex-row flex-wrap border-[0.2px] border-b border-t border-gray-200 px-4 pb-2 pt-4">
            <TouchableOpacity className="mb-2 mr-2 rounded-full bg-gray-200 px-3 py-1">
              <Text className="text-gray-700">Negotiable</Text>
            </TouchableOpacity>
            <TouchableOpacity className="mb-2 mr-2 rounded-full bg-gray-200 px-3 py-1">
              <Text className="text-gray-700">Free Shipping</Text>
            </TouchableOpacity>
            <TouchableOpacity className="mb-2 mr-2 rounded-full bg-gray-200 px-3 py-1">
              <Text className="text-gray-700">Warranty</Text>
            </TouchableOpacity>
          </View> */}

          {/* Boost Ad Section */}
          {data?.data?.subscriptionId &&
          data?.data?.status === 'active' &&
          !data?.data?.isFeaturedAdBoostUsed ? (
            <View className="mt-2 gap-3 bg-boostAd_bg p-4">
              <Text placement={locale} className="text-lg font-medium text-black">
                {i18n.t('previewAd.boostAdHeading')}
              </Text>
              <TouchableOpacity
                className=""
                onPress={() => {
                  if (selectFeature !== 'featured') {
                    setSelectFeature('featured');
                  } else {
                    setSelectFeature('');
                  }
                }}>
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
              {/* <TouchableOpacity className="" onPress={() => setSelectFeature('premium')}>
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
              </TouchableOpacity> */}
              {selectFeature ? (
                <TouchableOpacity
                  onPress={openPaymentSheet}
                  className="mt-2 flex-row items-center justify-center rounded-lg bg-primary py-3">
                  <Text className="font-poppinsMedium text-lg text-white">
                    {i18n.t('previewAd.boostAd')}
                  </Text>
                </TouchableOpacity>
              ) : (
                <></>
              )}
            </View>
          ) : (
            <></>
          )}

          {removeChatButton === false && similarPosts?.data?.length > 0 ? (
            <>
              {/* Similar Products */}
              <View className="p-4">
                <View className="mb-2 flex-row items-center py-2 ">
                  <Text className="flex-1 font-poppinsMedium text-lg">Similar Products</Text>
                  <TouchableOpacity
                    onPress={() => {
                      router.push({
                        pathname: routes.tabs.post_list,
                        params: {
                          tag: 'featured_listings',
                        },
                      } as Href);
                    }}>
                    <Text className="font-poppinsMedium text-lg text-primary">View all {'>'}</Text>
                  </TouchableOpacity>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {similarPosts?.data?.map((uri: any, index: any) => (
                    <TouchableOpacity
                      key={index}
                      className="mr-4"
                      onPress={() => {
                        router.push({
                          pathname: routes.tabs.singlePost(uri?.uuid),
                          params: {
                            title: `${uri?.title}`,
                          },
                        } as Href);
                      }}>
                      <Image
                        source={{
                          uri:
                            uri?.file?.[0] ||
                            'https://cdn.dribbble.com/userupload/20492562/file/original-eb6386e74bffac7624ca8ef3c9015f2b.jpg?resize=400x0',
                        }}
                        resizeMode="cover"
                        style={{
                          width: 120,
                          height: 120,
                          borderRadius: 8,
                        }}
                      />
                      <Text className="mt-1 text-gray-800">{uri?.title}</Text>
                      <Text className="text-gray-600">{toCurrency(uri?.price)}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </>
          ) : (
            <></>
          )}
        </ScrollView>
      </View>

      {/* Chat Button */}
      {user?.uuid && user?.uuid !== data?.data?.userId && removeChatButton === false ? (
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: routes.tabs.chatScreen(getConversationId?.data?.conversationId),
              // : routes.tabs.chat,
              params: {
                conversationId: getConversationId?.data?.conversationId,
                usersInConversation: [data?.data?.userId, user?.uuid],
                // receiverId: data?.data?.userId,
                receiverId: data?.data?.userId,
                firstName: data?.data?.user?.firstName,
                lastName: data?.data?.user?.lastName,
                fullName: `${data?.data?.user?.firstName} ${data?.data?.user?.lastName}`,
                profileImage: data?.data?.user?.profileImage,
                uuid: data?.data?.uuid,
                postId: data?.data?.uuid,
                chatTitle: !!getConversationId?.data?.conversationId,
                name: data?.data?.title,
                file: data?.data?.file?.[0],
                price: data?.data?.price,
                post: JSON.stringify(data?.data),
                sortConversation: true,
              },
            } as unknown as Href)
          }
          className="mx-4 mb-10 flex-row items-center justify-center gap-2 rounded-lg bg-primary py-3">
          <Feather name="message-circle" size={20} color="white" />
          <Text className=" font-poppinsMedium text-lg text-white">Chat with Seller</Text>
        </TouchableOpacity>
      ) : (
        <></>
      )}
      <CommentSheet
        visible={isSheetOpen}
        setVisible={setIsSheetOpen}
        postId={id}
        postComments={data?.data?.comments}
      />
    </View>
  );
};

export default SinglePost;
