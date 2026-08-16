/* eslint-disable import/order */
import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAudioPlayer } from '~/context/AudioPlayerContext';
import { View } from '~/components/common/View';
import { Text } from '~/components/common/Text';
import { cn } from '~/utils/helper';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const BUTTON_SIZE = 36;
const RING_SIZE = 48;
const STROKE_WIDTH = 3;
const RADIUS = (RING_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function VoiceMessage({ audio, isOwnMessage }: any) {
  const {
    play,
    currentlyPlaying,
    progress = 0,
    loadAudio,
    setCurrentAudio,
    currentAudio,
  } = useAudioPlayer();

  const isActive = currentlyPlaying && currentAudio?.uri === audio?.uri;

  const trackColor = isOwnMessage ? 'rgba(255,255,255,0.35)' : '#FFE0D3';
  const progressColor = isOwnMessage ? '#fff' : '#FF5722';
  const buttonBg = isOwnMessage ? 'bg-white' : 'bg-primary';
  const iconColor = isOwnMessage ? '#FF5722' : '#fff';
  const durationColor = isOwnMessage ? 'text-white/90' : 'text-gray-600';
  const waveColor = isOwnMessage ? 'bg-white/50' : 'bg-primary/25';
  const waveActiveColor = isOwnMessage ? 'bg-white' : 'bg-primary';

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
        duration: 100,
        easing: Easing.inOut(Easing.ease),
      });
    } else {
      progressValue.value = withTiming(CIRCUMFERENCE, {
        duration: 100,
        easing: Easing.inOut(Easing.ease),
      });
    }
  }, [progress, isActive]);

  // static bar heights for a lightweight waveform look
  const bars = [6, 12, 8, 16, 10, 14, 7, 12, 9, 6];
  const activeBars = Math.round((progress / 100) * bars.length);

  return (
    <View
      className={cn(
        'min-w-[220px] max-w-xs flex-row items-center gap-3 rounded-2xl px-3 py-2.5',
        isOwnMessage
          ? 'self-end rounded-br-md bg-primary'
          : 'self-start rounded-bl-md bg-[#F0F0F0]'
      )}>
      {/* Ring + Play button wrapper */}
      <View style={{ width: RING_SIZE, height: RING_SIZE, position: 'relative' }}>
        <Svg width={RING_SIZE} height={RING_SIZE} style={{ position: 'absolute', top: 0, left: 0 }}>
          {/* Background ring */}
          <Circle
            stroke={trackColor}
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
              stroke={progressColor}
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
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          className={cn('items-center justify-center rounded-full', buttonBg)}
          style={{
            width: BUTTON_SIZE,
            height: BUTTON_SIZE,
            position: 'absolute',
            top: (RING_SIZE - BUTTON_SIZE) / 2,
            left: (RING_SIZE - BUTTON_SIZE) / 2,
          }}>
          <Ionicons name={isActive ? 'pause' : 'play'} size={16} color={iconColor} />
        </TouchableOpacity>
      </View>

      {/* Waveform + duration */}
      <View className="flex-1 gap-1">
        <View className="flex-row items-center gap-[3px]">
          {bars.map((h, i) => (
            <View
              key={i}
              style={{ height: h }}
              className={cn(
                'w-[3px] rounded-full',
                isActive && i < activeBars ? waveActiveColor : waveColor
              )}
            />
          ))}
        </View>
        <Text className={cn('text-xs', durationColor)}>{audio?.duration}</Text>
      </View>
    </View>
  );
}
