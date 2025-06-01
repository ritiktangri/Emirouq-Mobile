/* eslint-disable import/order */
import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAudioPlayer } from '~/context/AudioPlayerContext';
import { View } from '~/components/common/View';
import { Text } from '~/components/common/Text';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const BUTTON_SIZE = 40;
const RING_SIZE = 54;
const STROKE_WIDTH = 4;
const RADIUS = (RING_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function VoiceMessage({ audio }: any) {
  const {
    play,
    currentlyPlaying,
    progress = 0,
    loadAudio,
    setCurrentAudio,
    currentAudio,
  } = useAudioPlayer();

  const isActive = currentlyPlaying && currentAudio?.uri === audio?.uri;

  // Initialize to correct position if active
  const progressValue = useSharedValue(
    isActive ? CIRCUMFERENCE * (1 - progress / 100) : CIRCUMFERENCE
  );

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: progressValue.value,
  }));

  useEffect(() => {
    if (isActive) {
      const newOffset = CIRCUMFERENCE * (1 - progress / 100);
      progressValue.value = withTiming(newOffset, {
        duration: 400,
        easing: Easing.inOut(Easing.ease),
      });
    } else {
      progressValue.value = withTiming(CIRCUMFERENCE, {
        duration: 400,
        easing: Easing.inOut(Easing.ease),
      });
    }
  }, [progress, isActive]);

  return (
    <View className="w-full max-w-xs flex-row items-center gap-3 rounded-xl bg-gray-100 p-3 shadow-sm dark:bg-gray-800">
      {/* Ring + Play button wrapper */}
      <View style={{ width: RING_SIZE, height: RING_SIZE, position: 'relative' }}>
        <Svg width={RING_SIZE} height={RING_SIZE} style={{ position: 'absolute', top: 0, left: 0 }}>
          {/* Background ring */}
          <Circle
            stroke="#e5e7eb"
            fill="none"
            cx={RING_SIZE / 2}
            cy={RING_SIZE / 2}
            r={RADIUS}
            strokeWidth={STROKE_WIDTH}
          />
          {/* Animated progress ring */}
          {isActive && (
            <AnimatedCircle
              animatedProps={animatedProps}
              stroke="#128C7E"
              fill="none"
              cx={RING_SIZE / 2}
              cy={RING_SIZE / 2}
              r={RADIUS}
              strokeWidth={STROKE_WIDTH}
              strokeLinecap="round"
              strokeDasharray={`${CIRCUMFERENCE} ${CIRCUMFERENCE}`}
            />
          )}
        </Svg>

        {/* Play / Pause Button */}
        <TouchableOpacity
          onPress={async () => {
            const { sound } = await loadAudio(audio?.uri);
            await play({ sound });
            setCurrentAudio(audio);
          }}
          className="items-center justify-center rounded-full bg-white shadow-sm"
          style={{
            width: BUTTON_SIZE,
            height: BUTTON_SIZE,
            position: 'absolute',
            top: (RING_SIZE - BUTTON_SIZE) / 2,
            left: (RING_SIZE - BUTTON_SIZE) / 2,
          }}>
          <Ionicons name={isActive ? 'pause' : 'play'} size={22} color="#128C7E" />
        </TouchableOpacity>
      </View>

      {/* Duration */}
      <Text className="text-xs text-gray-500 dark:text-gray-300">{audio?.duration}s</Text>
    </View>
  );
}
