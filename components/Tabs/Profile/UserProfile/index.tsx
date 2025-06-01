/* eslint-disable import/order */
import {
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import { useAuth } from '~/context/AuthContext';
import { Image as ExpoImage } from 'expo-image';
import {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  Fontisto,
  Ionicons,
} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useLocale } from '~/context/LocaleContext';
import { arabic, english } from '~/image';
import { i18n } from '~/utils/i18n';
import { Text } from '~/components/common/Text';
import { Href, useRouter } from 'expo-router';
import { routes } from '~/utils/routes';
import { View } from '~/components/common/View';
import { useAuth as ClerkUseAuth } from '@clerk/clerk-expo';
import { queryClient } from '~/app/_layout';
import { useCurrentLocation } from '~/components/UserLocation';

const UserProfile = () => {
  const { getToken, signOut } = ClerkUseAuth();
  const { address }: any = useCurrentLocation();
  const { user } = useAuth();

  const { locale } = useLocale();
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<any>({
    uri:
      user?.profileImage ||
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D',
  });

  const { logout } = useAuth();

  const pickImage = async () => {
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      aspect: [4, 3],
      quality: 0.8,
      base64: true,
    });

    if (!result.canceled) {
      setProfileImage(result?.assets?.[0]);
    }
  };

  let addressStr = `${address?.name ? `${address?.name},` : ''} ${address?.district ? `${address?.district},` : ''} ${address?.city ? `${address?.city},` : ''} ${address?.country || ''}`;
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="">
          <View className="flex-col items-center gap-y-1 rounded-lg bg-white py-4">
            {profileImage?.uri || user?.profileImage ? (
              <View className="relative h-[80px] w-[80px] rounded-full ">
                <ExpoImage
                  source={{ uri: profileImage?.uri || user?.profileImage }}
                  contentFit="cover"
                  placeholder={{ blurhash: 'LEHV6nWB2yk8pyo0adR*.7kCMdnj' }}
                  transition={1000}
                  style={{
                    height: '100%',
                    width: '100%',
                    borderRadius: 100,
                  }}
                />
              </View>
            ) : (
              <FontAwesome name="user-circle-o" size={80} color="gray" />
            )}
            {/* <AntDesign
              name="camerao"
              size={18}
              color="white"
              onPress={pickImage}
              className="relative bottom-8 left-6 rounded-full bg-primary p-1"
            /> */}

            <View className="flex flex-col items-center gap-y-2">
              <Text className="text-center text-lg font-semibold">{`${user?.firstName} ${user?.lastName || ''}`}</Text>
              <Text className="text-center text-gray-600">{user?.email}</Text>
              {address && (
                <View className="flex-row items-center justify-center ">
                  <EvilIcons name="location" size={18} color="#4b5563" />
                  <Text className="text-center text-gray-600">{addressStr}</Text>
                </View>
              )}
            </View>
          </View>
          {/* STATS */}
          <View className="mt-2 flex-row justify-between rounded-lg bg-white px-3 py-3">
            <View className="flex items-center">
              <Text className="text-xl font-semibold">45</Text>
              <Text>Ads Posted</Text>
            </View>
            <View className="flex items-center">
              <Text className="text-xl font-semibold">38</Text>
              <Text>Items Sold</Text>
            </View>
            <View className="flex items-center">
              <Text className="text-xl font-semibold">90%</Text>
              <Text>Response Rate</Text>
            </View>
          </View>
          {/* PERSONAL INFORMATION */}
          <View className="mt-2 rounded-lg bg-white px-3 py-3 ">
            <Text className="text-xl font-semibold">{i18n.t('profile.personalInformation')}</Text>
            <View className="flex  justify-start">
              <View direction={locale} className="">
                <AntDesign name="mobile1" size={24} color="gray" />
                <View className="w-full flex-col border-b-[0.2px] border-gray-300 py-2">
                  <Text placement={locale} className="text-gray-600">
                    {i18n.t('profile.phone')}
                  </Text>
                  <Text placement={locale} className="">
                    {user?.phoneNumber || '--'}
                  </Text>
                </View>
              </View>
              <View direction={locale} className="">
                <Fontisto name="email" size={24} color="gray" />
                <View className="w-full flex-col border-b-[0.2px] border-gray-300 py-2">
                  <Text placement={locale} className="text-gray-600">
                    {i18n.t('profile.email')}
                  </Text>
                  <Text placement={locale} className="">
                    {user?.email}
                  </Text>
                </View>
              </View>
              {/* <View direction={locale} className="">
                <EvilIcons name="location" size={24} color="gray" />
                <View className="flex-col py-2">
                  <Text placement={locale} className="text-gray-600">
                    {i18n.t('profile.location')}
                  </Text>
                  <Text placement={locale} className="">
                    {addressStr}
                  </Text>
                </View>
              </View> */}
            </View>
          </View>
          {/* ACCOUNT SETTINGS */}
          <View className="my-2 rounded-lg bg-white p-2">
            <Text placement={locale} className="text-lg font-semibold">
              {i18n.t('profile.accountSettings')}
            </Text>
            <TouchableOpacity
              onPress={() => {
                router.push({
                  pathname: routes.tabs.profile['select-language'],
                  params: {
                    headerTitle: 'profile.language',
                  },
                } as Href);
              }}
              className="my-3 ">
              <View direction={locale}>
                <View direction={locale} className="flex-1">
                  <Image
                    source={locale === 'ar' ? arabic : english}
                    className="h-8 w-8 rounded-full"
                  />
                  <Text className="font-poppinsMedium">{i18n.t('profile.language')}</Text>
                </View>

                <View direction={locale} className="">
                  <Text className="font-poppinsMedium">
                    {locale === 'ar' ? 'العربية' : 'English'}
                  </Text>
                  <Ionicons
                    name={locale === 'ar' ? 'chevron-back-outline' : 'chevron-forward-outline'}
                    size={20}
                    color="gray"
                  />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className="my-3 flex-row items-center justify-between"
              onPress={() => {
                router.push(routes.tabs.help_support as Href);
              }}>
              <View className="flex-row  items-center gap-x-2">
                <Feather name="help-circle" size={20} color="gray" />
                <Text className="text-gray-900">Help & Support</Text>
              </View>
              <Entypo name="chevron-right" size={20} color="gray" />
            </TouchableOpacity>
            {/* <View className="my-3 flex-row items-center justify-between">
              <View className="flex-row  items-center gap-x-2">
                <Ionicons name="notifications-outline" size={20} color="gray" />
                <Text className="">Direct Messages</Text>
              </View>
              <Switch value={true} />
            </View>
            <View className="my-3 flex-row items-center justify-between">
              <View className="flex-row  items-center gap-x-2">
                <Feather name="lock" size={20} color="gray" />
                <Text className="">Two Factor Authentication</Text>
              </View>
              <Switch value={true} />
            </View> */}
          </View>
          <TouchableOpacity
            onPress={() => {
              router.navigate({
                pathname: routes.tabs.create_profile,
                params: {
                  isEdit: true,
                },
              } as unknown as Href);
            }}
            className="my-2 flex-row items-center justify-center gap-x-3 rounded-xl border-2 border-primary py-2">
            <Feather name="edit-2" size={16} color="#FF5722" />
            <Text className="font-semibold text-primary">{i18n.t('profile.edit_profile')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              logout(() => {
                signOut();
                queryClient.clear();
              })
            }
            className="my-2 flex-row items-center justify-center gap-x-3 rounded-xl border-2 border-red-500 py-2">
            <Ionicons name="log-out" size={20} color="red" />
            <Text className="font-semibold text-red-500">{i18n.t('profile.logout')}</Text>
          </TouchableOpacity>
          <View className="mt-6 rounded-t-xl border-t border-gray-300 p-2">
            <View className="mb-2 flex-row items-center justify-center gap-x-2">
              <Feather name="mail" size={18} color="#4B5563" />
              <Text className="text-sm font-medium text-gray-700">Support@emirouq.ae</Text>
            </View>
            <View className="flex-row items-center justify-center gap-x-2">
              <Feather name="clock" size={18} color="#4B5563" />
              <Text className="text-sm font-medium text-gray-700">Support Hours: 9 AM - 6 PM</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default UserProfile;
