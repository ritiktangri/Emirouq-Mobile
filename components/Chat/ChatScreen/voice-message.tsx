/* eslint-disable import/order */
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAudioPlayer } from '~/context/AudioPlayerContext';
import { View } from '~/components/common/View';
import { Text } from '~/components/common/Text';

export default function VoiceMessage({ audio }: any) {
  const { play, currentlyPlaying, progress, loadAudio, setCurrentAudio, currentAudio } =
    useAudioPlayer();
  return (
    <View className="w-full max-w-xs flex-row items-center gap-3 rounded-xl bg-gray-100 p-3 shadow-sm dark:bg-gray-800">
      {/* Play Button */}
      <TouchableOpacity
        onPress={async () => {
          const { sound } = await loadAudio(audio?.uri);
          await play({ sound });
          setCurrentAudio(audio);
        }}
        className="flex items-center justify-center rounded-full bg-white p-2 shadow-sm">
        <Ionicons
          name={currentAudio?.uri === audio?.uri && currentlyPlaying ? 'pause' : 'play'}
          size={22}
          color="#128C7E"
        />
      </TouchableOpacity>
      {/* Progress Bar */}
      {currentlyPlaying && currentAudio?.uri === audio?.uri ? (
        <View className="h-1 flex-1 overflow-hidden rounded bg-gray-300 dark:bg-gray-600">
          <View
            className="h-full bg-blue-500"
            style={{
              width:
                currentlyPlaying && currentAudio?.uri === audio?.uri ? `${progress || 0}%` : '0%',
            }}
          />
        </View>
      ) : (
        <></>
      )}

      <Text className="text-xs text-gray-500 dark:text-gray-300">{audio?.duration}</Text>
    </View>
  );
}
