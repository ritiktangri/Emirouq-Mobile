/* eslint-disable import/order */
import {
  View,
  TouchableOpacity,
  Modal,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  useColorScheme,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { DefaultText as Text } from '~/components/common/DefaultText';

import React, { useCallback, useState } from 'react';
import { Feather, FontAwesome6, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import SelectPicker from '~/components/UI/SelectPicker';
import { useSupport } from '~/context/SupportContext';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DefaultTextInput from '~/components/common/DefaultTextInput';
import { cn } from '~/utils/helper.utils';
import { ticketTypes } from '~/utils/dropdown';
import { renderIcon } from '~/components/Tabs/Diary/Render/attachments';
import theme from '~/utils/theme';

const AddTicket = ({ open, setOpen }: any) => {
  const [form, setForm] = useState({
    subject: '',
    description: '',
    type: '',
  });
  const colorScheme = useColorScheme();
  const [images, setImages] = useState([] as any);
  const { saveSupportTicket, saveLoading }: any = useSupport();
  const pickImage = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      aspect: [4, 3],
      quality: 0.8,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      const { assets }: any = result;
      if (assets) {
        setImages([...images, ...assets]);
      }
    }
  }, []);
  const onChange = useCallback((key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  }, []);

  return (
    <Modal
      onDismiss={() => setOpen(false)}
      animationType="fade"
      transparent
      visible={open}
      onRequestClose={() => setOpen(false)}>
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled
        contentContainerStyle={styles.modalContainer}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View
            style={styles.modalContent}
            className="w-full gap-y-1 rounded-xl bg-white p-5 dark:bg-[#282E36]">
            <View className="flex-row items-center justify-between">
              <Text className="my-4 text-xl font-semibold dark:text-white">Create Ticket</Text>
            </View>
            <DefaultTextInput
              numberOfLines={5}
              multiline
              title="Subject"
              textAlignVertical="top"
              placeholderClassName="text-xs"
              placeholderTextColor={theme.colors.dashboard_card_text}
              className={cn(
                '  w-full rounded-lg p-4 font-poppinsMedium text-sm dark:bg-[#1A212A] dark:text-white '
              )}
              placeholder="Enter subject"
              onChangeText={(value: any) => onChange('subject', value)}
            />

            <SelectPicker
              setData={(val: any) => onChange('type', val)}
              data={ticketTypes}
              title="Type"
              placeholder="Select"
              value={form.type}
              iosInputStyle={{
                backgroundColor: colorScheme === 'dark' ? '#1A212A' : 'white',
                borderColor: 'grey',
                borderWidth: colorScheme === 'dark' ? 0 : 0.4,
                // borderRadius: 10,
              }}
            />

            <DefaultTextInput
              numberOfLines={5}
              multiline
              title="Description"
              textAlignVertical="top"
              placeholderClassName="text-xs"
              placeholderTextColor={theme.colors.dashboard_card_text}
              className={cn(
                ' min-h-[100px] w-full rounded-lg p-4 font-poppinsMedium text-sm dark:bg-[#1A212A] dark:text-white'
              )}
              placeholder="Enter ticket description"
              onChangeText={(value: any) => onChange('description', value)}
            />

            <View className=" flex-col gap-3">
              <Text className="mb-1.5   mt-2 font-interMedium text-base text-white">
                Attachment(s)
              </Text>

              <View className="flex-row flex-wrap items-center ">
                {images?.length > 0 ? (
                  images.map((attachment: any) => (
                    <View
                      key={attachment.assetId || attachment?.fileName}
                      className="w-1/2 flex-row items-center  gap-2 py-2">
                      <View className=" items-center justify-center overflow-hidden rounded-md">
                        {renderIcon[attachment?.mimeType]}
                      </View>
                      <View className="flex-1">
                        <Text className="text-xs font-medium dark:text-dashboard_card_text">
                          {attachment?.fileName}
                        </Text>
                        <View className="mt-4 flex-row items-center gap-2">
                          <TouchableOpacity
                            className="flex-row items-center gap-1"
                            onPress={() =>
                              setImages((prev: any) =>
                                prev.filter((val: any) => val?.assetId !== attachment?.assetId)
                              )
                            }>
                            <Ionicons name="trash" size={15} color="#FF00008B" />
                            <Text className="text-sm text-gray-500">Delete</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  ))
                ) : (
                  <></>
                )}
              </View>
            </View>
            <View className="">
              {!!images?.length === false ? (
                <>
                  <TouchableOpacity
                    onPress={pickImage}
                    className="flex-col gap-2 rounded-lg border-[0.4px] border-gray-400 p-4 dark:border-0 dark:bg-[#1A212A]">
                    <Image
                      source={require('../../../../assets/drawer/upload-light.png')}
                      className="h-[50px] w-[100%]"
                      resizeMode="contain"
                    />
                    <Text className="text-center font-semibold dark:text-white">Select File</Text>
                    <Text className="text-center text-xs text-gray-400">
                      Click browse to upload through your device
                    </Text>
                  </TouchableOpacity>
                </>
              ) : (
                <View className="mt-2  flex-row justify-end gap-3 ">
                  <TouchableOpacity
                    className="  flex-row items-center gap-3 rounded-lg bg-primary p-3"
                    onPress={pickImage}>
                    <Feather name="upload" size={15} color="#fff" />
                    <Text className="font-poppinsMedium text-white">Attach</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <View className="my-4 flex-row gap-2">
              <TouchableOpacity
                className="flex-1 rounded-lg bg-[#3e454d] p-3"
                onPress={() => {
                  setOpen(false);
                  setImages([] as any);
                  setForm({ subject: '', description: '', type: '' });
                }}>
                <Text className="text-center font-semibold text-white dark:text-[#CECFD2]">
                  Close
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-1 flex-row items-center justify-center gap-3 rounded-lg bg-primary p-3"
                onPress={() => {
                  saveSupportTicket(
                    { ...form, images },
                    () => {
                      setForm({
                        subject: '',
                        description: '',
                        type: '',
                      });
                      setImages([] as any);
                      setOpen(false);
                    },
                    () => {
                      setOpen(false);
                    }
                  );
                  //   router.push('/(hydrogen)/(timezone)/page');
                }}>
                {saveLoading ? <ActivityIndicator color="#fff" /> : <></>}
                <Text className="text-center font-semibold text-white">Create Ticket</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: '100%', // Adjust width as needed
    minHeight: '70%', // Ensure modal doesn't exceed screen height
  },
  scrollContent: {
    flexGrow: 1, // Important for ScrollView to take up available space
    justifyContent: 'space-between', // Add this to ensure content inside the scroll view can scroll
  },
});

export default AddTicket;
