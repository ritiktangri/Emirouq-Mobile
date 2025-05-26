/* eslint-disable import/order */
import { useCallback, useRef, useState } from 'react';
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
}: {
  sendMessage: (message: string, callback?: () => void) => void;
  onContentSizeChange: (event: any) => void;
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

  const currentlyPlayingRef: any = useRef(null);
  const handlePlayAudio = useCallback(
    async (audio: any) => {
      if (currentlyPlayingRef.current && currentlyPlayingRef.current !== audio.sound) {
        await currentlyPlayingRef.current.stopAsync();
      }
      try {
        await audio.sound.replayAsync();
        currentlyPlayingRef.current = audio.sound;
        audio.sound.setOnPlaybackStatusUpdate((status: any) => {
          if (status.didJustFinish) {
            currentlyPlayingRef.current = null;
          }
        });
      } catch (err) {
        console.error('Playback error:', err);
      }
    },
    [currentlyPlayingRef]
  );

  return (
    <View className=" mb-2 bg-white">
      <View
        className={cn(
          'flex flex-row flex-wrap items-center  gap-2  border-b border-gray-200 bg-gray-100 px-4 py-2',
          (watch('attachments') ?? []).length > 0 ? 'bg-gray-100' : 'bg-white'
        )}>
        {(watch('attachments') ?? [])?.length > 0 ? (
          watch('attachments')?.map((i: any, index: any) => {
            return (
              <View
                key={`${i?.assetId}-${index}`}
                className="  flex-row items-center rounded-2xl bg-gray-100 p-2">
                {['video/mp4', 'image/jpeg', 'image/png', 'image/jpg'].includes(i?.type) ? (
                  <Image
                    source={{ uri: i?.uri }}
                    className=" h-10 w-10 rounded-md"
                    resizeMode="cover"
                  />
                ) : (
                  <View className="p-2">{fileIcon[i?.type]}</View>
                )}

                <TouchableOpacity
                  onPress={() => {
                    removeFile(index);
                  }}
                  className="ml-2">
                  <Ionicons name="close-circle" size={20} color="#FF5722" />
                </TouchableOpacity>
              </View>
            );
          })
        ) : (
          <></>
        )}
        {watch('audio')?.sound && (
          <View className="flex-row items-center">
            <Text className="mr-2">Audio:</Text>
            <TouchableOpacity
              onPress={() => {
                setValue('audio', { sound: '', duration: '', uri: '', type: '' });
              }}
              className="flex-row items-center rounded-full bg-gray-200 px-3 py-1">
              <Ionicons name="close-circle" size={20} color="#FF5722" />
              <Text className="ml-2 text-sm">{watch('audio')?.duration || 'Audio'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handlePlayAudio(watch('audio'));
              }}
              className="ml-2 flex-row items-center rounded-full bg-gray-200 px-3 py-1">
              <Ionicons name="play-circle" size={20} color="#4CAF50" />
              <Text className="ml-2 text-sm">Play</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View
        className="h-20 flex-row  items-center gap-2 border-t border-gray-200 px-2 pt-4"
        style={{}}>
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
        <AudioRecorder
          onRecordingComplete={(payload: any) => {
            setValue('audio', payload);
          }}
          ref={currentlyPlayingRef}
          audio={watch('audio') || { sound: '', duration: '', uri: '', type: '' }}
        />
        <TouchableOpacity
          className="h-12 w-12 items-center justify-center rounded-full "
          onPress={() => {
            console.log(1);
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
      </View>

      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View className="flex-1 justify-end bg-black bg-opacity-50">
          <View className="rounded-t-3xl bg-white pb-8">
            <View className="my-2 items-center">
              <View className="h-1 w-12 rounded-full bg-gray-300" />
            </View>

            <Text className="mb-6 text-center text-xl font-semibold text-gray-800">
              Select an Option
            </Text>

            <TouchableOpacity
              className="mx-4 mb-3 flex-row items-center rounded-xl bg-[#4285F4] px-4 py-3.5"
              onPress={pickImage}>
              <Ionicons name="images" size={24} color="white" className="mr-3" />
              <Text className="flex-1 text-center font-medium text-white">Choose from Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="mx-4 mb-3 flex-row items-center rounded-xl bg-[#34A853] px-4 py-3.5"
              onPress={takePhoto}>
              <Ionicons name="camera" size={24} color="white" className="mr-3" />
              <Text className="flex-1 text-center font-medium text-white">Take a Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="mx-4 mb-6 flex-row items-center rounded-xl bg-[#9C27B0] px-4 py-3.5"
              onPress={pickDocument}>
              <MaterialIcons name="insert-drive-file" size={24} color="white" className="mr-3" />
              <Text className="flex-1 text-center font-medium text-white">Select a Document</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="mx-4 flex-row items-center rounded-xl bg-gray-200 px-4 py-3.5"
              onPress={() => setModalVisible(false)}>
              <Text className="flex-1 text-center font-medium text-gray-700">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
