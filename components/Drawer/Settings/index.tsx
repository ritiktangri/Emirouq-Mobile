/* eslint-disable import/order */
import { View, TouchableOpacity, SectionList, ScrollView, Image } from 'react-native';
import React from 'react';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '~/context/AuthContext';
import { profile_icon, security_icon, support_icon, timezone_icon } from '~/image';
import { routes } from '~/utils/routes';
import { DefaultText as Text } from '~/components/common/DefaultText';
import { useTheme } from '~/context/ThemeContext';
import { getInitials } from '~/utils/helper.utils';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image as ExpoImage } from 'expo-image';
const blurhash = 'LEHV6nWB2yk8pyo0adR*.7kCMdnj';

const Settings = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { colorScheme }: any = useTheme();

  const settingRoutes = [
    {
      title: 'Account',
      data: [
        { title: 'Profile Information', logo: profile_icon, path: routes.user.profile },
        { title: 'Security', logo: security_icon, path: routes.user.security },
        // { title: 'Account Settings', logo: settings_icon, path: routes.user.settings },
      ],
    },
    {
      title: 'General',
      data: [
        { title: 'Timezone', logo: timezone_icon, path: routes.user.timezone },
        { title: 'Help & Support', logo: support_icon, path: routes.user.support_inbox },
      ],
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-drawer">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center gap-2 p-2">
          <TouchableOpacity onPress={() => router.back()} className="ml-4">
            <Ionicons
              name="arrow-back"
              size={24}
              color={colorScheme === 'dark' ? 'white' : 'black'}
            />
          </TouchableOpacity>
          <Text className="ml-4 text-xl font-semibold dark:text-white">Settings</Text>
        </View>
        <View className="p-2">
          <View className="flex flex-row items-center  gap-3 border-b-[1px] border-gray-500 p-4">
            {user?.profileImage ? (
              <ExpoImage
                source={{ uri: user?.profileImage }}
                contentFit="fill"
                placeholder={{ blurhash }}
                transition={1000}
                style={{
                  height: 64,
                  width: 64,
                  borderRadius: 100,
                }}
              />
            ) : (
              <View className="flex h-16  w-16 items-center justify-center rounded-full bg-primary">
                <Text light="text-black" dark="text-white" className=" font-poppinsMedium text-2xl">
                  {getInitials(`${user?.firstName} ${user?.lastName}`)}
                </Text>
              </View>
            )}
            <View className="flex-1 flex-col gap-1">
              <Text light="text-black" dark="text-white" className="font-poppinsMedium text-xl ">
                {user?.firstName} {user?.lastName}
              </Text>
              <Text light="text-black" dark="text-white" className="font-interMedium text-sm">
                {user?.email}
              </Text>
            </View>
          </View>
          <View className="p-4">
            <SectionList
              sections={settingRoutes}
              scrollEnabled={false}
              stickySectionHeadersEnabled={false}
              keyExtractor={(item, index) => index?.toString()}
              renderItem={({ item }: any) => (
                <TouchableOpacity
                  className="my-3 flex-row items-center justify-between"
                  onPress={() => {
                    router.push(item.path);
                  }}>
                  <View className="flex-row items-center gap-x-3">
                    <Image source={item?.logo} className="h-6 w-6" resizeMode="contain" />
                    <Text dark="text-white" light="text-black" className="font-poppinsMedium">
                      {item?.title}
                    </Text>
                  </View>
                  <Entypo
                    name="chevron-right"
                    size={24}
                    color={colorScheme === 'dark' ? 'white' : 'black'}
                  />
                </TouchableOpacity>
              )}
              renderSectionHeader={({ section: { title } }) => (
                <Text
                  dark="text-white"
                  light="text-black"
                  className="mb-2 mt-8 font-poppinsMedium text-lg ">
                  {title}
                </Text>
              )}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
