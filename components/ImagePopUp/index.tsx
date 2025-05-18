import React, { useCallback, useState } from 'react';
import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
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
const { width, height } = Dimensions.get('screen');
const itemSize = width / 3;

export default function ImagePopup({ uri }: any) {
  const layout: any = useSharedValue({});
  const transition = useSharedValue(0);
  const [active, setActive] = useState('' as any);
  const onPress: any = useCallback(
    (image: any, aRef: any) => {
      setActive(image);
      runOnUI(() => {
        'worklet';
        layout.value = measure(aRef);
      })();
      setTimeout(() => {
        transition.value = withTiming(transition.value === 0 ? 1 : 0, { duration: 250 });
      }, 10);
    },
    [layout, transition]
  );
  const close = useCallback(() => {
    transition.value = withTiming(transition.value === 0 ? 1 : 0, { duration: 250 }, () => {
      runOnJS(setActive)(null);
    });
  }, [transition, setActive]);
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
    <>
      <View style={[styles.item]}>
        <Item image={uri} onPress={onPress} />
      </View>
      {active && (
        <Modal transparent onRequestClose={close}>
          <Animated.View style={[overlayBGStyle, styles.overlayBG]}>
            <TouchableOpacity style={StyleSheet.absoluteFillObject} onPress={close} />
          </Animated.View>
          <Animated.View style={overlayStyle}>
            <Item image={active} />
          </Animated.View>
        </Modal>
      )}
    </>
  );
}
function Item({ image, onPress = () => {} }: any) {
  const aRef = useAnimatedRef();
  return (
    <TouchableWithoutFeedback onPress={() => onPress(image, aRef)}>
      <Animated.View ref={aRef} style={{ flex: 1, backgroundColor: '#fff' }}>
        <Image source={{ uri: image }} className="h-full w-full rounded-lg" resizeMode="cover" />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  item: {
    height: itemSize - 10,
    width: itemSize - 10,
    marginLeft: 30 / 4,
    marginTop: 30 / 4,
  },
  overlayBG: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#00000077',
  },
});
