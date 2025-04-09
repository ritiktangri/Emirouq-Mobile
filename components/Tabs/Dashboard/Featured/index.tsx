import React from 'react';
import { FlatList } from 'react-native';

import Render from './render';

const Featured = ({ data }: any) => {
  return (
    <FlatList
      horizontal
      data={data}
      keyExtractor={(item) => item?.uuid?.toString()}
      renderItem={Render}
    />
  );
};

export default Featured;
