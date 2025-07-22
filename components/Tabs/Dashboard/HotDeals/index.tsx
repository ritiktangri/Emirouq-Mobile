import React from 'react';
import { FlatList, Image } from 'react-native';

import Render from './render';
import { View } from '~/components/common/View';
import { Text } from '~/components/common/Text';
import { i18n } from '~/utils/i18n';
import { routes } from '~/utils/routes';
import { Href, useRouter } from 'expo-router';
import { empty } from '~/image';

const HotDeals = ({ data }: any) => {
  const router = useRouter();

  return (
    <View className="mb-3">
      <View className="flex-row items-center justify-between px-4">
        <Text className="text-lg font-semibold">{i18n.t('home.hot_deals')}</Text>
        <Text
          className="text-lg text-primary"
          onPress={() => {
            router.push({
              pathname: routes.tabs.post_list,
              params: {
                tag: 'hot_deals',
              },
            } as Href);
          }}>
          {i18n.t('home.view_more')}
        </Text>
      </View>
      <FlatList
        horizontal
        data={data}
        keyExtractor={(item) => item?.uuid?.toString()}
        renderItem={({ item }) => <Render item={item} />}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 10,
          paddingVertical: 6,
        }}
        ListEmptyComponent={() => (
          <View
            style={{
              height: 200,
              width: 400,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={empty} className="h-48 w-48 self-center" />
          </View>
        )}
      />
    </View>
  );
};

export default HotDeals;
