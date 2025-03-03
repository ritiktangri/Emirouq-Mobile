/* eslint-disable import/order */
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import React, { useMemo } from 'react';
import { DefaultText as Text } from '~/components/common/DefaultText';
import DefaultTextInput from '~/components/common/DefaultTextInput';
import theme from '~/utils/theme';
import { AntDesign } from '@expo/vector-icons';
import { useTags } from '~/context/TagsContext';
import SelectPicker from '~/components/UI/SelectPicker';
import { useTheme } from '~/context/ThemeContext';
import { SelectPnl as SelectCategory } from '~/components/common/SelectPnl';

const AddTag = ({ open, setOpen, loading, onSave }: any) => {
  const { getCategoryColor, tagList } = useTags();
  const { isDarkTheme } = useTheme();
  const selectedValue = useMemo(
    () => tagList?.find((i: any) => i?.uuid === open?.categoryId)?.name,
    [tagList, open?.categoryId]
  );
  return (
    <Modal
      animationType="fade"
      transparent
      visible={open?.open}
      onRequestClose={() =>
        setOpen({
          open: false,
        })
      }>
      <View className="flex-1 items-center justify-center bg-[rgba(0,0,0,0.5)] px-4">
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View className="w-full gap-4 rounded-xl bg-white  p-5 dark:bg-[#282E36]">
            <Text className=" text-xl font-semibold dark:text-white">
              {open?.uuid && open?.type === 'tags' ? 'Edit Tag' : 'Add Tag'}
            </Text>
            <DefaultTextInput
              title="Tag Name"
              value={open?.name}
              onChangeText={(text: any) => setOpen({ ...open, name: text })}
              className="w-full rounded-lg border-[1px] border-gray-400 p-4 dark:border-2 dark:border-gray-600 dark:bg-dashboard_card dark:text-white"
              placeholder="Enter Account Name"
              placeholderTextColor={theme.colors.dashboard_card_text}
            />
            {Platform.OS === 'android' ? (
              <>
                <Text className="text-sm font-semibold dark:text-white">Category</Text>
                <SelectCategory
                  width="w-full"
                  nestedDropdownClassName=" border-2 rounded-lg border-gray-600 w-full bg-white dark:bg-analytics_card max-h-auto "
                  buttonClassName="bg-white dark:bg-dashboard_card"
                  className="w-full rounded-lg border-[1px] border-gray-400  bg-dashboard_card dark:border-2 dark:border-gray-600 dark:text-white"
                  options={{
                    data: tagList?.map(
                      (i: any) =>
                        ({
                          id: i?.name,
                          label: i?.name,
                          value: i?.uuid,
                          icon: (
                            <AntDesign name="tagso" size={24} color={getCategoryColor(i?.name)} />
                          ),
                        }) as any
                    ),
                  }}
                  selected={open?.categoryId}
                  value={selectedValue}
                  setSelected={async (value: any) => {
                    setOpen({ ...open, categoryId: value });
                  }}
                  overlay={false}
                />
              </>
            ) : (
              <SelectPicker
                data={tagList?.map(
                  (i: any) =>
                    ({
                      id: i?.name,
                      label: i?.name,
                      value: i?.uuid,
                    }) as any
                )}
                title="Category"
                setData={async (value: any) => {
                  setOpen({ ...open, categoryId: value });
                }}
                placeholder="Select"
                iosInputStyle={{
                  borderWidth: isDarkTheme ? 2 : 1,
                  borderColor: isDarkTheme ? '#4b5563' : '#9ca3af',
                  backgroundColor: isDarkTheme ? '#131B24' : 'transparent',
                  paddingVertical: 13,
                }}
              />
            )}

            <DefaultTextInput
              numberOfLines={10}
              multiline
              title="Description"
              textAlignVertical="top"
              placeholderClassName="text-xs"
              placeholderTextColor={theme.colors.dashboard_card_text}
              className="min-h-[100px] w-full rounded-lg border-[1px] border-gray-400 p-4 dark:border-2 dark:border-gray-600 dark:bg-dashboard_card dark:text-white"
              placeholder="Enter subject"
              value={open?.description}
              onChangeText={(value: any) => setOpen({ ...open, description: value })}
            />
            <View className="mb-4 flex-row justify-between gap-4">
              <TouchableOpacity
                className="flex-1 rounded-lg bg-[#3e454d] p-3"
                onPress={() =>
                  setOpen({
                    open: false,
                  })
                }>
                <Text className="text-center font-semibold text-white dark:text-[#CECFD2]">
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 flex-row items-center justify-center gap-2 rounded-lg bg-primary p-3"
                onPress={() => {
                  onSave(open);
                }}>
                {loading ? <ActivityIndicator color={theme.colors.white} /> : <></>}
                <Text className="text-center text-sm font-semibold text-white">
                  {open?.uuid && open?.type === 'tags' ? 'Update' : 'Create'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
};

export default AddTag;
