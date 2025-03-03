/* eslint-disable import/order */
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
} from 'react-native';
import React from 'react';
import ColorPicker, { Panel1, OpacitySlider, HueSlider } from 'reanimated-color-picker';
import { DefaultText as Text } from '~/components/common/DefaultText';
import DefaultTextInput from '~/components/common/DefaultTextInput';
import theme from '~/utils/theme';

const AddCategory = ({ open, setOpen, onSave, loading }: any) => {
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
          <View className="gap-4 rounded-xl bg-white  p-5  dark:bg-[#282E36]">
            <Text className="mb-4 text-xl font-semibold dark:text-white">
              {open?.uuid ? 'Edit Category' : 'Add Category'}
            </Text>
            <DefaultTextInput
              title="Category Name"
              value={open?.name}
              onChangeText={(text: any) => setOpen({ ...open, name: text })}
              className="w-full rounded-lg border-[1px] border-gray-400 p-4 dark:border-2 dark:border-gray-600 dark:bg-dashboard_card dark:text-white"
              placeholder="Enter Account Name"
              placeholderTextColor={theme.colors.dashboard_card_text}
            />
            <View className=" flex-row items-center gap-3">
              <DefaultTextInput
                title="Category Color"
                editable={false}
                value={open?.color}
                onChangeText={(text: any) => setOpen({ ...open, color: text })}
                className="w-full rounded-lg border-[1px] border-gray-400 p-4 dark:border-2 dark:border-gray-600 dark:bg-dashboard_card dark:text-white"
                placeholder="Enter Category Color"
                containerClassName="flex-1"
                placeholderTextColor={theme.colors.dashboard_card_text}
              />
            </View>

            <View className="flex gap-y-2">
              <Text className="text-base font-semibold dark:text-white">Choose Color</Text>
              <ColorPicker
                style={{ width: '70%' }}
                value={open?.color}
                onComplete={(e) => {
                  setOpen({
                    ...open,
                    color: e?.hex,
                  });
                }}>
                <Panel1 thumbSize={20} />
                <HueSlider
                  sliderThickness={10}
                  style={{
                    marginBottom: 10,
                    marginTop: 20,
                  }}
                  thumbSize={20}
                />
                <OpacitySlider
                  sliderThickness={10}
                  style={{
                    marginVertical: 10,
                  }}
                  thumbSize={20}
                />
              </ColorPicker>
            </View>
            <View className=" flex-row justify-between gap-4">
              <TouchableOpacity
                className="flex-1 rounded-lg bg-[#3e454d] p-3"
                onPress={() =>
                  setOpen({
                    open: false,
                  })
                }>
                <Text className="text-center text-sm font-semibold text-white dark:text-[#CECFD2]">
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
                  {open?.uuid ? 'Update' : 'Create'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
};

export default AddCategory;
