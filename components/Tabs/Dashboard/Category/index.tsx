/* eslint-disable import/order */
import { FlatList } from 'react-native';
import React from 'react';
import Render from './render';

const Category = ({ data }: any) => {
  return (
    <FlatList
      horizontal
      data={data}
      keyExtractor={(item) => item?.uuid?.toString()}
      renderItem={Render}
    />
  );
};

export default Category;
