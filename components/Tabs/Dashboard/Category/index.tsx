/* eslint-disable import/order */
import { FlatList } from 'react-native';
import React from 'react';
import Render from './render';
import { View } from '~/components/common/View';

const Category = ({ data }: any) => {
  return (
    <FlatList
      horizontal
      data={data}
      keyExtractor={(item) => item?.uuid?.toString()}
      renderItem={Render}
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => <View className="mx-1" />}
      contentContainerStyle={{
        paddingHorizontal: 10,
        paddingVertical: 6,
        marginBottom: 10,
        marginTop: 12,
      }}
    />
  );
};

export default Category;
