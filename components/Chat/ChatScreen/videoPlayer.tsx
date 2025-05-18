import React, { useState, useRef, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEvent } from 'expo';

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

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetControlsTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setControlsVisible(false), 3000);
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
        nativeControls
        style={{ width: '100%', height: '100%', position: 'absolute' }}
      />
    </TouchableOpacity>
  );
}
