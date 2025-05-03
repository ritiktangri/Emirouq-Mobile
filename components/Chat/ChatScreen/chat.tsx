/* eslint-disable import/order */
import { Entypo, FontAwesome, Ionicons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import { BlurView } from 'expo-blur';
import { debounce } from 'lodash';
import * as React from 'react';
import {
  Dimensions,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  TextInputContentSizeChangeEventData,
  View,
  ViewStyle,
  Image,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  clamp,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '~/components/common/Text';
import { useAuth } from '~/context/AuthContext';
import { useColorScheme } from '~/lib/useColorScheme';
import { cn, getRelativeTime } from '~/utils/helper';
import Footer from './footer';
import SkeletonLoading from 'expo-skeleton-loading';

// const ME = 'Alice';

const HEADER_HEIGHT = Platform.select({ ios: 88, default: 64 });

const dimensions = Dimensions.get('window');

const SPRING_CONFIG = {
  damping: 15,
  stiffness: 150,
  mass: 0.5,
  overshootClamping: false,
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 0.01,
};

// Note: For few messages to start at top, use a FlatList instead of the FlashList
// Add `contentContainerStyle={{ justifyContent: 'flex-end', flexGrow: 1 }}` to the FlatList (it is not possible with FlashList atm)

export default function Chat({
  data,
  sendMessage,
  onEndReached,
  uploadFileLoading,
}: {
  data: any;
  sendMessage: any;
  onEndReached: any;
  uploadFileLoading: any;
}) {
  const insets = useSafeAreaInsets();
  const textInputHeight = useSharedValue(17);
  const translateX = useSharedValue(0);
  const previousTranslateX = useSharedValue(0);
  const initialTouchLocation = useSharedValue<{ x: number; y: number } | null>(null);

  const pan = Gesture.Pan()
    .minDistance(10)
    .onBegin((evt) => {
      initialTouchLocation.value = { x: evt.x, y: evt.y };
    })
    .onStart(() => {
      previousTranslateX.value = translateX.value;
    })
    // Prevents blocking the scroll view and the swipe to go back gesture on iOS
    .onTouchesMove((evt, state) => {
      if (!initialTouchLocation.value || !evt.changedTouches.length) {
        state.fail();
        return;
      }

      const xDiff = evt.changedTouches[0].x - initialTouchLocation.value.x;
      const yDiff = Math.abs(evt.changedTouches[0].y - initialTouchLocation.value.y);
      const isHorizontalPanning = Math.abs(xDiff) > yDiff;

      if (isHorizontalPanning && xDiff < 0) {
        state.activate();
      } else {
        state.fail();
      }
    })
    .onUpdate((event) => {
      translateX.value = clamp(event.translationX / 2 + previousTranslateX.value, -75, 0);
    })
    .onEnd((event) => {
      const right = event.translationX > 0 && translateX.value > 0;
      const left = event.translationX < 0 && translateX.value < 0;

      if (right) {
        if (translateX.value > dimensions.width / 2) {
          translateX.value = withSpring(dimensions.width, SPRING_CONFIG);
          return;
        }
        translateX.value = withSpring(0, SPRING_CONFIG);
        return;
      }

      if (left) {
        if (translateX.value < -dimensions.width / 2) {
          translateX.value = withSpring(-dimensions.width, SPRING_CONFIG);
          return;
        }
        translateX.value = withSpring(0, SPRING_CONFIG);
        return;
      }

      translateX.value = withSpring(0, SPRING_CONFIG);
    });

  const debouncedLoadMoreData = React.useCallback(
    debounce(() => {
      if (onEndReached) {
        onEndReached();
      }
    }, 500),
    [onEndReached]
  );
  return (
    <>
      <GestureDetector gesture={pan}>
        <View className="flex-1">
          <FlashList
            inverted
            estimatedItemSize={70}
            ListHeaderComponent={() =>
              // if file is uploading, show a loading indicator
              uploadFileLoading ? (
                <View className=" w-full flex-1 ">
                  <View className="mr-2 flex-row justify-end">
                    <SkeletonLoading background="#d3d3d3" highlight="#e0e0e0">
                      <View className={`h-28 w-28 rounded-lg bg-gray-200`} />
                    </SkeletonLoading>
                  </View>
                </View>
              ) : (
                <></>
              )
            }
            keyboardDismissMode="on-drag"
            keyExtractor={(item: any, index: any) => `${item?.uuid}-${index}`}
            keyboardShouldPersistTaps="handled"
            onEndReached={debouncedLoadMoreData}
            onEndReachedThreshold={0.9}
            scrollIndicatorInsets={{ bottom: HEADER_HEIGHT + 10, top: insets.bottom + 2 }}
            data={data}
            viewabilityConfig={
              {
                // waitForInteraction: true,
                // itemVisiblePercentThreshold: 50,
                // minimumViewTime: 1000,
              }
            }
            renderItem={({ item, index }: any) => {
              // if (typeof item === 'string') {
              //   return <DateSeparator date={item} />;
              // }

              const nextMessage = data[index - 1];
              const isSameNextSender =
                typeof nextMessage !== 'string' ? nextMessage?.user === item?.user : false;

              return (
                <ChatBubble
                  isSameNextSender={isSameNextSender}
                  item={item}
                  translateX={translateX}
                  uploadLoading={uploadFileLoading}
                />
              );
            }}
          />
          <Composer sendMessage={sendMessage} textInputHeight={textInputHeight} />
        </View>
      </GestureDetector>
    </>
  );
}

function DateSeparator({ date }: { date: string }) {
  return (
    <View className="items-center px-4 pb-3 pt-5">
      <Text variant="caption2" className="text-muted-foreground font-medium">
        {date}
      </Text>
    </View>
  );
}

const BORDER_CURVE: ViewStyle = {
  borderCurve: 'continuous',
};

function ChatBubble({
  item,
  isSameNextSender,
  translateX,
}: {
  item: any;
  isSameNextSender: boolean;
  translateX: SharedValue<number>;
  uploadLoading: boolean;
}) {
  const { user }: any = useAuth();
  const contextMenuRef = React.useRef<any>(null);
  const { colors } = useColorScheme();
  const rootStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const dateStyle = useAnimatedStyle(() => {
    return {
      width: 75,
      position: 'absolute',
      right: 0,
      paddingLeft: 8,
      transform: [{ translateX: interpolate(translateX.value, [-75, 0], [0, 75]) }],
    };
  });
  return (
    <View
      className={cn(
        'flex justify-center px-2 pb-3.5',
        isSameNextSender ? 'pb-1' : 'pb-3.5',
        item?.user === user?.uuid ? 'items-end pl-16' : 'items-start pr-16'
      )}>
      <Animated.View style={item?.user === user?.uuid ? rootStyle : undefined}>
        {item?.attachments?.length > 0 ? (
          <View
            className={cn(
              'flex-row items-center gap-4',
              item?.user === user?.uuid && 'flex-row-reverse'
            )}>
            {item?.attachments?.length === 1 ? (
              <View ref={contextMenuRef} style={{ borderRadius: 12 }}>
                <Pressable>
                  <Image
                    source={{ uri: item?.attachments[0].uri }}
                    style={{ width: 200, height: 200, resizeMode: 'cover' }}
                    borderRadius={12}
                  />
                </Pressable>
              </View>
            ) : (
              <Pressable className="">
                <View
                  className={cn(
                    ' flex-row flex-wrap items-center gap-2',
                    item?.user === user?.uuid && 'flex-row-reverse'
                  )}>
                  {item?.attachments?.map((attachment: any, index: number) => (
                    <Image
                      key={index}
                      source={{ uri: attachment.uri }}
                      style={{ width: 100, height: 100, resizeMode: 'cover' }}
                      borderRadius={12}
                    />
                  ))}
                </View>
              </Pressable>
            )}
          </View>
        ) : (
          <></>
        )}
        {item?.message ? (
          <Pressable className={cn(!!item?.attachments?.length && item?.message ? 'py-2' : 'mt-0')}>
            <View
              style={BORDER_CURVE}
              className={cn(
                'dark:bg-muted-foreground rounded-2xl bg-white px-3 py-1.5',
                Platform.OS === 'ios' && 'dark:bg-muted',
                item?.user === user?.uuid && 'bg-primary dark:bg-primary'
              )}>
              <Text className={cn(item?.user === user?.uuid && 'text-white')}>{item?.message}</Text>
            </View>
          </Pressable>
        ) : (
          <></>
        )}
      </Animated.View>

      <Animated.View style={dateStyle} className="justify-center">
        <Text variant="caption1" className="text-muted-foreground">
          {getRelativeTime(item?.createdAt)}
        </Text>
      </Animated.View>
    </View>
  );
}

function Composer({
  textInputHeight,
  sendMessage,
}: {
  sendMessage: any;
  textInputHeight: SharedValue<number>;
}) {
  const { colors, isDarkColorScheme } = useColorScheme();
  const insets = useSafeAreaInsets();

  function onContentSizeChange(event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) {
    textInputHeight.value = Math.max(
      Math.min(event.nativeEvent.contentSize.height, 280),
      Platform.select({ ios: 20, default: 38 })
    );
  }

  return (
    <BlurView
      intensity={Platform.select({ ios: 50, default: 0 })}
      style={[
        {
          backgroundColor: Platform.select({
            ios: isDarkColorScheme ? '#00000080' : '#ffffff80',
            default: isDarkColorScheme ? colors.background : colors.card,
          }),
          // paddingBottom: insets.bottom,
        },
      ]}>
      <Footer sendMessage={sendMessage} onContentSizeChange={onContentSizeChange} />
    </BlurView>
  );
}
