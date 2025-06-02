/* eslint-disable import/order */
import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { TouchableOpacity, Modal, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { View } from '~/components/common/View';
import { Text } from '~/components/common/Text';
import { Entypo, Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import DefaultTextInput from '~/components/common/DefaultTextInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { cn } from '~/utils/helper';
import AudioRecorder from './audioRecord';
import { useAudioPlayer } from '~/context/AudioPlayerContext';
import LottieFilesAnimation from '~/components/LottieFiles';
import { uploadingFiles } from '~/image';
const schema = z.object({
  message: z.string().optional(),
  attachments: z
    .array(
      z.object({
        uri: z.string(),
        assetId: z.string(),
        fileName: z.string(),
        type: z.string(),
      })
    )
    .optional(),
  audio: z.object({
    sound: z.string(),
    duration: z.string(),
    uri: z.string(),
    type: z.string(),
  }),
});
type FormData = z.infer<typeof schema>;

export default function Footer({
  sendMessage,
  onContentSizeChange,
  uploadLoading,
}: {
  sendMessage: (message: string, callback?: () => void) => void;
  onContentSizeChange: (event: any) => void;
  uploadLoading?: any;
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const { watch, setValue, control } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      attachments: [],
      message: '',
    },
  });
  const pickImage = async () => {
    const result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      aspect: [4, 3],
      quality: 0.8,
      base64: false,
      allowsMultipleSelection: true,
      // allowsEditing: true,
    });

    if (!result.canceled) {
      const selectedAssets = result.assets.map((asset: any) => ({
        uri: asset?.uri,
        fileName: asset?.fileName || asset?.uri.split('/').pop(),
        type: asset?.mimeType,
        assetId: asset?.assetId || asset?.fileName || asset?.uri.split('/').pop(),
      }));
      setValue('attachments', [...(watch('attachments') || []), ...selectedAssets]);
      setModalVisible(false);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setValue('attachments', [
        ...(watch('attachments') || []),
        {
          uri: result.assets[0].uri,
          fileName: result.assets[0].fileName || result.assets[0].uri.split('/').pop() || '',
          type: result.assets[0].mimeType || '',
          assetId:
            result.assets[0].assetId ||
            result.assets[0].fileName ||
            result.assets[0].uri.split('/').pop() ||
            '',
        },
      ]);
      setModalVisible(false);

      // saveFile(asset?.uri, 'image');
    }
  };

  const pickDocument = async () => {
    const result: any = await DocumentPicker.getDocumentAsync({
      type: [
        // 'application/msword',
        // 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/pdf',
        // 'application/vnd.ms-excel',
        // 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        // 'application/vnd.ms-powerpoint',
        // 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      ],
      copyToCacheDirectory: true,
    });
    if (result.canceled === false) {
      const selectedAssets = result.assets.map((asset: any) => ({
        uri: asset?.uri,
        fileName: asset?.name,
        type: asset?.mimeType,
        assetId: asset?.assetId || asset?.name,
      }));
      setValue('attachments', [...(watch('attachments') || []), ...selectedAssets]);
      setModalVisible(false);
      // saveFile(result.assets[0].uri, 'document');
    }
  };

  const removeFile = (index: any) => {
    const updatedFiles = watch('attachments')?.filter((_: any, i: number) => i !== index);
    setValue('attachments', updatedFiles);
  };

  const fileIcon: any = {
    'application/pdf': <FontAwesome name="file-pdf-o" size={24} color="#FF5733" />,
  };

  const { play, stop, currentlyPlayingRef, currentAudio, setCurrentAudio } = useAudioPlayer();
  const isEditable = !!watch('audio')?.uri || !!(watch('attachments') || [])?.length;
  return (
    <View className=" mb-2 bg-white">
      <View
        className={cn(
          'flex-row  border-b border-gray-100 bg-gray-100 p-3',
          !!(watch('attachments') ?? []).length || !!watch('audio')?.sound
            ? 'bg-gray-100'
            : 'bg-white'
        )}>
        <View className={cn('flex flex-1 flex-row flex-wrap items-center  gap-2   ')}>
          {(watch('attachments') ?? [])?.length > 0 ? (
            watch('attachments')?.map((i: any, index: any) => {
              return (
                <View
                  key={`${i?.assetId}-${index}`}
                  className="relative mr-3 h-16 w-16 overflow-hidden rounded-xl bg-white ">
                  {['video/mp4', 'image/jpeg', 'image/png', 'image/jpg'].includes(i?.type) ? (
                    <Image source={{ uri: i?.uri }} className="h-full w-full" resizeMode="cover" />
                  ) : (
                    <View className="flex h-full w-full items-center justify-center bg-gray-100">
                      {fileIcon[i?.type]}
                    </View>
                  )}

                  <TouchableOpacity
                    onPress={() => removeFile(index)}
                    className="absolute -right-0 -top-0 z-10 rounded-full bg-white p-0.5">
                    <Ionicons name="close-circle" size={20} color="#FF5722" />
                  </TouchableOpacity>
                </View>
              );
            })
          ) : (
            <></>
          )}
          {watch('audio')?.sound ? (
            <View className="max-w-[80%] flex-row items-center space-x-3 self-end rounded-2xl bg-[#DCF8C6] p-3 shadow-sm">
              {/* Left: Circular mic icon */}
              <View className="flex h-9 w-9 items-center justify-center rounded-full bg-white">
                <Ionicons name="mic" size={18} color="#128C7E" />
              </View>

              {/* Center: Timer text */}
              <Text className="text-sm font-semibold text-gray-800">
                {watch('audio')?.duration || '0:00'}
              </Text>

              {/* Play/Pause Button */}
              <TouchableOpacity
                onPress={async () => {
                  setCurrentAudio(watch('audio').uri);
                  play(watch('audio'));
                }}
                className="p-1">
                <Ionicons
                  name={currentAudio && currentAudio === watch('audio').uri ? 'pause' : 'play'}
                  size={24}
                  color="#128C7E"
                />
              </TouchableOpacity>

              {/* Delete Button */}
              <TouchableOpacity
                onPress={async () => {
                  stop();
                  setValue('audio', { sound: '', duration: '', uri: '', type: '' });
                }}
                className="p-1">
                <Ionicons name="close" size={22} color="#D32F2F" />
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
        {uploadLoading ? (
          <LottieFilesAnimation
            source={uploadingFiles}
            play
            autoPlay
            className="h-10 w-10 items-center justify-center"
          />
        ) : watch('audio')?.sound || watch('attachments')?.length ? (
          <TouchableOpacity
            className="h-10 w-10 items-center justify-center rounded-full bg-primary"
            onPress={async () => {
              if (currentlyPlayingRef.current) {
                await stop();
              }

              const message: any = {
                message: watch('message')?.trim() ?? '',
                attachments: watch('attachments') || [],
                audio: watch('audio') || { sound: '', duration: '', uri: '', type: '' },
              };
              sendMessage(message, () => {
                setValue('message', '');
                setValue('attachments', []);
                setValue('audio', { sound: '', duration: '', uri: '', type: '' });
              });
            }}>
            <Ionicons name="send" size={20} className="!text-white" />
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
      <View className="h-20 flex-row  items-center gap-2 border-t border-gray-200 px-2 " style={{}}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className=" h-10 w-10 items-center justify-center rounded-full">
          <Entypo name="attachment" size={22} color="#FF5722" />
        </TouchableOpacity>
        <Controller
          control={control}
          name="message"
          render={({ field: { onChange, value } }: any) => (
            <DefaultTextInput
              className="w-full rounded-2xl bg-[#F0F0F0] px-3 py-4"
              containerClassName=" flex-1 text-black rounded-full bg-white  text-base"
              placeholder="Type a message..."
              onChangeText={onChange}
              // focusable
              // autoFocus
              multiline
              value={value}
              editable={!isEditable}
              returnKeyType="send"
              onSubmitEditing={() => {
                const message: any = {
                  message: watch('message')?.trim() ?? '',
                  attachments: watch('attachments') || [],
                  audio: watch('audio') || { sound: '', duration: '', uri: '', type: '' },
                };
                sendMessage(message, () => {
                  setValue('message', '');
                  setValue('attachments', []);
                });
              }}
              onContentSizeChange={onContentSizeChange}
            />
          )}
        />

        {watch('message')?.trim() ? (
          <TouchableOpacity
            className="h-12 w-12 items-center justify-center rounded-full "
            onPress={async () => {
              if (currentlyPlayingRef.current) {
                await stop();
              }

              const message: any = {
                message: watch('message')?.trim() ?? '',
                attachments: watch('attachments') || [],
                audio: watch('audio') || { sound: '', duration: '', uri: '', type: '' },
              };
              sendMessage(message, () => {
                setValue('message', '');
                setValue('attachments', []);
                setValue('audio', { sound: '', duration: '', uri: '', type: '' });
              });
            }}>
            <Ionicons name="send" size={30} className="!text-primary" />
          </TouchableOpacity>
        ) : (
          <AudioRecorder
            onRecordingComplete={(payload: any) => {
              setValue('audio', payload);
            }}
            ref={currentlyPlayingRef}
            audio={watch('audio') || { sound: '', duration: '', uri: '', type: '' }}
          />
        )}
      </View>

      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View className="flex-1 justify-end bg-black/50">
          <View className="rounded-t-3xl bg-white px-4 pb-6 pt-4">
            {/* Drag handle */}
            <View className="mb-4 items-center">
              <View className="h-1.5 w-12 rounded-full bg-gray-300" />
            </View>

            {/* Title (Optional) */}
            <Text className="mb-4 text-center text-base font-semibold text-gray-800">
              Upload Options
            </Text>

            {/* Options */}
            <TouchableOpacity
              className="mb-3 flex-row items-center rounded-xl bg-blue-500 px-4 py-4"
              onPress={pickImage}>
              <Ionicons name="images" size={22} color="white" className="mr-3" />
              <Text className="flex-1 text-base font-medium text-white">Choose from Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="mb-3 flex-row items-center rounded-xl bg-green-500 px-4 py-4"
              onPress={takePhoto}>
              <Ionicons name="camera" size={22} color="white" className="mr-3" />
              <Text className="flex-1 text-base font-medium text-white">Take a Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="mb-4 flex-row items-center rounded-xl bg-purple-600 px-4 py-4"
              onPress={pickDocument}>
              <MaterialIcons name="insert-drive-file" size={22} color="white" className="mr-3" />
              <Text className="flex-1 text-base font-medium text-white">Select a Document</Text>
            </TouchableOpacity>

            {/* Cancel */}
            <TouchableOpacity
              className="flex-row items-center justify-center rounded-xl border border-gray-300 bg-white py-3"
              onPress={() => setModalVisible(false)}>
              <Text className="text-base font-medium text-gray-700">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
