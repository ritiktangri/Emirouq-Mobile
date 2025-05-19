import React from 'react';
import { FlatList } from 'react-native';

import Render from './render';
import { Text } from '~/components/common/Text';
import { View } from '~/components/common/View';
import { i18n } from '~/utils/i18n';
import { Href, useRouter } from 'expo-router';
import { routes } from '~/utils/routes';

const Featured = ({ data }: any) => {
  const router = useRouter();
  return (
    <View className="mb-3">
      <View className="flex-row items-center justify-between px-4">
        <Text className="text-lg font-semibold">{i18n.t('home.featured_listings')}</Text>
        <Text
          className="text-lg text-primary"
          onPress={() => {
            router.push({
              pathname: routes.tabs.post_list,
              params: {
                tag: 'featured_listings',
              },
            } as Href);
          }}>
          {i18n.t('home.see_all')}
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
      />
    </View>
  );
};

export default Featured;
