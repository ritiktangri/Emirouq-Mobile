/* eslint-disable import/order */
import React, { useCallback, useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Linking,
  RefreshControl,
  ScrollView,
  Share,
  TouchableOpacity,
} from 'react-native';
import { AntDesign, Feather, FontAwesome, Ionicons } from '@expo/vector-icons';
import { Href, router, useGlobalSearchParams, useLocalSearchParams } from 'expo-router';
import { View } from '~/components/common/View';
import { Text } from '~/components/common/Text';
import { getRelativeTime, toCurrency } from '~/utils/helper';
import { i18n } from '~/utils/i18n';
import { routes } from '~/utils/routes';
import { useAuth } from '~/context/AuthContext';
import dayjs from 'dayjs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGetSinglePosts } from '~/hooks/post/query';
import theme from '~/utils/theme';
import { queryClient } from '~/app/_layout';
import Loading from './loading';
import CommentSheet from './commentSheet';
import { useLikePost } from '~/hooks/post/mutation';
import { useLocale } from '~/context/LocaleContext';
import { useFetchPaymentSheet } from '~/hooks/stripe/query';
import { initPaymentSheet, presentPaymentSheet } from '@stripe/stripe-react-native';

const SinglePost = () => {
  const { id }: any = useLocalSearchParams();
  const { removeChatButton = false } = useGlobalSearchParams();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const likePost: any = useLikePost();
  const { locale } = useLocale();
  const [selectFeature, setSelectFeature] = useState('featured');

  // const [isLiked, setIsLiked] = useState(false);
  const [selectedImage, setSelectedImage] = useState({
    uri: '',
    index: 1,
  } as any);
  const { user } = useAuth();
  const { isLoading, data, refetch }: any = useGetSinglePosts(id);
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
    console.log(paymentIntent, customer);
    if (!paymentIntent || !customer) {
      console.error('Payment intent or customer not found');
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
      console.error('Error initializing payment sheet:', error);
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
      console.error('Error presenting payment sheet:', error);
      return;
    }
    console.log('Payment successful');
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white  ">
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
      </SafeAreaView>
    );
  }
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
        ?.then((res: any) => {})
        .catch((err: any) => {
          console.log('err', err);
          queryClient.setQueryData(['singlePost', id], (oldData: any) => {
            // If the mutation fails, revert the likes array to its previous state
          });
        });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
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
          className="mb-10"
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              colors={[theme.colors.primary]}
              refreshing={false}
              onRefresh={handleRefresh}
              tintColor={theme.colors.primary}
            />
          }>
          <FlatList
            data={data?.data?.file}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(
                event.nativeEvent.contentOffset.x / Dimensions.get('screen').width
              );
              setSelectedImage({
                uri: data?.data?.file[index],
                index: index + 1,
              });
            }}
            contentContainerClassName="mx-auto"
            renderItem={({ item }) => (
              <Image
                source={{ uri: item }}
                style={{
                  width: Dimensions.get('screen').width - 8,
                  height: 300,
                  resizeMode: 'cover',
                  borderRadius: 10,
                }}
              />
            )}
          />

          {/* Page indicator badge */}
          <View className="absolute right-4 top-10 rounded-full bg-gray-800 px-3 py-1">
            <Text className="text-white">
              {selectedImage?.index}/{data?.data?.file?.length}
            </Text>
          </View>
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
              </View>
              <Text className="mt-1 text-sm text-gray-600">
                <AntDesign name="clockcircleo" size={12} color="#4b5563" /> Member since{' '}
                {dayjs(data?.data?.user?.createdAt)?.format('YYYY')}
              </Text>
            </View>
          ) : (
            <></>
          )}
          <View className="flex-row items-center gap-3 border-[1px] border-t border-gray-200 px-4 pb-3 pt-4">
            <Text className="text-gray-600">
              {data?.data?.likes?.length} {`${data?.data?.likes?.length === 1 ? 'Like' : 'Likes'}`}
            </Text>
            <View className="h-2 w-2 rounded-full bg-gray-400" />
            <Text className="text-gray-600">
              {' '}
              {data?.data?.comments?.length}{' '}
              {`${data?.data?.comments?.length === 1 ? 'Comment' : 'Comments'}`}
            </Text>
          </View>
          {/* Interaction Buttons */}
          {user?.uuid && (
            <View className="mt-2 flex-row  justify-around">
              <TouchableOpacity className="flex-row items-center" onPress={onLikePost}>
                {data?.data?.likes?.includes(user?.uuid) ? (
                  <AntDesign name="heart" size={20} color="red" />
                ) : (
                  <Feather name="heart" size={20} color="gray" />
                )}
                <Text className="ml-1 text-gray-600">Like</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-row items-center"
                onPress={() => {
                  setIsSheetOpen(true);
                }}>
                <Feather name="message-square" size={20} color="gray" />
                <Text className="ml-1 text-gray-600">Comment</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-row items-center"
                onPress={async () => {
                  try {
                    await Share.share({
                      message: 'Check out this app: https://emirouq.ae',
                    });
                  } catch (error) {
                    console.error('Error sharing:', error);
                  }
                }}>
                <AntDesign name="sharealt" size={20} color="gray" />
                <Text className="ml-1 text-gray-600">Share</Text>
              </TouchableOpacity>
              {data?.data?.user?.phoneNumber && (
                <TouchableOpacity
                  className="flex-row items-center"
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
                  <FontAwesome name="whatsapp" size={20} color="green" />
                  <Text className="ml-1 text-green-700">Chat</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* Description */}
          <View className="px-4 pb-1 pt-4">
            <Text className="text-lg font-semibold">{i18n.t('post.description')}</Text>
            <Text className="mt-1 text-gray-700">{data?.data?.description}</Text>
            <View className="mt-2">
              <View className="flex-row justify-between  py-2">
                <Text className="text-gray-600">{i18n.t('post.condition')}</Text>
                <Text className="text-gray-800">{data?.data?.condition}</Text>
              </View>
              <View className="flex-row justify-between  py-2">
                <Text className="text-gray-600">{i18n.t('post.category')}</Text>
                <Text className="text-gray-800">{data?.data?.category?.title}</Text>
              </View>
              {/* <View className="flex-row justify-between  py-1">
                <Text className="text-gray-600">Brand</Text>
                <Text className="text-gray-800">
                  {data?.data?.brand?.title}
                </Text>
              </View> */}
              <View className="flex-row justify-between py-2">
                <Text className="text-gray-600">Posted</Text>
                <Text className="text-gray-800">{getRelativeTime(data?.data?.createdAt)}</Text>
              </View>
            </View>
          </View>

          {/* Tags */}
          <View className="mt-2 flex-row flex-wrap border-[0.2px] border-b border-t border-gray-200 px-4 pb-2 pt-4">
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

          {removeChatButton === false ? (
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
                  {data?.data?.file?.map((uri: any, index: any) => (
                    <TouchableOpacity key={index} className="mr-4">
                      <Image
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
              pathname: routes.tabs.chatScreen(data?.data?.conversation?.uuid),
              // : routes.tabs.chat,
              params: {
                conversationId: data?.data?.conversation?.uuid,
                usersInConversation: [data?.data?.userId, user?.uuid],
                // receiverId: data?.data?.userId,
                receiverId: data?.data?.userId,
                firstName: data?.data?.user?.firstName,
                lastName: data?.data?.user?.lastName,
                fullName: `${data?.data?.user?.firstName} ${data?.data?.user?.lastName}`,
                profileImage: data?.data?.user?.profileImage,
                uuid: data?.data?.uuid,
                postId: data?.data?.uuid,
                chatTitle: !!data?.data?.conversation?.uuid,
                name: data?.data?.title,
                file: data?.data?.file?.[0],
                price: data?.data?.price,
                post: JSON.stringify(data?.data),
                sortConversation: true,
              },
            } as unknown as Href)
          }
          className="mx-4 mb-2 flex-row items-center justify-center gap-2 rounded-lg bg-primary py-3">
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
    </SafeAreaView>
  );
};

export default SinglePost;
