/* eslint-disable import/order */
import { useEffect, useState } from 'react';
import { TouchableOpacity, Image, FlatList } from 'react-native';
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
import CustomMenu from '~/components/common/PopoverMenu';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const MIC_RING_SIZE = 44;
const MIC_BUTTON_SIZE = 36;
const MIC_STROKE_WIDTH = 3;
const MIC_RADIUS = (MIC_RING_SIZE - MIC_STROKE_WIDTH) / 2;
const MIC_CIRCUMFERENCE = 2 * Math.PI * MIC_RADIUS;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const suggestionsList = [
  'Hello 👋',
  'How are you?',
  'Good morning ☀️',
  // "Let's meet up",
  // 'See you soon',
  // 'Thank you 🙏',
];

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

  const {
    play,
    stop,
    currentlyPlayingRef,
    currentAudio,
    setCurrentAudio,
    currentlyPlaying,
    progress = 0,
  } = useAudioPlayer();
  const isPreviewPlaying = !!(currentlyPlaying && currentAudio?.uri === watch('audio')?.uri);

  const micProgressValue = useSharedValue(MIC_CIRCUMFERENCE);
  const micAnimatedProps = useAnimatedProps(() => ({
    strokeDashoffset: micProgressValue.value,
  }));

  useEffect(() => {
    if (isPreviewPlaying) {
      micProgressValue.value = withTiming(MIC_CIRCUMFERENCE * (1 - progress / 100), {
        duration: 100,
        easing: Easing.inOut(Easing.ease),
      });
    } else {
      micProgressValue.value = withTiming(MIC_CIRCUMFERENCE, {
        duration: 100,
        easing: Easing.inOut(Easing.ease),
      });
    }
  }, [progress, isPreviewPlaying]);
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
          ) : watch('audio')?.sound ? (
            <View
              className="max-w-[85%] flex-row items-center gap-3 self-end rounded-2xl bg-white px-3 py-2.5"
              style={{
                shadowColor: '#0F172A',
                shadowOpacity: 0.08,
                shadowRadius: 6,
                shadowOffset: { width: 0, height: 2 },
                elevation: 1,
              }}>
              {/* Left: Circular mic icon with playing progress ring */}
              <View
                style={{ width: MIC_RING_SIZE, height: MIC_RING_SIZE }}
                className="items-center justify-center">
                <Svg
                  width={MIC_RING_SIZE}
                  height={MIC_RING_SIZE}
                  style={{ position: 'absolute', top: 0, left: 0 }}>
                  {isPreviewPlaying && (
                    <Circle
                      stroke="#FFE0D3"
                      fill="none"
                      cx={MIC_RING_SIZE / 2}
                      cy={MIC_RING_SIZE / 2}
                      r={MIC_RADIUS}
                      strokeWidth={MIC_STROKE_WIDTH}
                    />
                  )}
                  {isPreviewPlaying && (
                    <AnimatedCircle
                      animatedProps={micAnimatedProps}
                      stroke="#FF5722"
                      fill="none"
                      cx={MIC_RING_SIZE / 2}
                      cy={MIC_RING_SIZE / 2}
                      r={MIC_RADIUS}
                      strokeWidth={MIC_STROKE_WIDTH}
                      strokeLinecap="round"
                      strokeDasharray={`${MIC_CIRCUMFERENCE} ${MIC_CIRCUMFERENCE}`}
                    />
                  )}
                </Svg>
                <View
                  style={{ width: MIC_BUTTON_SIZE, height: MIC_BUTTON_SIZE }}
                  className="items-center justify-center rounded-full bg-primary/10">
                  <Ionicons name="mic" size={18} color="#FF5722" />
                </View>
              </View>

              {/* Center: Play/Pause + timer */}
              <TouchableOpacity
                onPress={async () => {
                  await play(watch('audio'));
                  setCurrentAudio(watch('audio'));
                }}
                className="flex-1 flex-row items-center gap-2">
                <View className="h-9 w-9 items-center justify-center rounded-full bg-primary">
                  <Ionicons
                    name={isPreviewPlaying ? 'pause' : 'play'}
                    size={16}
                    color="#fff"
                  />
                </View>
                <Text className="text-sm font-semibold text-gray-700">
                  {watch('audio')?.duration || '0:00'}
                </Text>
              </TouchableOpacity>

              {/* Delete Button */}
              <TouchableOpacity
                onPress={async () => {
                  stop();
                  setValue('audio', { sound: '', duration: '', uri: '', type: '' });
                }}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                className="h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                <Ionicons name="close" size={18} color="#6B7280" />
              </TouchableOpacity>
            </View>
          ) : (
            <FlatList
              data={suggestionsList}
              nestedScrollEnabled
              numColumns={3}
              contentContainerStyle={{ gap: 2 }}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => setValue('message', item)}
                  style={{
                    backgroundColor: '#eee',
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 20,
                    marginRight: 8,
                  }}>
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
              style={{ marginBottom: 8 }}
            />
          )}
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
        <CustomMenu
          customStyles={{
            optionsContainer: {
              borderRadius: 10,
              marginTop: -30,
            },
            optionsWrapper: {},
          }}
          data={[
            {
              label: 'Choose from Gallery',
              icon: <Ionicons name="images" size={20} className="mr-3 !text-primary" />,
              onPress: pickImage,
            },
            {
              label: 'Take a Photo',
              icon: <Ionicons name="camera" size={20} className="mr-3 !text-primary" />,
              onPress: takePhoto,
            },
            {
              label: 'Select a Document',
              icon: (
                <MaterialIcons name="insert-drive-file" size={20} className="mr-3 !text-primary" />
              ),
              onPress: pickDocument,
            },
          ]}
          icon={<Entypo name="attachment" size={22} color="#FF5722" className="!px-2" />}
        />

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
    </View>
  );
}
