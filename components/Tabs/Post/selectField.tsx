import { Controller } from 'react-hook-form';
import {
  Modal,
  TouchableOpacity,
  FlatList,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  TextInput,
} from 'react-native';
import { useCallback, useState } from 'react';
import { useGetAttributeOptions, useGetParentAttributeOptions } from '~/hooks/attributes/query';
import { Text } from '~/components/common/Text';
import { Ionicons } from '@expo/vector-icons';
import { debounce } from 'lodash';

export function SelectField({
  control,
  name,
  label,
  attributeId,
  parentId,
  dependsOn,
  filterType,
  onSelect,
}: any) {
  const [visible, setVisible] = useState(false);
  const [keyword, setKeyword] = useState('');

  // Fetch attribute options
  const {
    data: attributeOptions,
    fetchNextPage: attributeFetchNextPage,
    hasNextPage: attributeHasNextPage,
    isFetchingNextPage: attributeIsFetchingNextPage,
  } = useGetAttributeOptions({ attributeId, dependsOn, keyword });

  const {
    data: specificAttributeOptions,
    fetchNextPage: specificAttributeFetchNextPage,
    hasNextPage: specificAttributeHasNextPage,
    isFetchingNextPage: specificAttributeIsFetchingNextPage,
  } = useGetParentAttributeOptions({ parentId, dependsOn, keyword });

  const options = parentId
    ? specificAttributeOptions?.pages.flatMap((p: any) => p.data)
    : attributeOptions?.pages.flatMap((p: any) => p.data);

  /** 🧠 Debounce input */
  const handleDebounce = useCallback(
    debounce((text: string) => setKeyword(text), 300),
    []
  );

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => {
        // Helper for checkbox: toggle selection
        const toggleValue = (item: any) => {
          if (!Array.isArray(value)) {
            onChange([
              {
                value: item?.value,
                id: item.uuid,
              },
            ]);
          } else {
            const exists = value.find((v) => v.id === item.uuid);
            if (exists) {
              onChange(value.filter((v) => v.id !== item.uuid));
            } else {
              onChange([...value, { id: item.uuid, value: item.value }]);
            }
          }
        };

        const isSelected = (item: any) =>
          filterType === 'checkbox' && Array.isArray(value)
            ? value.some((v) => v.id === item.uuid)
            : value?.id === item.uuid;

        return (
          <>
            {/* Field Trigger */}
            <TouchableOpacity
              className="rounded-xl border border-gray-300 bg-white p-4"
              onPress={() => setVisible(true)}>
              <Text className="text-gray-700">
                {filterType === 'checkbox'
                  ? value?.length
                    ? value.map((v: any) => v.value).join(', ')
                    : `Select ${label}`
                  : value?.value || `Select ${label}`}
              </Text>
            </TouchableOpacity>

            {/* Modal */}
            <Modal
              visible={visible}
              animationType="slide"
              transparent
              onRequestClose={() => {}}
              onDismiss={() => {}}>
              <KeyboardAvoidingView
                className="flex-1 justify-end bg-black/50"
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  <View className="flex-1 justify-end">
                    <View className="max-h-[80%] rounded-t-2xl bg-white shadow-lg">
                      {/* Header */}
                      <View className="flex-row items-center justify-between border-b border-gray-100 px-5 py-4">
                        <Text className="text-lg font-semibold text-gray-900">Select {label}</Text>
                        <Pressable onPress={() => setVisible(false)}>
                          <Ionicons name="close" size={22} color="#444" />
                        </Pressable>
                      </View>

                      {/* Search Field */}
                      <View className="px-5 py-3">
                        <TextInput
                          placeholder="Search..."
                          onChangeText={handleDebounce}
                          className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-base text-gray-700"
                          placeholderTextColor="#999"
                          autoFocus
                        />
                      </View>

                      {/* Options List */}
                      <FlatList
                        data={options}
                        keyExtractor={(item) => item.uuid}
                        keyboardShouldPersistTaps="handled"
                        contentContainerClassName="pb-10"
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            className={`border-b border-gray-100 px-5 py-3 active:bg-gray-50 ${
                              isSelected(item) ? 'bg-primary/50' : ''
                            }`}
                            onPress={() => {
                              if (filterType === 'checkbox') {
                                toggleValue(item);
                              } else {
                                onSelect?.();
                                onChange({ id: item.uuid, value: item.value });
                                setVisible(false);
                              }
                            }}>
                            <Text className="text-base text-gray-800">{item.value}</Text>
                          </TouchableOpacity>
                        )}
                        onEndReached={() => {
                          if (attributeHasNextPage && !attributeIsFetchingNextPage)
                            attributeFetchNextPage();
                          if (specificAttributeHasNextPage && !specificAttributeIsFetchingNextPage)
                            specificAttributeFetchNextPage();
                        }}
                        onEndReachedThreshold={0.3}
                        ListEmptyComponent={
                          <Text className="px-5 py-10 text-center text-gray-400">
                            No options found
                          </Text>
                        }
                        ListFooterComponent={
                          attributeIsFetchingNextPage || specificAttributeIsFetchingNextPage ? (
                            <Text className="p-4 text-center text-gray-500">Loading more...</Text>
                          ) : null
                        }
                      />
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </KeyboardAvoidingView>
            </Modal>
          </>
        );
      }}
    />
  );
}
