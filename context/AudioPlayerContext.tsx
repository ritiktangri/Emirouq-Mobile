import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';

type AudioPlayerContextType = {
  currentlyPlaying: any;
  play: (audio: { sound: any }) => Promise<void>;
  stop: () => Promise<void>;
  loadAudio: (audioSrc: string) => Promise<{ sound: Audio.Sound }>;
  currentlyPlayingRef: React.MutableRefObject<any>;
  progress?: number;
  audioCacheRef: React.MutableRefObject<Map<string, Audio.Sound>>;
  currentAudio?: any;
  setCurrentAudio: React.Dispatch<React.SetStateAction<any>>;
  downloadAndCacheAudio: (remoteUrl: string) => Promise<string>;
  clearAudioCache: () => void;
  setProgress?: any;
};

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

export const AudioPlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const currentlyPlayingRef = useRef<any>(null);
  // const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const [progress, setProgress] = useState(0);
  const audioCacheRef = useRef<Map<string, Audio.Sound>>(new Map());
  const [currentAudio, setCurrentAudio] = useState({});

  const stop = useCallback(async () => {
    if (currentlyPlayingRef.current) {
      await Promise.all([
        currentlyPlayingRef.current.stopAsync(),
        // currentlyPlayingRef.current.unloadAsync(), // cleanup
      ]);
      currentlyPlayingRef.current = null;
      setProgress(0);
      setCurrentAudio({}); // Reset current audio state
    }
  }, []);

  const play = useCallback(async (audio: { sound: any }) => {
    try {
      if (!audio?.sound) return;

      const status = await audio.sound.getStatusAsync();

      //if the audio is already playing, , when the user clicks play again, we stop the currently playing audio
      if (currentlyPlayingRef.current && currentlyPlayingRef.current !== audio.sound) {
        await currentlyPlayingRef.current.stopAsync();
      }
      // if the audio automatically finishes, we reset the position to 0
      if (status.positionMillis >= status.durationMillis) {
        await audio.sound.setPositionAsync(0);
      }
      //if the audio is already playing, we pause it, otherwise we play it
      if (status.isPlaying) {
        await audio.sound.pauseAsync();
        const percent = (status.positionMillis / status.durationMillis) * 100;
        setProgress(percent);
        currentlyPlayingRef.current = null;
        setCurrentAudio({}); // Reset current audio state
      } else {
        await audio.sound.playAsync();
        setProgress(0);
        currentlyPlayingRef.current = audio.sound;
      }

      // Update the currently playing reference and force a re-render
      // forceUpdate();

      audio.sound.setOnPlaybackStatusUpdate((newStatus: any) => {
        // this will be called when the playback status changes
        if (newStatus.isLoaded && newStatus.durationMillis) {
          const percent = (newStatus.positionMillis / newStatus.durationMillis) * 100;
          setProgress(percent);
        }

        // this will be called when the playback finishes
        if (newStatus.didJustFinish || newStatus.positionMillis >= newStatus.durationMillis) {
          currentlyPlayingRef.current = null;
          // Reset current audio state
          setCurrentAudio({});
          setProgress(100);
          // forceUpdate();
        }
      });
    } catch (err) {
      console.error('Playback error:', err);
      currentlyPlayingRef.current = null;
      setProgress(0);
      setCurrentAudio({}); // Reset current audio state
      // forceUpdate();
    }
  }, []);

  // Function to cache and play audio from a local URI
  const cachePlay = useCallback(async (localUri: string) => {
    try {
      // If something is currently playing, stop and unload it
      if (currentlyPlayingRef.current) {
        await currentlyPlayingRef.current.stopAsync();
        await currentlyPlayingRef.current.unloadAsync();
        currentlyPlayingRef.current = null;
        setProgress(0);
        setCurrentAudio({}); // Reset current audio state
      }

      const { sound } = await Audio.Sound.createAsync(
        { uri: localUri },
        { shouldPlay: true },
        (status: any) => {
          if (status.isLoaded && status.durationMillis) {
            const percent = (status.positionMillis / status.durationMillis) * 100;
            setProgress(percent);
          }

          if (status.didJustFinish) {
            currentlyPlayingRef.current = null;
            setCurrentAudio({}); // Reset current audio state
            setProgress(100);
          }
        }
      );

      currentlyPlayingRef.current = sound;
    } catch (err) {
      console.error('Playback error:', err);
      currentlyPlayingRef.current = null;
    }
  }, []);
  //download and cache audio file
  const downloadAndCacheAudio = async (remoteUrl: string): Promise<string> => {
    const fileName = remoteUrl.split('/').pop(); // e.g., audio.mp3
    const localUri = `${FileSystem.documentDirectory}audio/${fileName}`;

    const fileInfo = await FileSystem.getInfoAsync(localUri);
    if (fileInfo.exists) {
      return localUri; // Already downloaded
    }

    // Make sure directory exists
    await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}audio/`, {
      intermediates: true,
    });

    // Download and save to local
    const downloadResumable = FileSystem.createDownloadResumable(remoteUrl, localUri);
    const result = await downloadResumable.downloadAsync();

    if (!result || result.status !== 200) {
      throw new Error('Audio download failed');
    }

    return localUri;
  };

  const loadAudio = useCallback(async (audioSrc: string) => {
    if (audioCacheRef.current.has(audioSrc)) {
      return { sound: audioCacheRef.current.get(audioSrc)! };
    }

    try {
      const { sound } = await Audio.Sound.createAsync({ uri: audioSrc });
      audioCacheRef.current.set(audioSrc, sound);
      return { sound };
    } catch (err) {
      console.error('Failed to load audio:', err);
      throw err;
    }
  }, []);

  const clearAudioCache = useCallback(() => {
    audioCacheRef.current.forEach((sound) => {
      sound.unloadAsync(); // Unload each sound
    });
    audioCacheRef.current.clear(); // Clear the cache
    setCurrentAudio({}); // Reset current audio state
    currentlyPlayingRef.current = null; // Reset currently playing reference
    setProgress(0); // Reset progress
  }, []);
  const value = useMemo(
    () => ({
      currentlyPlaying: currentlyPlayingRef.current,
      play,
      stop,
      loadAudio,
      currentlyPlayingRef,
      progress,
      setProgress,
      audioCacheRef,
      currentAudio,
      setCurrentAudio,
      downloadAndCacheAudio,
      clearAudioCache,
    }),
    [
      play,
      stop,
      loadAudio,
      progress,
      currentlyPlayingRef,
      audioCacheRef,
      currentAudio,
      setCurrentAudio,
      downloadAndCacheAudio,
      clearAudioCache,
    ]
  );

  return <AudioPlayerContext.Provider value={value}>{children}</AudioPlayerContext.Provider>;
};

export const useAudioPlayer = () => {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error('useAudioPlayer must be used within AudioPlayerProvider');
  }
  return context;
};
