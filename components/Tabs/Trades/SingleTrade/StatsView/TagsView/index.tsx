import { View, FlatList, useColorScheme } from 'react-native';
import React, { useState } from 'react';
import { tagsObj } from './data';
import { FontAwesome } from '@expo/vector-icons';
import MultiSelectComponent from '~/components/UI/Multiselect';
import { DefaultText as Text } from '~/components/common/DefaultText';

const TagsView = ({ data }: any) => {
  const tags = tagsObj.data;
  const [selectedTags, setSelectedTags] = useState();
  const colorScheme = useColorScheme();
  const renderData = (data: any, idx: any) => {
    return (
      <View className="mt-3">
        <MultiSelectComponent
          placeholder="Select"
          transparent
          selected={selectedTags}
          setSelected={setSelectedTags}
          customTitle={
            <View className="flex-row items-center gap-2">
              <FontAwesome name="tags" size={18} color={data?.color} />
              <Text className="mb-1.5 ml-0.5 text-base font-semibold dark:text-white">
                {data?.name}
              </Text>
            </View>
          }
          data={data?.tags?.map((val: any) => {
            return {
              label: val?.name,
              value: val?._id,
            };
          })}
          containerStyle={{
            backgroundColor: colorScheme === 'dark' ? 'black' : 'white',
          }}
        />
      </View>
    );
  };
  return (
    <View className="p-4">
      <FlatList
        onEndReachedThreshold={0.3}
        showsVerticalScrollIndicator={false}
        data={tags}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => {
          return renderData(item, index);
        }}
        initialNumToRender={6}
      />
    </View>
  );
};

export default TagsView;
