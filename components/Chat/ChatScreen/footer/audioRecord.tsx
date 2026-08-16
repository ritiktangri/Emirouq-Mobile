/* eslint-disable import/order */
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { Alert, Linking, Platform, Pressable, Animated as RNAnimated, View } from 'react-native';
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { useTheme } from '~/context/ThemeContext';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import CustomTooltip from '~/components/CustomTooltip';
import { Text } from '~/components/common/Text';

const MAX_DURATION = 10; // seconds
const MIN_RECORDING_DURATION = 2000;

const requestMicPermission = async () => {
  const permission = await Audio.requestPermissionsAsync();

  if (!permission.granted) {
    if (permission.status === 'denied') {
      Alert.alert(
        'Permission Required',
        'Microphone permission is required. Please enable it from app settings.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Open Settings',
            onPress: () => {
              if (Platform.OS === 'ios') {
                Linking.openURL('app-settings:');
              } else {
                Linking.openSettings();
              }
            },
          },
        ]
      );
    }
    return false;
  }

  return true;
};
const AudioRecorder = forwardRef(({ onRecordingComplete, audio }: any, ref: any) => {
  // ref is currentlyPlayingRef
  useEffect(() => {
    requestMicPermission();
  }, []);
  const [recording, setRecording] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const { showToast } = useTheme();
  const recordingRef: any = useRef(null);
  const pressStartTime: any = useRef(null);
  const durationRef: any = useRef(0);
  const intervalIdRef: any = useRef(null);
  const [visible, setVisible] = useState(false);
  const toolTipScale = useRef(new RNAnimated.Value(0)).current;

  // if the user leaves the screen mid-recording, cancel and discard it —
  // nothing left silently recording in the background
  useEffect(() => {
    return () => {
      clearInterval(intervalIdRef.current);
      if (recordingRef.current) {
        const rec = recordingRef.current;
        rec
          .stopAndUnloadAsync()
          .then(() => {
            const uri = rec.getURI?.();
            if (uri) {
              FileSystem.deleteAsync(uri, { idempotent: true }).catch(() => {});
            }
          })
          .catch(() => {});
      }
    };
  }, []);

  const showTooltip = () => {
    setVisible(true);
    RNAnimated.spring(toolTipScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const hideTooltip = () => {
    RNAnimated.timing(toolTipScale, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        setVisible(false);
      }, 1000);
    });
  };

  const startRecording = async () => {
    if (ref.current) {
      showToast(`Wait for the current audio to finish`, 'warning', 1000);
      return;
    }

    if (audio?.sound) {
      showToast('Only one audio can be recorded at a time', 'warning', 1000);
      return;
    }

    if (recordingRef.current) {
      try {
        await recordingRef.current.stopAndUnloadAsync();
      } catch {}
      recordingRef.current = null;
    }

    if (ref.current) {
      await ref.current.stopAsync();
      ref.current = null;
    }

    try {
      pressStartTime.current = Date.now();
      setRecording(true);
      setElapsedSeconds(0);

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        interruptionModeIOS: InterruptionModeIOS.DuckOthers, // Change as you like
        interruptionModeAndroid: InterruptionModeAndroid.DuckOthers, // Change as you like
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: true,
      });

      const { recording }: any = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      recordingRef.current = recording;
      durationRef.current = 0;

      intervalIdRef.current = setInterval(() => {
        if (durationRef.current >= MAX_DURATION) {
          stopRecording();
          return;
        }
        durationRef.current++;
        setElapsedSeconds(durationRef.current);
      }, 1000);
    } catch (err) {
      setRecording(false);
      showToast(`Error starting recording`, 'error', 1000);
    }
  };

  const stopRecording = async () => {
    setRecording(false);

    clearInterval(intervalIdRef.current);
    intervalIdRef.current = null;

    const elapsed = Date.now() - pressStartTime.current;

    if (!recordingRef.current) return;

    try {
      await recordingRef.current.stopAndUnloadAsync();
      const uri = recordingRef.current.getURI();

      if (elapsed < MIN_RECORDING_DURATION) {
        showToast(`Please record for at least 2 seconds`, 'warning', 1000);

        if (uri) {
          await FileSystem.deleteAsync(uri, { idempotent: true });
        }
      } else {
        const res = await recordingRef.current.createNewLoadedSoundAsync();
        const { sound, status } = res;
        const newRecording = {
          sound,
          duration: formatTime(status.durationMillis),
          uri,
        };
        showToast(`Uploading ...`, 'info', 1000);
        onRecordingComplete(newRecording);
      }
    } catch (err) {
      showToast(`Error stopping recording`, 'error', 1000);
    } finally {
      recordingRef.current = null;
      durationRef.current = 0;
      setRecording(false);
      setElapsedSeconds(0);
    }
  };

  const cancelRecording = async () => {
    setRecording(false);
    clearInterval(intervalIdRef.current);
    intervalIdRef.current = null;

    if (!recordingRef.current) return;

    try {
      await recordingRef.current.stopAndUnloadAsync();
      const uri = recordingRef.current.getURI();
      if (uri) {
        await FileSystem.deleteAsync(uri, { idempotent: true });
      }
    } catch {
    } finally {
      recordingRef.current = null;
      durationRef.current = 0;
      setElapsedSeconds(0);
    }
  };

  const formatTime = (millis: any) => {
    const totalSeconds = Math.floor(millis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    showTooltip();
    scale.value = withTiming(1.4, { duration: 150 });
  };

  const handlePressOut = () => {
    setTimeout(() => {
      hideTooltip();
    }, 500);
    scale.value = withSpring(1, {
      damping: 5,
      stiffness: 150,
    });
  };

  const handleTap = () => {
    if (recording) return;
    if (audio?.sound) {
      showToast('Only one audio can be recorded at a time', 'warning', 1000);
      return;
    }
    startRecording();
  };

  if (recording) {
    return (
      <View className="flex-row items-center gap-2">
        <Pressable
          onPress={cancelRecording}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          className="h-9 w-9 items-center justify-center rounded-full bg-gray-200">
          <Ionicons name="close" className="!text-xl !text-gray-700" />
        </Pressable>
        <View className="flex-row items-center gap-1.5">
          <View className="h-2.5 w-2.5 rounded-full bg-red-500" />
          <Text className="text-sm text-gray-700">{formatTime(elapsedSeconds * 1000)}</Text>
        </View>
        <Pressable
          onPress={stopRecording}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          className="h-10 w-10 items-center justify-center rounded-full bg-primary">
          <Ionicons name="send" className="!text-base !text-white" />
        </Pressable>
      </View>
    );
  }

  return (
    <Pressable
      onPress={handleTap}
      className=""
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      pressRetentionOffset={{ top: 10, bottom: 10, left: 10, right: 10 }}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}>
      <Animated.View
        style={[animatedStyle]}
        className="h-10 w-10  items-center justify-center rounded-full  bg-primary">
        <Ionicons name="mic" className="!text-3xl !text-white" />
      </Animated.View>
      {visible && (
        <Animated.View className="absolute -left-48 bottom-14 z-50 w-64  rounded-md bg-gray-300 px-3 py-2">
          <Text className="text-sm text-black">Tap to record</Text>
        </Animated.View>
      )}
    </Pressable>
  );
});

export default AudioRecorder;
