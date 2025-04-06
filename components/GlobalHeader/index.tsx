/* eslint-disable import/order */
import React, { useMemo } from 'react';
import { cn } from '~/utils/helper';

import { useGlobalSearchParams, useRouter } from 'expo-router';
import { Text } from '../common/Text';
import { i18n } from '~/utils/i18n';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from '../common/View';
import Header from '../Chat/ChatScreen/header';
import { Entypo, Ionicons } from '@expo/vector-icons';

// title is dynamic text, but it cannot be translated
// headerTitle is static text, and it can be translated
// chatTitle is used to show on the chat screen
const GlobalHeader = ({ route }: any) => {
  const router: any = useRouter();
  const {
    headerTitle,
    title,
    chatTitle = false,
    fullName,
    profileImage,
    userId,
  } = useGlobalSearchParams();
  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <SafeAreaView
      edges={['top']}
      className={cn('flex-row   rounded-b-xl ', !chatTitle && 'bg-primary')}>
      {chatTitle ? (
        <View className="w-full">
          <Header
            onPress={handleGoBack}
            data={{
              fullName,
              profileImage,
              userId,
            }}
          />
        </View>
      ) : (
        <View className="flex-row items-center justify-between bg-primary p-4">
          {headerTitle || title ? (
            <View className=" w-[10%] ">
              <Ionicons name="chevron-back" size={24} color="white" onPress={handleGoBack} />
            </View>
          ) : (
            <View className=" w-[10%] " />
          )}
          <View className="w-[80%] items-center justify-center bg-primary ">
            <Text className=" text-center text-2xl font-semibold capitalize text-white">
              {title
                ? title
                : headerTitle
                  ? i18n.t(headerTitle)
                  : i18n.t(`tab.${route?.route?.name}`)}
            </Text>
          </View>
          <View className=" w-[10%] " />
        </View>
      )}
    </SafeAreaView>
  );
};

export default GlobalHeader;
