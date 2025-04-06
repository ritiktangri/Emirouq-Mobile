/* eslint-disable import/order */
import React, { useMemo } from 'react';
import { cn } from '~/utils/helper';

import { useGlobalSearchParams, useRouter } from 'expo-router';
import { Entypo } from '@expo/vector-icons';
import { Text } from '../common/Text';
import { i18n } from '~/utils/i18n';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from '../common/View';
import Header from '../Chat/ChatScreen/header';

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
  const header: any = useMemo(() => {
    if (chatTitle) {
      return (
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
      );
    }
    if (headerTitle) {
      return (
        <View className=" w-[10%] p-4">
          <Entypo name="chevron-left" size={24} color="white" onPress={handleGoBack} />
        </View>
      );
    } else {
      return <View className=" w-[10%] " />;
    }
  }, [headerTitle, title, chatTitle]);
  return (
    <SafeAreaView
      edges={['top']}
      className={cn('flex-row   rounded-b-xl ', !chatTitle && 'bg-primary')}>
      {header}
      <View className="w-[80%] items-center justify-center p-4">
        <Text className=" text-center text-2xl font-semibold capitalize text-white">
          {title ? title : headerTitle ? i18n.t(headerTitle) : i18n.t(`tab.${route?.route?.name}`)}
        </Text>
      </View>
      <View className=" w-[10%] " />
    </SafeAreaView>
  );
};

export default GlobalHeader;
