/* eslint-disable import/order */
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image as ExpoImage } from 'expo-image';

import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Animated, {
  interpolate,
  measure,
  runOnJS,
  runOnUI,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { renderIcon } from '~/components/Tabs/Diary/Render/attachments';

const { width, height } = Dimensions.get('screen');
const blurhash = 'LEHV6nWB2yk8pyo0adR*.7kCMdnj';

export default function ImagePopup({ imageUrl, item }: any) {
  // Receive imageUrl directly
  const layout: any = useSharedValue({});
  const transition = useSharedValue(0);
  const [active, setActive] = useState(false); // Active state is a boolean

  const aRef = useAnimatedRef(); //Moved reference here, now only one image.

  const onPress = () => {
    setActive(true);

    runOnUI(() => {
      'worklet';
      layout.value = measure(aRef);
    })();

    setTimeout(() => {
      transition.value = withTiming(transition.value === 0 ? 1 : 0, {
        duration: 250,
      });
    }, 10);
  };

  const close = () => {
    transition.value = withTiming(transition.value === 0 ? 1 : 0, { duration: 250 }, () => {
      runOnJS(setActive)(false); // Set active to false
    });
  };

  const overlayStyle = useAnimatedStyle(() => ({
    height: interpolate(transition.value, [0, 1], [layout.value.height, width]),
    width: interpolate(transition.value, [0, 1], [layout.value.width, width]),
    transform: [
      {
        translateX: interpolate(transition.value, [0, 1], [layout.value.pageX, 0]),
      },
      {
        translateY: interpolate(transition.value, [0, 1], [layout.value.pageY, height / 5]),
      },
    ],
  }));

  const overlayBGStyle = useAnimatedStyle(() => ({
    opacity: transition.value,
  }));

  return (
    <View>
      <TouchableWithoutFeedback onPress={onPress}>
        <Animated.View ref={aRef}>
          <Image source={{ uri: imageUrl }} style={styles.img} resizeMode="cover" />
        </Animated.View>
      </TouchableWithoutFeedback>
      <TouchableOpacity onPress={onPress} className="flex-1  flex-row items-center gap-2">
        {renderIcon[item?.type]}
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          className="flex-1 font-poppinsMedium text-sm dark:text-white">
          {item?.name}
        </Text>
        <Ionicons name="eye" size={20} color={'#fff'} />
      </TouchableOpacity>

      {active && (
        <Modal transparent onRequestClose={close}>
          <Animated.View style={[overlayBGStyle, styles.overlayBG]}>
            <TouchableOpacity style={StyleSheet.absoluteFill} onPress={close} />
          </Animated.View>
          <Animated.View style={overlayStyle}>
            <ExpoImage
              source={imageUrl}
              contentFit="fill"
              placeholder={{ blurhash }}
              transition={1000}
              style={{
                height: '100%',
                width: '100%',
                position: 'absolute',
              }}
            />
          </Animated.View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  img: {
    width: 1,
    height: 1,
    backgroundColor: '#fff',
  },
  expandedImage: {
    width: '100%', // Expand to fill the container
    height: '100%',
  },
  overlayBG: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
});
