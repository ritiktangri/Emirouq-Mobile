import { Controller } from 'react-hook-form';
import { Modal, TouchableOpacity, FlatList, View } from 'react-native';
import { useState } from 'react';
import { useGetAttributeOptions, useGetParentAttributeOptions } from '~/hooks/attributes/query';
import { Text } from '~/components/common/Text';

export function SelectField({ control, name, label, attributeId, parentId }: any) {
  const [visible, setVisible] = useState(false);

  // for brand attribute
  const {
    data: attributeOptions,
    fetchNextPage: attributeFetchNextPage,
    hasNextPage: attributeHasNextPage,
    isFetchingNextPage: attributeIsFetchingNextPage,
  } = useGetAttributeOptions({
    attributeId,
  });

  // for model
  const {
    data: specificAttributeOptions,
    fetchNextPage: specificAttributeFetchNextPage,
    hasNextPage: specificAttributeHasNextPage,
    isFetchingNextPage: specificAttributeIsFetchingNextPage,
  } = useGetParentAttributeOptions({
    parentId,
  });
  const options = parentId
    ? specificAttributeOptions?.pages.flatMap((p: any) => p.data)
    : attributeOptions?.pages.flatMap((p: any) => p.data);
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <>
          <TouchableOpacity
            className="rounded-lg border border-gray-200 bg-white p-4"
            onPress={() => setVisible(true)}>
            <Text>
              {value ? (options || [])?.find((o) => o.uuid === value)?.value : `Select ${label}`}
            </Text>
          </TouchableOpacity>

          <Modal visible={visible} animationType="slide" transparent>
            <View className="flex-1 justify-center bg-white">
              <View className="max-h-[70%]">
                <FlatList
                  data={options}
                  keyExtractor={(item) => item.uuid}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      className="border-b border-gray-100 p-4"
                      onPress={() => {
                        onChange(item.uuid);
                        setVisible(false);
                      }}>
                      <Text>{item.value}</Text>
                    </TouchableOpacity>
                  )}
                  onEndReached={() => {
                    if (attributeHasNextPage && !attributeIsFetchingNextPage) {
                      attributeFetchNextPage();
                    }
                    if (specificAttributeHasNextPage && !specificAttributeIsFetchingNextPage) {
                      specificAttributeFetchNextPage();
                    }
                  }}
                  onEndReachedThreshold={0.3}
                  ListFooterComponent={
                    attributeIsFetchingNextPage || specificAttributeIsFetchingNextPage ? (
                      <Text className="p-4 text-center">Loading more...</Text>
                    ) : null
                  }
                />
              </View>
              <TouchableOpacity className="bg-gray-100 p-4" onPress={() => setVisible(false)}>
                <Text className="text-center text-red-500">Close</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </>
      )}
    />
  );
}
