import React, { useState, useRef, useEffect } from 'react';
import { TouchableOpacity, Pressable, Platform } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEvent } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { View } from '~/components/common/View';

type Props = {
  source: string;
};

export default function VideoPlayer({ source }: Props) {
  const player = useVideoPlayer(source, (player) => {
    player.loop = false;
    player.play();
  });
  const { isPlaying } = useEvent(player, 'playingChange', {
    isPlaying: player.playing,
  });

  const [controlsVisible, setControlsVisible] = useState(true);
  const [isMuted, setIsMuted] = useState(player.muted);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPiPActive, setIsPiPActive] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetControlsTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setControlsVisible(false), 3000);
  };

  const togglePlayPause = () => {
    player.playing ? player.pause() : player.play();
    setControlsVisible(true);
    resetControlsTimeout();
  };

  const toggleMute = () => {
    player.muted = !player.muted;
    setIsMuted(player.muted);
    resetControlsTimeout();
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    resetControlsTimeout();
  };

  // Note: PiP support is not programmatically controllable via expo-video yet.
  const togglePiP = () => {
    setIsPiPActive(!isPiPActive);
    resetControlsTimeout();
  };

  useEffect(() => {
    resetControlsTimeout();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={1}
      className="h-48 w-72 overflow-hidden rounded-lg bg-black"
      onPress={() => {
        setControlsVisible(true);
        resetControlsTimeout();
      }}>
      <VideoView
        player={player}
        allowsFullscreen={isFullscreen}
        nativeControls={false}
        allowsPictureInPicture={isPiPActive}
        // className="absolute bottom-0 left-0 right-0 top-0 h-full w-full"
        style={{ width: '100%', height: '100%', position: 'absolute' }}
        onFullscreenEnter={() => {
          console.log('Fullscreen Enter');
          setIsFullscreen(true);
        }}
        onFullscreenExit={() => {
          console.log('Fullscreen Exit');
          setIsFullscreen(false);
        }}
      />

      {controlsVisible && (
        <View className="absolute inset-0 items-center justify-center bg-black/30">
          {/* Center Play/Pause */}
          <Pressable onPress={togglePlayPause}>
            <Ionicons name={isPlaying ? 'pause-circle' : 'play-circle'} size={52} color="white" />
          </Pressable>

          {/* Bottom Controls */}
          <View className="absolute bottom-2 left-2 right-2 flex-row items-center justify-between px-2">
            <Pressable onPress={toggleMute}>
              <Ionicons name={isMuted ? 'volume-mute' : 'volume-high'} size={24} color="white" />
            </Pressable>

            {/* <View className="flex-row gap-x-4">
              {Platform.OS === 'android' || Platform.OS === 'ios' ? (
                <Pressable onPress={togglePiP}>
                  <Ionicons name="albums-outline" size={22} color="white" />
                </Pressable>
              ) : null}

              <Pressable onPress={toggleFullscreen}>
                <Ionicons name={isFullscreen ? 'contract' : 'expand'} size={22} color="white" />
              </Pressable>
            </View> */}
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
}
